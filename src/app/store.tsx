import { create } from 'zustand'

export type City = {
    name:string,
    region: string,
    country: string,
    lat?: number,
    lon?: number,
    id: number
}

export const defaultLocation: City = {
    name: 'Colombo',
    region: 'Western',
    country: 'Sri Lanka',
    id: 2842281,
    lat: 6.93,
    lon: 79.85,
}

type LocationState = {
    currentLocation: City,
    setLocation: (location: City ) => void,
  }

export const useLocationStore = create<LocationState>((set) => ({
    currentLocation: defaultLocation, // initial state
    setLocation: (location) => set({ currentLocation: location})
}))
