import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";
import { UseFormReturn } from "react-hook-form";
import { createPostRequest } from "@schemas/postSchema";
import { useQuery } from "@tanstack/react-query";
import { getCategoryRequest } from "../api/getCategory";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";

interface ProfileFormFieldsProps {
  form: UseFormReturn<createPostRequest>;
}

export const BlogFormFields = ({ form }: ProfileFormFieldsProps) => {
  const {data, isLoading, isError} = useQuery({
    queryFn:() => getCategoryRequest(),
    queryKey:['categories'],
    staleTime: 1000 * 60 * 5,
  });
  if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      );
    }
  
    if (isError) {
      return (
        <div>Error...</div>
      );
    }
  
    if (!data?.category || data.category.length === 0) {
      return (
        <div>No Category is available</div>
      );
    }
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter Title Here" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profession</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Start showing your writing skills.."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue>Select Category</SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {
                  data.category.map((category) => (
                    <SelectItem value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />


    </div>
  );
};