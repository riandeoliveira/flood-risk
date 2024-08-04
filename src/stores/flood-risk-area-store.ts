import { makeAutoObservable } from "mobx";

class FloodRiskAreaStore {
  public currentId: number = 0;

  public constructor() {
    makeAutoObservable(this);
  }

  public setCurrentId(currentId: number): void {
    this.currentId = currentId;
  }
}

export const floodRiskAreaStore = new FloodRiskAreaStore();
