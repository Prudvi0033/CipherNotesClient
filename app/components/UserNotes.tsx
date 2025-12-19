"use client";
import React, { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";
import { formatDate } from "../lib/utils";

interface NoteData {
  noteId: string;
  createdAt: string;
  expiresAt: string | null;
}

interface UserNotesProps {
  items: string[];
}

const UserNotes: React.FC<UserNotesProps> = ({ items }) => {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      
      // Handle empty items array
      if (items.length === 0) {
        setLoading(false);
        return;
      }

      const fetchedNotes: NoteData[] = [];

      for (const id of items) {
        try {
          const res = await axiosInstance.get(`/notes/${id}`);
          if (res.data.data.exists && !res.data.data.isExpired) {
            fetchedNotes.push({
              noteId: res.data.data.noteId,
              createdAt: res.data.data.createdAt,
              expiresAt: res.data.data.expiresAt,
            });
          }
        } catch (error) {
          console.error(`Failed to fetch note ${id}:`, error);
        }
      }

      setNotes(fetchedNotes);
      setLoading(false);
    };

    fetchNotes();
  }, [items]);

  const handleCopy = async (noteId: string) => {
    const noteUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/notes/${noteId}`;

    try {
      await navigator.clipboard.writeText(noteUrl);
      setCopiedId(noteId);
      toast("URL copied to clipboard!");

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.log("Failed to copy URL", error);
      toast.error("Failed to copy URL");
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-136 space-y-4">
        <div className="bg-neutral-800 p-6 rounded-2xl animate-pulse">
          <div className="h-4 bg-neutral-700 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-neutral-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="w-full max-w-136">
        <div className="bg-neutral-800 p-8 rounded-2xl text-center">
          <p className="text-neutral-400">No notes found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-136 space-y-4">
      {notes.map((note) => (
        <div
          key={note.noteId}
          className="bg-neutral-800 p-6 rounded-2xl border border-white/10 space-y-4"
        >
          {/* Note ID Section */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-xs text-neutral-400 mb-1 block">
                Note ID
              </label>
              <p className="text-white font-mono text-sm">{note.noteId}</p>
            </div>

            <button
              onClick={() => handleCopy(note.noteId)}
              className="p-2.5 rounded-lg
                bg-linear-to-r from-orange-400 via-orange-500 to-orange-600
                text-white
                border border-white/20
                shadow shadow-orange-500/30
                transition-all duration-300
                hover:brightness-110
                hover:shadow-orange-500/50
                active:translate-y-0
                active:brightness-95"
            >
              {copiedId === note.noteId ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          {/* Dates Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-neutral-400 mb-1 block">
                Created
              </label>
              <p className="text-white text-sm">{formatDate(note.createdAt)}</p>
            </div>

            <div>
              <label className="text-xs text-neutral-400 mb-1 block">
                Expires
              </label>
              <p className="text-white text-sm">
                {note.expiresAt ? formatDate(note.expiresAt) : "Never"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserNotes;