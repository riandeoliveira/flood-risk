import { FooterArea } from "@/components/footer-area";
import { HeaderArea } from "@/components/header-area";
import { MapArea } from "@/components/map-area";
import { SideBar } from "@/components/side-bar";
import type { ReactElement } from "react";

const HomePage = (): ReactElement => {
  return (
    <div className="h-screen flex flex-col">
      <HeaderArea />
      <main className="flex h-full s-1440px:flex-col">
        <SideBar />
        <MapArea />
      </main>
      <FooterArea />
    </div>
  );
};

export default HomePage;
