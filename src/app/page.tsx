import GradualSpacing from "@/components/ui/gradual-spacing";
import Image from "next/image";
import imgBanner from "./favicon.ico";
import BlurFade from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <BlurFade delay={0.5} inView>
        <Image
          src={imgBanner}
          alt="img banner"
          width={50}
          height={50}
          className="md:w-[100px] object-contain mb-[10px] md:mb-[20px]"
        />
      </BlurFade>

      <GradualSpacing
        className="font-Gorditas  text-center text-4xl md:text-7xl font-bold  text-white  md:leading-[5rem]"
        text="Welcome to PiQuiz"
        duration={1}
      />
    </div>
  );
}
