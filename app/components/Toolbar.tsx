import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Notebook,
  Strikethrough,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignStart,
  Underline,
} from "lucide-react";
import React from "react";

type ToolbarProps = {
  editor: Editor | null;
};

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="flex gap-4 bg-neutral-900 py-4 items-center justify-start">
      <div
        className="flex items-center gap-4 p-2 bg-neutral-900 rounded-2xl 
                      shadow-[2px_2px_6px_rgba(0,0,0,0.5),-1px_-1px_3px_rgba(255,255,255,0.08)]"
      >
        <ToolbarButton
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={20} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={20} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline size={20} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={20} />
        </ToolbarButton>
      </div>

      <div
        className="flex items-center gap-4 p-2 bg-neutral-900 rounded-2xl 
                      shadow-[2px_2px_6px_rgba(0,0,0,0.5),-1px_-1px_3px_rgba(255,255,255,0.08)]"
      >
        <ToolbarButton
          isActive={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <TextAlignStart size={20} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <TextAlignCenter size={20} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <TextAlignEnd size={20} />
        </ToolbarButton>
      </div>

      <button
        className="flex w-15 items-center justify-center h-15 gap-4 bg-white rounded-2xl border text-neutral-800 border-neutral-700
                shadow-[inset_2px_2px_64px_rgba(0,0,0,0.2),inset_-2px_-2px_3px_rgba(0,0,0,0.6),-1px_-1px_3px_rgba(0,0,0,0.6)]
                cursor-pointer
                "
      >
        <Notebook size={28} />
      </button>
    </div>
  );
};

type ToolbarButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const ToolbarButton = ({ isActive, onClick, children }: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    className={`
      flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-150
      ${
        isActive
          ? "text-neutral-200 bg-neutral-900 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.03)]"
          : "text-neutral-400 bg-neutral-900 hover:text-neutral-200 shadow-[1px_1px_3px_rgba(0,0,0,0.6),-1px_-1px_2px_rgba(255,255,255,0.08)] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),inset_-1px_-1px_2px_rgba(255,255,255,0.2)]"
      }
    `}
  >
    {children}
  </button>
);
