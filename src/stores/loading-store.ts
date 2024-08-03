import { makeAutoObservable } from "mobx";

class LoadingStore {
  public isLoading: boolean = false;

  public constructor() {
    makeAutoObservable(this);
  }

  public stop(): void {
    this.isLoading = false;
  }

  public wait(): void {
    this.isLoading = true;
  }
}

export const loadingStore = new LoadingStore();
