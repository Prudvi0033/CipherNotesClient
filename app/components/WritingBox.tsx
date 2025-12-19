"use client";
import React, { useState } from "react";
import Tiptap from "./TipTap";
import GlowButton from "./GlowButton";
import { cn } from "../lib/cn";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import CopyUrl from "./CopyUrl";
import { addNoteIdToLocalstorage } from "../lib/utils";

const WritingBox = () => {
  const [text, setText] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("");

  const [openModal, setOpenmodal] = useState(false);
  const [showPassword, setShowpassword] = useState(false);
  const [noteId, setNoteid] = useState("");
  const [showCopyUrl, setShowCopyUrl] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!password.trim()) {
      toast.error("Password is required!");
      return;
    }

    const expiryDays = expiry ? Number(expiry) : null;

    setLoading(true);
    try {
      const res = await axiosInstance.post("/notes", {
        content: text,
        password: password,
        expiryInDays: expiryDays,
      });

      setNoteid(res.data.data.noteId);

      //setting the noteId to localstoage
      try {
        addNoteIdToLocalstorage(res.data.data.noteId);
      } catch (error) {
        console.error("Failed to save to localstorage:", error);
      }

      setPassword("");
      setText("");
      setExpiry("");
      setOpenmodal(false);
      setShowCopyUrl(true);
      toast("Note saved successfully!");
    } catch (error) {
      console.log("Error in creating notes", error);
      toast.error("Error in creating notes");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!text || text.length === 0) {
      toast.error("Text cannot be empty!");
      return;
    }

    setOpenmodal(true);
  };

  return (
    <div className="w-full max-w-136">
      <Tiptap content={text} onChange={setText} />
      <div className="w-full flex justify-between px-2">
        <p
          className={cn(
            "text-sm  py-2",
            text !== null && text?.length > 480
              ? "text-red-700"
              : "text-neutral-400"
          )}
        >
          {text === null ? 0 : text.length}/{500}
        </p>
        <div className="py-4">
          <GlowButton
            disableChevron
            onClick={() => handleSave()}
            className="font-semibold text-white"
          >
            Save
          </GlowButton>
        </div>
      </div>

      {openModal && (
        <div
          onClick={() => setOpenmodal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-800 p-6 rounded-2xl w-full max-w-md space-y-4"
          >
            <div className="w-full flex items-center justify-end">
              <X
                onClick={() => setOpenmodal(false)}
                size={14}
                className="text-neutral-200 hover:text-neutral-200/80 cursor-pointer duration-300 transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-neutral-400 mb-1">Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-white/10 bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-300"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowpassword(!showPassword)}
                  className="absolute right-4 text-neutral-400"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-neutral-400 mb-1">Expiry</label>
              <input
                type="number"
                min={1}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full 
                          appearance-none
                          [&::-webkit-outer-spin-button]:appearance-none
                          [&::-webkit-inner-spin-button]:appearance-none
                          px-3 py-2 rounded-xl border border-white/10 bg-neutral-900 text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-300"
                placeholder="Enter in days"
              />
              <span className="text-xs flex gap-2 px-2 text-neutral-300 mt-1">
                <p className="text-neutral-300">Note: </p>If not entered, it
                will expire in 7 days by default
              </span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="
                px-5 py-2 rounded-xl
                bg-linear-to-r from-orange-400 via-orange-500 to-orange-600
                text-white font-medium
                border border-white/20
                shadow
                shadow-orange-500/30
                [box-shadow:inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.1),0_8px_24px_rgba(255,140,0,0.2)]
                transition-all duration-300 ease-out
                hover:brightness-110
                cursor-pointer
                hover:shadow-orange-500/50
                hover:-translate-y-0.5
                active:translate-y-0
                active:brightness-95
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:translate-y-0
                flex items-center gap-2
    "
              >
                {loading && <Loader2 className="animate-spin" size={16} />}
                {loading ? "Saving" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCopyUrl && (
        <div
          onClick={() => setShowCopyUrl(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
        >
          <CopyUrl noteId={noteId} />
        </div>
      )}
    </div>
  );
};

export default WritingBox;
