"use client";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "react-toastify";

interface CopyUrlProps {
  noteId: string;
}

const CopyUrl: React.FC<CopyUrlProps> = ({ noteId }) => {
  const [copied, setCopied] = useState(false);

  const noteUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/notes/${noteId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(noteUrl);
      setCopied(true);
      toast("URL copied to clipboard!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log("Failed to copy URL", error);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-neutral-800 p-6 rounded-2xl w-full max-w-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-white">Share Your Note</h2>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-neutral-400">Note URL</label>

        {/* Input + Button as ONE unit */}
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-neutral-900 px-3 py-2">
          <input
            type="text"
            value={noteUrl}
            readOnly
            className="flex-1 bg-transparent text-white focus:outline-none text-sm"
          />

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg
          bg-linear-to-r from-orange-400 via-orange-500 to-orange-600
          text-white text-sm font-medium
          border border-white/20
          shadow shadow-orange-500/30
          transition-all duration-300
          hover:brightness-110
          hover:shadow-orange-500/50
          active:translate-y-0
          active:brightness-95
          flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Important Note */}
        <p className="text-xs px-2 text-neutral-400 leading-relaxed">
          <span className="font-medium text-neutral-300">Important:</span>{" "}
          Save this link and password securely. If you lose either the link or
          the password, this note cannot be recovered or accessed again.
        </p>
      </div>
    </div>
  );
};

export default CopyUrl;
