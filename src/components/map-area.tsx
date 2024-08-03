"use client";

import { Icon } from "@/assets/icons";
import { sideBarStore } from "@/stores/side-bar-store";
import { IconButton, Tooltip } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { observer } from "mobx-react-lite";
import { type ReactElement } from "react";

export const MapArea = observer((): ReactElement => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const containerStyles = {
    width: "100%",
    height: "calc(83.1vh - 8rem)",
  };

  return (
    <section className="flex-1">
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyles}
            center={{
              lat: -14.235,
              lng: -51.9253,
            }}
            zoom={5}
            mapTypeId="terrain"
          />
          <Tooltip title={!sideBarStore.isOpen && "Abrir menu de opções"} placement="top-end">
            <IconButton
              onClick={() => sideBarStore.toggle()}
              className="!absolute w-12 h-12 rounded-full translate-y-[-80px] translate-x-2 !bg-[#170C36]"
            >
              {sideBarStore.isOpen ? (
                <Icon.KeyboardDoubleArrowLeft className="text-white" />
              ) : (
                <Icon.KeyboardDoubleArrowRight className="text-white" />
              )}
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <div style={containerStyles} />
      )}
    </section>
  );
});
