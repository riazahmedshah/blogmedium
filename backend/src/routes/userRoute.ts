import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono }  from "hono"
import { sign, verify } from "hono/jwt";
import { signinInputs, signupInputs } from "../types/index";


export const userRoute = new Hono<{
    Bindings :{
        DATABASE_URL : string 
    }
}>();




    userRoute.post('/signup',async (c) => {
        const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
      
      
        const body = await c.req.json();
        const {success} = signupInputs.safeParse(body);
        if(!success) {
            c.status(411);
            return c.json({
                msg:"Input is invalid"
            })
        }
      
        const user = await prisma.user.create({
          data: {
            email: body.email,
            password: body.password,
            name:body.name
          },
          
        });
      
        const token = await sign({id: user.id},"secret");
        return c.json({token,user}); 
      });
      
      
      
      
      userRoute.post('/signin', async (c) => {
        const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
      
        const body = await c.req.json();
        const {success} = signinInputs.safeParse(body);
        if(!success){
          c.status(411);
          return c.json({
            msg:"Incorrect iemail/password"
          })
        }
        const user = await prisma.user.findUnique({
            where: {
              email: body.email
            }
            
        });
        if(!user){
          c.status(403);
          return c.json({error: "user not found"})
        }
        const token = await sign({id: user.id}, "secret");
        return c.json({token, user});
      });


      userRoute.get("/user", async (c) => {
        const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

      const header = c.req.header("authorization") || "";
      const res = await verify(header, "secret")
      if (res && typeof res.id === 'string') {
        // c.set("userId", res.id);
        const user = await prisma.user.findUnique({
          where: { id: res.id }, // Assuming the ID field in Prisma is `id`
        });
        if(!user){
          c.status(403);
          return c.json({error: "user not found"})
        }

        return c.json({user})
      }else{
          c.status(403)
          c.render('/signup')
          return c.json({error: "Your not logged"})
      }


    });
