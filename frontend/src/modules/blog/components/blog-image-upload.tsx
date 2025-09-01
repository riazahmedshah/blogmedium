import { cn } from "@/lib/utils";
import { Button } from "@ui/button";
import { FormLabel, FormMessage } from "@ui/form";
import { ImageIcon, UploadCloud, X } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

interface PostImageUploadProps {
  selectedImage: File | null;
  onImageSelect: (file: File | null) => void;
  className?: string;
}

export const BlogPostImageUpload = ({ selectedImage, onImageSelect, className }: PostImageUploadProps) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewImage = selectedImage ? URL.createObjectURL(selectedImage) : null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      const maxSize = 50 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Only JPG, JPEG, PNG are allowed.");
        onImageSelect(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      if (file.size > maxSize) {
        setError("File size exceeds 50MB limit.");
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
    <div className={cn("space-y-3", className)}>
      <FormLabel>Featured Image</FormLabel>
      {previewImage ? (
        <div className="relative group w-full">
          <div className="relative overflow-hidden rounded-md border flex justify-center items-center aspect-w-16 aspect-h-9">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 rounded-md border border-dashed bg-muted/50 w-full">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}

      <div className="space-y-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        <div className="flex flex-col sm:flex-row gap-2"> 
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:flex-1" 
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            {previewImage ? "Change Image" : "Upload Image"}
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

        <p className="text-sm text-muted-foreground">
          Supports: JPG, JPEG, PNG. Max size: 50MB
        </p>

        {error && (
          <FormMessage className="text-destructive">{error}</FormMessage>
        )}
      </div>
    </div>
  );
};