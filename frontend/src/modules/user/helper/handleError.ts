import { updateuserData } from "@schemas/authSchema";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const handleUpdateError = (error: unknown, form:any) => {
    if (isAxiosError(error) && error.response) {
      if (error.response.data?.errors) {
        const errors = error.response.data.errors;
        toast.error("Update failed", {
          description: "Please fix the errors below",
        });
        
        for (const [field, message] of Object.entries(errors)) {
          form.setError(field as keyof updateuserData, {
            type: 'manual',
            message: Array.isArray(message) ? message.join(' ') : String(message)
          });
        }
      } else {
        toast.error("Update failed", {
          description: error.response.data?.message || "Failed to update profile",
        });
      }
    } else {
      toast.error("Update failed", {
        description: "Network error or server unavailable",
      });
    }
  };