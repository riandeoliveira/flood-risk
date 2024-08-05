import { makeAutoObservable } from "mobx";

class MapStore {
  public ref?: google.maps.Map | null;

  public constructor() {
    makeAutoObservable(this);
  }

  public setRef(ref: google.maps.Map | null): void {
    this.ref = ref;
  }

  public resetZoom(): void {
    this.zoomToLocation(-14.235, -51.9253, 5);
  }

  public zoomToLocation(latitude: number, longitude: number, zoom: number = 12): void {
    if (this.ref) {
      this.ref.setCenter(new google.maps.LatLng(latitude, longitude));
      this.ref.setZoom(zoom);
    }
  }
}

export const mapStore = new MapStore();
