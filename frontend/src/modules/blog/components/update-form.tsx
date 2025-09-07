import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form";
import { UpdatePostRequest, UpdatePostSchema } from "@schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FullBlogSkeleton } from "./skeletons/full-blog-skeleton";
import { Form } from "@ui/form";
import { BlogFormFields } from "./blog-form-field";
import { Button } from "@ui/button";
import { Loader2 } from "lucide-react";
import { updateBlog } from "../api/updateBlog";
import { toast } from "sonner";
import { getSingleBlogRequest } from "../api/getBlogs";

export const UpdateForm = () => {
  const {id} = useParams();
  console.log(id);

  if(!id) return null;

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: () => getSingleBlogRequest(id),
    queryKey: ['singleBlog', id]
  });

  console.log(data?.blog);

  const form = useForm({
    resolver:zodResolver(UpdatePostSchema),
    values: {
      title: data?.blog.title,
      content: data?.blog.content,
      categoryId: data?.blog.categoryId,
    },
    defaultValues:{
      title: "",
      content: "",
      categoryId: undefined
    }
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (updateData:UpdatePostRequest) => updateBlog(id,updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleBlog", id] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog updated successfully!");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Failed to update blog");
    }

  });
  
    const onSubmit = (data:UpdatePostRequest) => {
      mutate(data);
    }
  
  if(isLoading){
    return(
      <FullBlogSkeleton/>
    )
  }
  return(
    <div>
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full bg-white p-6 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <BlogFormFields form={form} isLoading={isPending}/>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Update Changes"
                )}
            </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}