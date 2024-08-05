"use client";

import { loadingStore } from "@/stores/loading-store";
import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { ReactElement } from "react";

export const LoadingArea = observer((): ReactElement => {
  return (
    <>
      {loadingStore.isLoading && (
        <div className="items-center flex h-full justify-center left-0 fixed top-0 w-full z-50 bg-[#18181baa]">
          <CircularProgress />
        </div>
      )}
    </>
  );
});
