import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { ZodIssue } from "zod";

export class ResponseHandler{
    static json(c:Context, data:Record<string, any>, status : StatusCode= 200){
        if(data){
            c.json(data,status)
        } else{
            c.json({},status)
        }
    }

    static created(c:Context, data:Record<string,unknown>){
        ResponseHandler.json(c,data,201)
    }

    static zodError(c:Context, issues:ZodIssue[]){
        const errors = issues.reduce((acc: Record<string, string>, issue) => {
            const key = issue.path.join(".");
            acc[key] = issue.message;
            return acc;
        },{});
        c.json({errors},400)
    }

    static error(c:Context,error:unknown){
        if(error instanceof Error){
            ResponseHandler.json(c, error,400)
        } else{
            ResponseHandler.json(c, {Error:"INTERNAL_SERVER_ERROR"},500)
        }
    }
}