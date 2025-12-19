'use client'
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
import { motion } from "motion/react";
import { cn } from "../lib/cn";
import { useRouter } from "next/navigation";

type ToolbarProps = {
  editor: Editor | null;
};

export const Toolbar = ({ editor }: ToolbarProps) => {
  const router = useRouter()
  if (!editor) return null;

  const hasText = editor.getText().trim().length > 0
  return (
    <div className="flex gap-4 bg-neutral-900 py-4 items-center justify-start">
      <div
        className="flex items-center gap-4 p-2 bg-neutral-900 rounded-2xl 
                      shadow-[2px_2px_6px_rgba(0,0,0,0.5),-1px_-1px_3px_rgba(255,255,255,0.08)]"
      >
        <ToolbarButton
          hasText={hasText}
          title="Bold"
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={20} />
        </ToolbarButton>

        <ToolbarButton
        hasText={hasText}
          title="Italic"
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={20} />
        </ToolbarButton>

        <ToolbarButton
        hasText={hasText}
          title="Uline"
          isActive={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline size={20} />
        </ToolbarButton>

        <ToolbarButton
        hasText={hasText}
          title="Strike"
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
        hasText={hasText}
          title="Left"
          isActive={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <TextAlignStart size={20} />
        </ToolbarButton>

        <ToolbarButton
        hasText={hasText}
          title="Center"
          isActive={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <TextAlignCenter size={20} />
        </ToolbarButton>

        <ToolbarButton
        hasText={hasText}
          title="Right"
          isActive={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <TextAlignEnd size={20} />
        </ToolbarButton>
      </div>

      <motion.div
        className="relative flex items-center justify-center gap-4 p-2 bg-neutral-900 rounded-2xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),inset_-1px_-1px_2px_rgba(255,255,255,0.2)]"
        initial="hide"
        whileHover="show"
      >
        {" "}
        <button
          onClick={() => router.push("/notes/my-notes")}
          className={cn(
            "flex items-center cursor-pointer justify-center w-12 h-12 rounded-xl transition-all border border-neutral-500 bg-white",
            "text-neutral-800 text-shadow-black text-shadow-2xl",
            "shadow-[inset_-2px_-2px_1px_rgba(0,0,0,0.4),inset_2px_2px_1px_rgba(0,0,0,0.2)]"

          )}
        >
          <Notebook size={22} />
        </button>
        <motion.h2
          variants={{
            hide: { opacity: 0, y: 10, scale: 0.98 },
            show: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute flex items-center justify-center -top-8 w-full bg-neutral-300 text-neutral-800 font-medium rounded-xl text-[12px]"
        >
          My Notes
        </motion.h2>
      </motion.div>
    </div>
  );
};

type ToolbarButtonProps = {
  isActive: boolean;
  onClick: () => void;
  hasText: boolean,
  children: React.ReactNode;
  title: string;
};

const ToolbarButton = ({
  isActive,
  onClick,
  children,
  title,
  hasText
}: ToolbarButtonProps) => (
  <motion.div initial="hide" whileHover="show" className="relative group">
    <button
      onClick={onClick}
      disabled={!hasText}
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
    <motion.h2
      variants={{
        hide: { opacity: 0, y: 10, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute flex items-center justify-center -top-10 w-full bg-neutral-300 text-neutral-800 font-medium rounded-xl text-[12px]"
    >
      {title}
    </motion.h2>
  </motion.div>
);
