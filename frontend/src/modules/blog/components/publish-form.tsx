import { zodResolver } from "@hookform/resolvers/zod"
import { createPostRequest, PostSchema } from "@schemas/postSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { createBlogRequest } from "../api/createBlog";
import { toast } from "sonner";
import { BlogList } from "../types";
import { Button } from "@ui/button";
import { useState } from "react";
import { BlogPostImageUpload } from "./blog-image-upload";
import { Loader2 } from "lucide-react";
import { BlogFormFields } from "./blog-form-field";
import { Form } from "@ui/form";

export const PublishForm = () => {
  const [selectedImage, setSelectedImage] = useState<File | null >(null);
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues:{
      title:"",
      content:"",
      categoryId:undefined,
      postImage:undefined
    },
    resolver:zodResolver(PostSchema)
  });

  const {mutate:createBlog, isPending} = useMutation({
    mutationFn: (data:createPostRequest) => createBlogRequest(data),
    onSuccess: (newBlog) => {
      queryClient.setQueryData(["blogs"], (old: BlogList | undefined) => 
        old ? [...old, newBlog] : [newBlog]
      );
    
    queryClient.invalidateQueries({ queryKey: ["blogs"] });
    setSelectedImage(null);
    form.reset();
    },
    onError: (error) => {
      toast.error("Failed to create blog");
      console.error("Create blog error:", error);
    }

  });

  const onSubmit = (data:createPostRequest) => {
    console.log("Data", data);
    const formData = {
      ...data,
      postImage: selectedImage || undefined
    }
    createBlog(formData);
  }

  return(
    <div>
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full bg-white p-6 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <BlogPostImageUpload
                selectedImage={selectedImage}
                onImageSelect={setSelectedImage}
              />
              <BlogFormFields form={form}/>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
            </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}