import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Button } from "@ui/button";
import { Pencil, UploadCloud, X } from "lucide-react";
import { FormLabel } from "@ui/form";
import { ChangeEvent, useRef } from "react";

interface ProfileImageUploadProps {
  currentImage: string | null | undefined;
  selectedImage: File | null;
  onImageSelect: (file: File | null) => void;
}

export const UserProfileUpload = ({
  currentImage,
  selectedImage,
  onImageSelect
}: ProfileImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewImage = selectedImage ? URL.createObjectURL(selectedImage) : null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; 

      if (!allowedTypes.includes(file.type)) {
        console.error("Invalid file type. Only JPG, JPEG, PNG are allowed.");
        onImageSelect(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      if (file.size > maxSize) {
        console.error("File size exceeds 5MB limit.");
        onImageSelect(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      onImageSelect(file);
    }
  };

  const removeImage = () => {
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  return (
    <div className="space-y-2">
      <FormLabel>Profile Picture</FormLabel>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <div className="relative group flex-shrink-0"> 
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={previewImage || currentImage || ""}
              alt="User avatar"
            />
            <AvatarFallback className="text-2xl">
              {currentImage ? "" : "U"} 
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
               onClick={() => fileInputRef.current?.click()}
          >
            <Pencil className="text-white h-6 w-6" /> 
          </div>
        </div>
        <div className="w-full sm:flex-1 space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:flex-1"
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload New
            </Button>
            {previewImage && (
              <Button
                type="button"
                variant="outline"
                onClick={removeImage}
                className="w-full sm:flex-1"
              >
                <X className="mr-2 h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground text-center sm:text-left"> 
            JPG,JPEG or PNG. Max size of 5MB
          </p>
        </div>
      </div>
    </div>
  );
};