"use client";
import { NoteExpired } from "@/app/components/NoteExpired";
import { NoteNotFound } from "@/app/components/NoteNotFound";
import { axiosInstance } from "@/app/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [exists, setExists] = useState(false)
  const [isExpired, setIsexpired] = useState(false)

  useEffect(() => {
    const isTheIdValid = async () => {
        setLoading(true)
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setExists(res.data.data.exists)
        setIsexpired(res.data.data?.isExpired)
      } catch (error) {
        console.log("Error in getting note info", error);
      } finally {
        setLoading(false)
      }
    };

    isTheIdValid();
  }, [id]);

  if(!exists){
    return <NoteNotFound/>
  }

  if(isExpired){
    return <NoteExpired/>
  }

  return <div>
    <div>{id}</div>
    {loading ? "loading..." : (
        <div className="text-black">{exists?.toString()} : {isExpired.toString()}</div>
    )}
  </div>;
};

export default Page;
