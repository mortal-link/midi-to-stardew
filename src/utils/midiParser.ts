import { Midi } from '@tonejs/midi'
import type { TrackInfo, MusicPreset, MusicBlock, MusicNote } from '@/types/music'

export function parseMidi(arrayBuffer: ArrayBuffer): Midi {
  return new Midi(arrayBuffer)
}

export function getTrackInfos(midi: Midi): TrackInfo[] {
  return midi.tracks.map((track, index) => ({
    index,
    name: track.name || `Track ${index + 1}`,
    noteCount: track.notes.length,
    instrument: track.instrument?.name || 'Unknown',
    selected: track.notes.length > 0,
  }))
}

export interface ExportOptions {
  quantization: number // 量化精度（毫秒）
  chordThreshold: number // 和弦检测阈值（毫秒）
  includeVelocity: boolean
}

export function exportToPreset(
  midi: Midi,
  selectedTracks: number[],
  options: ExportOptions
): MusicPreset {
  const { quantization, chordThreshold, includeVelocity } = options

  // 收集所有选中轨道的音符
  const allNotes: { time: number; note: string; duration: number; velocity: number }[] = []

  for (const trackIndex of selectedTracks) {
    const track = midi.tracks[trackIndex]
    if (!track) continue

    for (const note of track.notes) {
      allNotes.push({
        time: note.time * 1000, // 转换为毫秒
        note: note.name,
        duration: note.duration * 1000,
        velocity: Math.round(note.velocity * 127),
      })
    }
  }

  // 按时间排序
  allNotes.sort((a, b) => a.time - b.time)

  // 量化并分组为和弦
  const blocks: MusicBlock[] = []
  let currentBlock: MusicNote[] = []
  let currentTime = -Infinity

  for (const note of allNotes) {
    const quantizedTime = Math.round(note.time / quantization) * quantization

    if (quantizedTime - currentTime > chordThreshold && currentBlock.length > 0) {
      blocks.push({ Notes: currentBlock })
      currentBlock = []
    }

    currentBlock.push({
      Note: note.note,
      Duration: Math.round(note.duration / quantization) * quantization,
      Velocity: includeVelocity ? note.velocity : 100,
    })
    currentTime = quantizedTime
  }

  if (currentBlock.length > 0) {
    blocks.push({ Notes: currentBlock })
  }

  return {
    Name: midi.name || 'Untitled',
    Blocks: blocks,
  }
}
