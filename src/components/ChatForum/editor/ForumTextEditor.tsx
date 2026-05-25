"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  border?: string;
  placeholder?: string;
};

export default function ForumTextEditor({
  value,
  onChange,
  border,
  placeholder,
}: Props) {
  const editor = useEditor({
    immediatelyRender: false, // 👈 REQUIRED for Next.js App Router
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: "list-disc ml-6 my-2" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal ml-6 my-2" },
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-gray-500 before:pointer-events-none before:text-sm before:absolute before:left-0 before:top-0",
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-md">
      <EditorContent
        editor={editor}
        placeholder={placeholder}
        className={`p-4 min-h-[160px] ${border} prose max-w-none focus:outline-none`}
      />
    </div>
  );
}
