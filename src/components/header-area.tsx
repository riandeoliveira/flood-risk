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
        className="h-18"
      >
        <Image
          src={images.hackathonLogo}
          alt="Logo do Hackathon da comunidade KipperDev"
          className="h-18 w-40"
        />
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="https://github.com/Flood-Risk"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3"
        >
          <Image
            src={images.floodAlert}
            alt="Logo da aplicação Flood Risk"
            width={48}
            height={32}
            className="flex items-center gap-3"
          />
          <h1 className="text-white text-2xl font-semibold">Flood Risk</h1>
        </Link>
      </div>
      <div className="flex gap-3">
        <Image src={images.brazilFlag} alt="Bandeira do Brasil" className="h-12 w-12" />
        <Image src={images.rsFlag} alt="Bandeira do Rio Grande do Sul" className="h-12 w-12" />
      </div>
    </header>
  );
});
