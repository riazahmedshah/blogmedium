import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema, updateuserData } from "@schemas/authSchema";
import { UpdateUserRequest } from "../api/updateUser";
import { useCurrentUser } from "@modules/auth/hooks/useCurrentUser";
import { currentUserQuery } from "@modules/auth/api/currentUser";
import { toast } from "sonner";
import { CardWrapper } from "./card-wrapper";
import { Form } from "@ui/form";
import { ProfileFormFields } from "./profile-form-field";
import { FormActions } from "./update-profile-formaction";
import { UserProfileUpload } from "./user-profile-upload";
import { handleUpdateError } from "../helper/handleError";

export const UpdateProfileForm = () => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user?.name || "",
      role: user?.role || "",
      profilePhoto: undefined
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: updateuserData) => {
      return UpdateUserRequest(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(currentUserQuery().queryKey, data);
      toast.success("Profile updated successfully");
      setSelectedImage(null);
    },
    onError: (error) => {
      handleUpdateError(error,form);
    }
  });

  

  const onSubmit = (data: updateuserData) => {
    const formData = {
      ...data,
      profilePhoto: selectedImage || undefined
    };
    mutate(formData);
  };

  return (
    <CardWrapper 
      title="Profile Settings"
      label="Update your personal information and preferences"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <UserProfileUpload 
            currentImage={user && user.profilePhoto}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
          
          <ProfileFormFields form={form} />
          
          <FormActions isPending={isPending} />
        </form>
      </Form>
    </CardWrapper>
  );
};