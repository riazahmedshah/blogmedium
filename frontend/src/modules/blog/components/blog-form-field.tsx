import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";
import { UseFormReturn } from "react-hook-form";
// import { createPostRequest, UpdatePostRequest } from "@schemas/postSchema";
import { useQuery } from "@tanstack/react-query";
import { getCategoryRequest } from "../api/getCategory";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";
import { Skeleton } from "@ui/skeleton";
import { Alert, AlertDescription } from "@ui/alert";
import { AlertCircle } from "lucide-react";
import { TextEditor } from "./text-editor";

interface BlogFormFieldsProps {
  form: UseFormReturn<any>;
  isLoading?: boolean;
}

export const BlogFormFields = ({ form, isLoading: formLoading }: BlogFormFieldsProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getCategoryRequest(),
    queryKey: ['categories'],
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Post Title</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your post title" 
                {...field} 
                disabled={formLoading}
                className={`${formLoading ? "opacity-50" : ""} px-4 py-3`}
              />
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
            <FormLabel>Content</FormLabel>
            <FormControl>
              <TextEditor
                value={field.value}
                onChange={field.onChange}
                disabled={formLoading}
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
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <p className="text-sm text-muted-foreground">Loading categories...</p>
              </div>
            ) : isError ? (
              <div className="space-y-2">
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="ml-2">
                    Failed to load categories. {error instanceof Error ? error.message : ''}
                  </AlertDescription>
                </Alert>
                <Input 
                  placeholder="Type category name manually" 
                  disabled={formLoading}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </div>
            ) : (
              <>
                <Select 
                  value={field.value ? String(field.value) : ""} 
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={formLoading}
                >
                  <FormControl>
                    <SelectTrigger className={formLoading ? "opacity-50" : ""}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.map((category) => (
                      <SelectItem 
                        key={category.id} 
                        value={String(category.id)}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};