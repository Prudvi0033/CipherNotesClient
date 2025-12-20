import { Save, WandSparkles } from "lucide-react";
import React from "react";
import { cn } from "../lib/cn";

const GlowButton = ({
  children,
  className,
  onClick,
  disableChevron,
  loading,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disableChevron?: boolean;
  className?: string;
  loading?: boolean;
}) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={cn(
        "hover:opacity-[0.90] text-[18px] rounded-xl border font-extralight  relative overflow-hidden after:absolute after:content-[''] after:inset-0 after:[box-shadow:0_0_15px_-1px_#ffffff90_inset] after:rounded-xl before:absolute before:content-[''] before:inset-0  before:rounded-xl cursor-pointer flex items-center before:z-20 after:z-10",
        " before:[box-shadow:0_0_4px_-1px_#fff_inset] bg-[#DE732C]  border-[#f8d4b3]/80 ",
        className
      )}
    >
      <div className="flex items-center gap-2 border-r border-white/40 px-4 py-2 z-0 ">
        {!loading && (
          <div>
            {disableChevron ? (
              <Save className="w-5" />
            ) : (
              <WandSparkles className="w-5" />
            )}
          </div>
        )}
        <p>{children}</p>
      </div>
    </button>
  );
};

export default GlowButton;
