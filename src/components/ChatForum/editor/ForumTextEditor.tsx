"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ForumTextEditor({ value, onChange }: Props) {
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
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md">
      <EditorContent
        editor={editor}
        className="p-4 min-h-[160px] prose max-w-none focus:outline-none"
      />
    </div>
  );
}
