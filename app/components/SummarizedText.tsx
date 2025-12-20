import React from "react";

type SummarizedTextProps = {
  content: string;
  loading: boolean
};

const SummarizedText = ({ content, loading }: SummarizedTextProps) => {
  if(loading){
    return <SummarySkeleton/>
  }

  return (
    <div className="w-full p-4 max-w-136 rounded-xl border border-white/10 bg-linear-to-br from-neutral-900 to-neutral-900/70 overflow-y-auto">
      <h3 className="text-neutral-200 font-semibold text-md">Summary</h3>
    
        <div className="w-full h-px my-2 bg-white/10"></div>

      <div className="prose prose-invert prose-sm max-w-none">
        <p className="text-neutral-300 leading-relaxed tracking-wide text-[14px] whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
};

export default SummarizedText;


const SummarySkeleton = () => {
  return (
    <div className="w-full h-32 p-4 max-w-136 rounded-xl border border-white/10 bg-linear-to-br from-neutral-900 to-neutral-800">
      {/* Title skeleton */}
      <div className="h-4 w-20 rounded-md bg-white/10 animate-pulse mb-3" />

      {/* Divider */}
      <div className="w-full h-px mb-3 bg-white/10" />

      {/* Text lines */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-white/10 animate-pulse" />
        <div className="h-3 w-[95%] rounded bg-white/10 animate-pulse" />
        <div className="h-3 w-[90%] rounded bg-white/10 animate-pulse" />
      </div>
    </div>
  );
};
