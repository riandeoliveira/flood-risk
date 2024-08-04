import type { FindAllFloodRiskAreasResponse } from "@/features/find-all-flood-risk-areas";
import { makeAutoObservable } from "mobx";

class FloodRiskAreaStore {
  public currentId: number = 0;
  public list: FindAllFloodRiskAreasResponse[] = [];

  public constructor() {
    makeAutoObservable(this);
  }

  public setCurrentId(currentId: number): void {
    this.currentId = currentId;
  }

  public setList(list: FindAllFloodRiskAreasResponse[]): void {
    this.list = list;
  }
}

export const floodRiskAreaStore = new FloodRiskAreaStore();
