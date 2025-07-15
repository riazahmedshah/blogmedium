import { Button } from "@ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isPending: boolean;
}

export const FormActions = ({ isPending }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 pt-4">
      <Button type="button" variant="outline">
        Cancel
      </Button>
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
    </div>
  );
};