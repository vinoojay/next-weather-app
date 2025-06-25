import { create } from "zustand";
import { City } from "./weatherTypes";

type LocationState = {
  currentLocation: City | undefined;
  setLocation: (location: City) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: undefined, // initial state
  setLocation: (location) => set({ currentLocation: location }),
}));
