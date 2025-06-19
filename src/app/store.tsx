import { create } from 'zustand'

// export type Location = {
//     name:string,
//     region: string,
//     country: string,
//     lat?: number,
//     lon?: number
// }

// const defaultLocation: Location = {
//     name: 'Colombo',
//     region: 'Western',
//     country: 'Sri Lanka'
// }

type LocationState = {
    currentLocation: string | number,
    setLocation: (location: string ) => void,
    setLocationById: (location: number) => void
    // clearLocation: () => void;
  }

export const useLocationStore = create<LocationState>((set) => ({
    currentLocation: "", // initial state
    setLocation: (location) => set({ currentLocation: location}),
    setLocationById: (location) => set({ currentLocation: location})
    // clearLocation: () => set({ currentLocation : null })
}))

// note - need to pass lat & lon when setting location

