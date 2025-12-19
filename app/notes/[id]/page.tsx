"use client";
import { NoteExpired } from "@/app/components/NoteExpired";
import { NoteNotFound } from "@/app/components/NoteNotFound";
import ViewNotes from "@/app/components/ViewNotes";
import { axiosInstance } from "@/app/lib/axios";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams() as {id: string} ;
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);
  const [isExpired, setIsexpired] = useState(false);

  useEffect(() => {
    const isTheIdValid = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setExists(res.data.data.exists);
        setIsexpired(res.data.data?.isExpired);
      } catch (error) {
        console.log("Error in getting note info", error);
      } finally {
        setLoading(false);
      }
    };

    isTheIdValid();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-neutral-900 flex items-center justify-center">
        <LoaderCircle size={32} className="text-neutral-600 animate-spin" />
      </div>
    );
  }

  if (!exists) {
    return <NoteNotFound />;
  }

  if (isExpired) {
    return <NoteExpired />;
  }

  return (
    <div className="flex w-full min-h-screen bg-neutral-900 items-center justify-center">
      <ViewNotes noteId={id} />
    </div>
  );
};

export default Page;
