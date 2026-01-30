import { create } from 'zustand'
import { Midi } from '@tonejs/midi'
import type { TrackInfo } from '@/types/music'

interface MidiState {
  midi: Midi | null
  tracks: TrackInfo[]
  fileName: string | null
  setMidi: (midi: Midi, fileName: string) => void
  toggleTrack: (index: number) => void
  selectAllTracks: () => void
  deselectAllTracks: () => void
  reset: () => void
}

export const useMidiStore = create<MidiState>((set) => ({
  midi: null,
  tracks: [],
  fileName: null,

  setMidi: (midi, fileName) => {
    const tracks: TrackInfo[] = midi.tracks.map((track, index) => ({
      index,
      name: track.name || `Track ${index + 1}`,
      noteCount: track.notes.length,
      instrument: track.instrument?.name || 'Unknown',
      selected: track.notes.length > 0,
    }))
    set({ midi, tracks, fileName })
  },

  toggleTrack: (index) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.index === index ? { ...track, selected: !track.selected } : track
      ),
    })),

  selectAllTracks: () =>
    set((state) => ({
      tracks: state.tracks.map((track) => ({ ...track, selected: true })),
    })),

  deselectAllTracks: () =>
    set((state) => ({
      tracks: state.tracks.map((track) => ({ ...track, selected: false })),
    })),

  reset: () => set({ midi: null, tracks: [], fileName: null }),
}))
