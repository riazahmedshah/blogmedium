import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
// import UserContext from "../components/UserContext";
import DOMPurify from "dompurify";
import JoditEditor from "jodit-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "../schemas/postSchema";
import { Form, FormControl, FormField, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // const{loggedInUser} = useContext(UserContext)

  // console.log("TITLE", title);
  console.log("DESCRIPTION", description);

  const form = useForm({
    resolver: zodResolver(PostSchema)
  })

  const onSubmit = async () => {
    if (!title || !description) {
      setError("Both title and content are required.");
      return;
    }


    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: DOMPurify.sanitize(description),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          }
        }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (err) {
        console.error(err)
      setError("Failed to publish. Please try again later.");
    }
  };

  // useEffect(() => {
  //     if (!loggedInUser) {
  //         navigate("/signin");
  //     }
  // }, [loggedInUser, navigate]);

  return (
    <div>
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full bg-white p-6 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="postImage"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="file"
                          className="py-1"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="How to become a full stack developer in 2025."
                          className="py-6"
                          
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <TextEditor onChange={function (): void {
                          throw new Error("Function not implemented.");
                        } }/>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">
                  Publish Post
              </Button>
            </form>
          </Form>
          {/* Title Input */}
          {/* <input
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-4"
            type="text"
            placeholder="Title"
          /> */}

          {/* Description/Content Editor */}
          {/* <TextEditor onChange={(newDescription) => setDescription(newDescription)} /> */}

          {/* Error Handling */}
          {/* {error && <div className="text-red-500 mt-2">{error}</div>} */}

          {/* Publish Button */}
          {/* <button
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish Post
          </button> */}
        </div>
      </div>
    </div>
  );
};

// Text Editor Component
function TextEditor({
  onChange,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between border rounded-lg">
          <div className="bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <JoditEditor 
              onChange={onChange}
            />
            {/* <ReactQuill
              theme="snow"
              onChange={onChange}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publish;
