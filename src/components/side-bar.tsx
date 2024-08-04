"use client";

import { sideBarStore } from "@/stores/side-bar-store";
import { observer } from "mobx-react-lite";
import type { ReactElement } from "react";
import { FloodRiskAreaCreationForm } from "./flood-risk-area-creation-form";
import { FloodRiskAreaDeletion } from "./flood-risk-area-deletion";
import { FloodRiskAreaVisualization } from "./flood-risk-area-visualization";
import { FloodRiskAreasViewingList } from "./flood-risk-areas-viewing-list";

export const SideBar = observer((): ReactElement => {
  const sectionStyles = {
    flex: sideBarStore.isOpen ? 0.4 : 0,
    padding: sideBarStore.isOpen ? "16px" : 0,
    height: "88vh",
  };

  const sectionContent = {
    CREATE: <FloodRiskAreaCreationForm />,
    DELETE: <FloodRiskAreaDeletion />,
    READ_ALL: <FloodRiskAreasViewingList />,
    READ_ONE: <FloodRiskAreaVisualization />,
    UPDATE: <FloodRiskAreasViewingList />,
  };

  return (
    <section
      style={sectionStyles}
      className="transition-all border-r-2 border-[#170C36] border-solid overflow-y-auto overflow-x-hidden"
    >
      {sideBarStore.isOpen && sectionContent[sideBarStore.actionType]}
    </section>
  );
});
