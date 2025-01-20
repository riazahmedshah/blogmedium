import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


export const blogRoute = new Hono<{
    Bindings:{
        DATABASE_URL : string
    },
    Variables:{
        userId: string;
    }
}>();

blogRoute.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    // Bearer token
  //@ts-ignore.....(if (typeof header === "string" && header.startsWith("Bearer ")) {
    //const parts = header.split(" ");
    //if (parts.length > 1) {
     // const token = parts[1];
      // Now token is safely extracted
    //}
  //})
    //const token = header.startsWith("Bearer ").split(" ")[1]
    const res = await verify(header, "secret")
    
    
    if (res && typeof res.id === 'string') {
        c.set("userId", res.id);
        await next();
    }else{
      c.status(403)
      c.render('/signup')
      return c.json({error: "Your not logged"})
    }
  
  
    
  })


 



blogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const authorId = c.get("userId")
    const body = await c.req.json();
    const blogCreate = await prisma.post.create({
        data: {
            authorId : authorId,
            title : body.title,
            content : body.content
        }
    })

    return c.json({
        id: blogCreate.id
    })
  });


  blogRoute.put('/',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const updateBlog = await prisma.post.update({
        where :{
            id: body.id
        },
        data: {
            title : body.title,
            content : body.content
        }
    })

    return c.json({
        id: updateBlog.id
    })
  });

   // TODO: add pagination
//    blogRoute.get('/bulk',async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate())

//     const blogs = await prisma.post.findMany({
//         select:{
//             content: true,
//             title: true,
//             id:true,
//             author:{
//                 select:{
//                     name:true
//                 }
//             }
//         }
//     });
//     return c.json({
//         blogs
//     })
//   });

blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    // Get pagination parameters from query string, set defaults
    const page = Number(c.req.query('page')) || 1;  // Get 'page' from query, default to 1
    const limit = Number(c.req.query('limit')) || 5;  // Get 'limit' from query, default to 10

    // Calculate the offset (where to start fetching)
    const skip = (page - 1) * limit;

    try {
        const blogs = await prisma.post.findMany({
            skip: skip, // Skip records based on current page
            take: limit, // Number of records to fetch (limit)
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        // Get total count of records for pagination info
        const totalRecords = await prisma.post.count();
        const totalPages = Math.ceil(totalRecords / limit);

        return c.json({
            blogs,
            pagination: {
                totalRecords,  // Total number of records
                totalPages,    // Total pages available
                currentPage: page,
                pageSize: limit
            }
        });

    } catch (error) {
        c.status(500);
        return c.json({ msg: "Error while getting blogs" });
    }
});



  blogRoute.get("/userblog", async (c) => {
    const id = c.req.query("userId");  // Get ID from query params

    if (!id) {
        return c.json({ msg: "User ID is required" });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.post.findMany({
            where: { authorId: id },  // Assuming id is the user's ID
            select: {
                content: true,
                title: true,
                id: true,
                author: { select: { name: true } }
            }
        });

        if (!blogs) {
            return c.json({ msg: "Blog not found" });
        }

        return c.json({ blogs });

    } catch (error) {
        console.error("Error fetching blogs:", error);
        return c.json({ msg: "Error while getting blogs" });
    }
});



  blogRoute.get('/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const {id} = c.req.param();
    try{
        const getBlog = await prisma.post.findFirst({
            where: {
                id : id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            getBlog
        })
    }catch (e){
        c.status(411);
        c.json({
            msg : "Error while getting blogs"
        })
    }
  });


 

