"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
     immediatelyRender: false,
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 text-ink",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-sm border border-line bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-line p-2 bg-paper-deep">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded px-2 py-1 text-sm font-bold ${
            editor.isActive("bold") ? "bg-accent text-paper" : "bg-paper text-ink hover:bg-line"
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded px-2 py-1 text-sm italic ${
            editor.isActive("italic") ? "bg-accent text-paper" : "bg-paper text-ink hover:bg-line"
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`rounded px-2 py-1 text-sm font-bold ${
            editor.isActive("heading", { level: 2 }) ? "bg-accent text-paper" : "bg-paper text-ink hover:bg-line"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`rounded px-2 py-1 text-sm font-bold ${
            editor.isActive("heading", { level: 3 }) ? "bg-accent text-paper" : "bg-paper text-ink hover:bg-line"
          }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-2 py-1 text-sm ${
            editor.isActive("bulletList") ? "bg-accent text-paper" : "bg-paper text-ink hover:bg-line"
          }`}
        >
          • List
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}