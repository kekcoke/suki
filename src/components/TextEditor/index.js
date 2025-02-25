// TipTapEditor.jsx
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { useEffect } from "react";

const TextEditor = ({ content, onUpdate }) => {
  // Initialize the editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: content, // Initial content passed as prop
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML()); // Update parent component on content change
    },
  });

  useEffect(() => {
    // Set initial content if content prop changes
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
