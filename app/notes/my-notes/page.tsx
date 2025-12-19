"use client";
import UserNotes from "@/app/components/UserNotes";
import React, { useEffect, useState } from "react";
import { Info, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [noteIds, setNoteids] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getIds = () => {
      const ids = localStorage.getItem("cipherId");
      setNoteids(ids ? JSON.parse(ids) : []);
    };

    getIds();
  }, []);

  return (
    <div className="min-h-screen w-full  overflow-y-auto py-8 flex flex-col items-center justify-start bg-neutral-900 px-4">
      {/* Back Button */}
      <div className="w-full max-w-136 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm font-medium">Back to writing</span>
        </button>
      </div>

      {/* Info Banner */}
      <div className="w-full max-w-136 mb-6">
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 flex gap-3">
          <Info size={20} className="text-orange-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-orange-300 font-medium text-sm mb-1">
              Browser-Based History
            </h3>
            <p className="text-neutral-300 text-xs leading-relaxed">
              {`These notes are displayed because they were created on this browser. 
              If you switch to a different browser or device, this list won't appear—but 
              don't worry, your notes are safely stored in our database and can still be 
              accessed using their unique links and passwords.`}
            </p>
          </div>
        </div>
      </div>

      {/* Notes Component */}
      <UserNotes items={noteIds} />
    </div>
  );
};

export default Page;