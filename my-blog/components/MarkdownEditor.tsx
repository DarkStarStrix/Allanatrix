import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

const MarkdownEditor = ({ initialContent, onSave }: MarkdownEditorProps) => {
  const [content, setContent] = useState(initialContent);

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 p-2 border rounded"
      />
      <button
        onClick={() => onSave(content)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
      <div className="prose prose-invert">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;