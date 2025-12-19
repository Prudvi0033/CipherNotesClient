import { Clock } from "lucide-react";

export const NoteExpired = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-neutral-800 rounded-lg p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-neutral-700/50">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
              <Clock className="w-8 h-8 text-orange-500" strokeWidth={1.5} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-medium text-white">
                Note Expired
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                This note has reached its expiration time and is no longer accessible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
