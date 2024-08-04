import type { FindOneFloodRiskAreaResponse } from "@/features/find-one-flood-risk-area";
import { makeAutoObservable } from "mobx";

class FloodRiskAreaStore {
  public current: FindOneFloodRiskAreaResponse = {} as FindOneFloodRiskAreaResponse;

  public constructor() {
    makeAutoObservable(this);
  }

  public setCurrent(current: FindOneFloodRiskAreaResponse): void {
    this.current = current;
  }
}

export const floodRiskAreaStore = new FloodRiskAreaStore();
