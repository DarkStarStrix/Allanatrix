import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = ({ initialContent, onSave }) => {
  const [content, setContent] = useState(initialContent);

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <ReactMarkdown>{content}</ReactMarkdown>
      <button onClick={() => onSave(content)}>Save</button>
    </div>
  );
};

export default MarkdownEditor;