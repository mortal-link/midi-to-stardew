export interface MusicNote {
  Note: string
  Duration: number
  Velocity: number
}

export interface MusicBlock {
  Notes: MusicNote[]
}

export interface MusicPreset {
  Name: string
  Blocks: MusicBlock[]
}

export interface TrackInfo {
  index: number
  name: string
  noteCount: number
  instrument: string
  selected: boolean
}
