"use client";
import React, { useState } from "react";
import Tiptap from "./TipTap";
import GlowButton from "./GlowButton";
import { cn } from "../lib/cn";

const WritingBox = () => {
  const [text, setText] = useState<string | null>(null);

  return (
    <div className="w-full max-w-136">
      <Tiptap content={text} onChange={setText} />
      <div className="w-full flex justify-between px-2">
        <p className={cn(
          "text-sm  py-2",
          text!== null && text?.length > 480 ? "text-red-700" : "text-neutral-400"
        )}>
          {text === null ? 0 : text.length}/{500}
        </p>
        <div className="py-4">
          <GlowButton className="font-semibold text-white">Save</GlowButton>
        </div>
      </div>
    </div>
  );
};

export default WritingBox;
