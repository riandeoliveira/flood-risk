"use client";

import { sideBarStore } from "@/stores/side-bar-store";
import { observer } from "mobx-react-lite";
import type { ReactElement } from "react";
import { FloodRiskAreaCreationForm } from "./flood-risk-area-creation-form";
import { FloodRiskAreasVisualization } from "./flood-risk-areas-visualization";

export const SideBar = observer((): ReactElement => {
  const sectionStyles = {
    flex: sideBarStore.isOpen ? 0.4 : 0,
    padding: sideBarStore.isOpen ? "16px" : 0,
  };

  const sectionContent = {
    CREATE: <FloodRiskAreaCreationForm />,
    READ_ALL: <FloodRiskAreasVisualization />,
    READ_ONE: <FloodRiskAreasVisualization />,
    UPDATE: <FloodRiskAreasVisualization />,
  };

  return (
    <section
      style={sectionStyles}
      className="transition-all border-r-2 border-[#170C36] border-solid"
    >
      {sideBarStore.isOpen && sectionContent[sideBarStore.actionType]}
    </section>
  );
});
