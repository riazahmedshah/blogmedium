import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Quill from 'quill'; 

const CODE_ICON_SVG = '<svg viewbox="0 0 18 18"><path d="M10.87,14.61a0.5,0.5,0,0,1-.37-0.15L7.49,12l3-2.45a0.5,0.5,0,0,1,.74.61L8.6,12l2.21,1.8a0.5,0.5,0,0,1-.34.81Z"/><path d="M7.13,3.39a0.5,0.5,0,0,1,.37.15L10.51,6l-3,2.45a0.5,0.5,0,0,1-.74-0.61L9.4,6l-2.21-1.8a0.5,0.5,0,0,1,.34-0.81Z"/></svg>';

const icons = Quill.import('ui/icons') as Record<string, string>;
icons['customCodeBlock'] = CODE_ICON_SVG;


function insertCodeBlock(this: Quill) { 
  const quill = this;
  const selection = quill.getSelection();

  if (selection) {
    const startIndex = selection.index;
    const length = selection.length;

    let contentToInsert = 'Your code here';

    if (length > 0) {
      contentToInsert = quill.getText(startIndex, length);
      quill.deleteText(startIndex, length); 
    } else {
      const [block] = quill.getLine(startIndex);
      if (block && block.domNode) { 
        const lineText = block.domNode.textContent || '';
        if (lineText.trim().length > 0) {
          contentToInsert = lineText;
          // Delete the original line content if we're wrapping it
          quill.deleteText(quill.getIndex(block), block.length());
        }
      }
    }

    quill.insertEmbed(startIndex, 'code-block', contentToInsert);
    quill.setSelection(startIndex + contentToInsert.length + 1, 0);
  } else {
    const currentRange = quill.getSelection();
    const index = currentRange ? currentRange.index : 0;
    quill.insertEmbed(index, 'code-block', 'Your code here');
    quill.setSelection(index + 'Your code here'.length + 1, 0);
  }
}


const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
      ['customCodeBlock']
    ],
    handlers: {
      'customCodeBlock': insertCodeBlock
    }
  }
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image', 'color', 'background', 'clean',
  'code-block'
];

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
          <ReactQuill
            className="my-custom-editor"
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            readOnly={disabled}
            placeholder="Start typing your content here..."
          />
        </div>
      </div>
    </div>
  );
};