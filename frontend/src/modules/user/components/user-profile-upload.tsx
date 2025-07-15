import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Button } from "@ui/button";
import { Pencil, UploadCloud, X } from "lucide-react";
import { FormLabel } from "@ui/form";
import { ChangeEvent, useRef } from "react";

interface ProfileImageUploadProps {
  currentImage: string | null;
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
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Avatar className="h-24 w-24">
            <AvatarImage 
              src={previewImage || currentImage || ""} 
              alt="User avatar" 
            />
            <AvatarFallback className="text-2xl">
              {currentImage ? "" : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <Pencil className="text-white" />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            id="avatar-upload"
          />
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload New
            </Button>
            {previewImage && (
              <Button
                type="button"
                variant="outline"
                onClick={removeImage}
              >
                <X className="mr-2 h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            JPG,JPEG  or PNG. Max size of 5MB
          </p>
        </div>
      </div>
    </div>
  );
};