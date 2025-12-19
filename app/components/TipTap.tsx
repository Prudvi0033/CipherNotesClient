"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import FontSize from "@tiptap/extension-font-size";

type TiptapProps = {
  content: string | null;
  onChange: (text: string) => void;
};

const Tiptap = ({ content, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
      FontSize,
      Placeholder.configure({
        placeholder: "Write your note here...",
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate({ editor }) {
      const text = editor.getText().trim();

      if (text.length > 500) {
        const trimmed = text.slice(0, 500);

        editor.commands.setContent(trimmed);
        // editor.commands.setTextSelection(Math.min(from, trimmed.length));
        onChange(trimmed);
        return;
      }

      onChange(text);
    },
  });

  return (
    <div className="prose prose-invert w-full max-w-2xl">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="bg-neutral-900 focus-within:border-white/10 border border-white/5 rounded-2xl p-6 min-h-100 text-neutral-100 transition-all duration-300 outline-none"
      />
    </div>
  );
};

export default Tiptap;
