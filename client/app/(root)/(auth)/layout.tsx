import Image from "next/image";
import React from "react";
import LightRays from "@/components/LightRays";


const layout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="relative w-full bg-black overflow-hidden">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.5}
          rayLength={5}
          followMouse={false}
          mouseInfluence={0.02}
          noiseAmount={0.01}
          distortion={0.1}
          className="custom-rays absolute inset-0 z-10"
        />
        <div className="relative">
          <div className="w-full bg-black flex pt-4 items-center relative">
            <Image
              src={"/images/logo.png"}
              width={120}
              height={20}
              alt={"logo"}
              className="-rotate-55 rounded-full ml-20"
            />
            <h1 className="font-fleur-de-leah text-5xl">Vortex</h1>
          </div>
          <div className="bg-black pt-6 flex justify-center items-center flex-col">
            {children}
          </div>
          <div className="p-10 bg-black -z-1">
            <h1 className="text-center font-serif">&copy; Vortex {new Date().getFullYear()}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default layout;