"use client";

import { images } from "@/assets/images";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

export const HeaderArea = observer((): ReactElement => {
  return (
    <header className="items-center bg-[#170C36] flex h-20 justify-between p-4">
      <Link
        href="https://github.com/Fernanda-Kipper/hackathon-2024"
        target="_blank"
        rel="noreferrer"
        className="h-18 s-600px:h-14"
      >
        <Image
          src={images.hackathonLogo}
          alt="Logo do Hackathon da comunidade KipperDev"
          className="h-18 w-40 s-600px:h-14 s-600px:w-32"
        />
      </Link>
      <Link
        href="https://github.com/Flood-Risk"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center"
      >
        <Image
          src={images.floodAlert}
          alt="Logo da aplicação Flood Risk"
          width={40}
          height={24}
          className="flex items-center gap-3 s-600px:w-10 s-600px:h-8 s-600px:gap-2"
        />
        <h1 className="text-white text-xl font-semibold s-600px:text-base">Flood Risk</h1>
      </Link>
      <div className="flex gap-3 items-center s-600px:gap-2">
        <Image
          src={images.brazilFlag}
          alt="Bandeira do Brasil"
          className="h-12 w-12 s-600px:h-10 s-600px:w-10"
        />
        <Image
          src={images.rsFlag}
          alt="Bandeira do Rio Grande do Sul"
          className="h-12 w-12 s-600px:h-10 s-600px:w-10"
        />
      </div>
    </header>
  );
});
