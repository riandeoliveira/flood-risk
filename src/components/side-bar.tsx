"use client";

import { sideBarStore } from "@/stores/side-bar-store";
import { observer } from "mobx-react-lite";
import type { ReactElement } from "react";
import { FloodRiskAreaCreationForm } from "./flood-risk-area-creation-form";
import { FloodRiskAreaDeletion } from "./flood-risk-area-deletion";
import { FloodRiskAreaUpdateForm } from "./flood-risk-area-update-form";
import { FloodRiskAreaVisualization } from "./flood-risk-area-visualization";
import { FloodRiskAreasViewingList } from "./flood-risk-areas-viewing-list";

export const SideBar = observer((): ReactElement => {
  const sectionStyles = {
    flex: sideBarStore.isOpen ? 0.4 : 0,
    padding: sideBarStore.isOpen ? "16px" : 0,
  };

  const sectionContent = {
    CREATE: <FloodRiskAreaCreationForm />,
    DELETE: <FloodRiskAreaDeletion />,
    READ_ALL: <FloodRiskAreasViewingList />,
    READ_ONE: <FloodRiskAreaVisualization />,
    UPDATE: <FloodRiskAreaUpdateForm />,
  };

  return (
    <section
      style={sectionStyles}
      className="transition-all overflow-y-auto overflow-x-hidden h-[88vh] s-1440px:min-h-[40vh] s-1440px:h-full"
    >
      {sideBarStore.isOpen && sectionContent[sideBarStore.actionType]}
    </section>
  );
});
