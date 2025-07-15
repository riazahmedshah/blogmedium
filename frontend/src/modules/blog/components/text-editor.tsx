import JoditEditor from "jodit-react";

export const TextEditor = ({
  onChange,
}: {
  onChange: (e: any) => void;
}) => {
  return (
    <div className="mt-2">
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between border rounded-lg">
          <div className="bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <JoditEditor 
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}