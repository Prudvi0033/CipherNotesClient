"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import FontSize from "@tiptap/extension-font-size";
import { useEffect } from "react";

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
      const plainText = editor.getText().replace(/\n/g, "").trim();
      const html = editor.getHTML();

      if (plainText.length > 500) {
        const trimmedText = plainText.slice(0, 500);

        editor.commands.setContent(trimmedText);
        editor.commands.setTextSelection(trimmedText.length);

        onChange(trimmedText);
        return;
      }

      onChange(html);
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (!content) {
      editor.commands.clearContent();
    }
  }, [content, editor]);

  return (
    <div className="prose prose-invert w-full max-w-2xl">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="bg-neutral-900 focus-within:border-white/20 border leading-loose border-white/10 rounded-2xl p-6 min-h-100 text-neutral-100 transition-all duration-300 outline-none"
      />
    </div>
  );
};

export default Tiptap;
