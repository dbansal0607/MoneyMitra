import { create } from 'zustand'

interface AppState {
  pdfFile: File | null
  healthProfile: any | null
  fireProfile: any | null
  
  backendResult: any | null
  
  setPdfFile: (file: File | null) => void
  setHealthProfile: (profile: any | null) => void
  setFireProfile: (profile: any | null) => void
  setBackendResult: (result: any | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  pdfFile: null,
  healthProfile: null,
  fireProfile: null,
  backendResult: null,
  
  setPdfFile: (file) => set({ pdfFile: file }),
  setHealthProfile: (profile) => set({ healthProfile: profile }),
  setFireProfile: (profile) => set({ fireProfile: profile }),
  setBackendResult: (result) => set({ backendResult: result })
}))
