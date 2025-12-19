"use client";
import { NotebookText } from "lucide-react";
import { Instrument_Serif, Jost } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const serif = Instrument_Serif({ subsets: ["latin"], weight: ["400"] });
const jost = Jost({ subsets: ["latin"] });

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <div className="relative h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8">
        <Image
          src="/CiphernoteBg.png"
          alt="bg"
          fill
          className="object-cover select-none"
        />
        <div
          className="z-10 text-[2.8rem]  md:text-5xl lg:text-5xl xl:text-[5.5rem] leading-[0.9] text-center max-w-6xl"
          style={{
            color: "oklch(0.985 0 0)",
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}
        >
          <div className="absolute w-125 h-125 bg-orange-100/10 blur-[180px] rounded-full -z-10" />
          <h1
            style={{
              color: "oklch(0.985 0 0)",
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
            className={serif.className}
          >
            <span className="block">Encrypted Notes</span>

            <span className="flex flex-wrap justify-center gap-x-2 sm:gap-x-4 mt-2">
              <span>secured with</span>
              <span
                style={{
                  color: "oklch(0.7 0.2 50)",
                }}
              >
                CipherNote
              </span>
            </span>
          </h1>

          <div
            className={`text-[12px] md:text-lg lg:text-xl mt-6 sm:mt-8 ${jost.className} text-neutral-200 px-4`}
          >
            <p className="">
              Write freely. Your notes stay encrypted.
            </p>
            <p className="">Turn long notes into quick summaries with AI.</p>
          </div>

          <button
            onClick={() => router.push("/notes")}
            className={`px-5 py-2.5 sm:px-7 sm:py-3 mt-6 sm:mt-8 ${jost.className} rounded-xl text-base sm:text-lg bg-neutral-900 text-white cursor-pointer border border-neutral-800 hover:-translate-y-1 transition-transform shadow-[inset_0px_2px_6px_-2px_rgba(255,255,255,0.16)]`}
          >
            <span className="flex gap-2 items-center justify-center">
              <NotebookText size={20} />
              Start Writing
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
