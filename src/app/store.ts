import { create } from "zustand";
import { WeatherApiResponse } from "./weatherTypes";

type LocationState = {
  currentLocation: WeatherApiResponse;
  setLocation: (location: WeatherApiResponse) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: undefined, // initial state
  setLocation: (location) => set({ currentLocation: location }),
}));
