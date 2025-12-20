import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useState } from "react";
import GlowButton from "./GlowButton";
import { DUMMY_DATA, DUMMY_DATE, formatDate } from "../lib/utils";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";

type ViewNotesProps = {
  noteId: string;
};

const ViewNotes = ({ noteId }: ViewNotesProps) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);

  const [expiry, setExpiry] = useState(DUMMY_DATE);
  const [content, setContent] = useState(DUMMY_DATA);

  const [modal, setModal] = useState(true);

  const handleUnclockView = async () => {
    if (!password) {
      toast.error("Please enter password");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(`notes/${noteId}/view`, {
        password: password,
      });

      if (!res.data?.data?.content) {
        toast.error("Incorrect password");
        return;
      }

      setExpiry(res.data.data.expiresAt);
      setContent(res.data.data.content);
      setModal(false)
      toast("Note unlocked");
    } catch (error) {
      console.log("Error in viewing note", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div 
      className="w-136 p-6 select-none leading-loose tracking-wider text-neutral-300 border min-h-100 rounded-xl border-white/10"
      dangerouslySetInnerHTML={{ __html: content }} 
      >
        
      </div>
      <div className="flex justify-between py-4 px-2">
        <h3 className="text-neutral-300">
          Expires At: <p className="text-[14px] text-neutral-400">{formatDate(expiry)}</p>
        </h3>
        <GlowButton
          className="text-white font-semibold text-sm"
          onClick={() => {}}
        >
          Summarize
        </GlowButton>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
          <div className="bg-neutral-800 p-6 max-w-sm rounded-2xl w-full space-y-4">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-neutral-300">
                Private Note
              </h1>
              <p className="text-xs text-neutral-400 mb-6">
                This note is protected. Enter the correct password to continue.
              </p>
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
            <div className="flex justify-end">
              <button
                onClick={handleUnclockView}
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
                {loading ? "" : "Unlock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNotes;
