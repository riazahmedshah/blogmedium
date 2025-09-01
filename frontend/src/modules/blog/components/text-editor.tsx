import React from 'react';
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';


Quill.register("modules/imageResize", ImageResize)


const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image', 'code-block']
  ],
  clipboard:{ matchVisual: false},
  imageResize: {}
}

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

export const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="mt-2">
      <div className="w-full mb-4">
        <div className="border rounded-lg overflow-hidden">
          <div className='prose max-w-none'>
            <ReactQuill
              className="my-custom-editor h-48"
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              readOnly={disabled}
              placeholder="Start typing your content here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};