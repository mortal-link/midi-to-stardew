"use client"

import { useCallback } from "react"
import { Upload } from "lucide-react"
import { useMidiStore } from "@/stores/midiStore"
import { parseMidi } from "@/utils/midiParser"
import { Card, CardContent } from "@/components/ui/card"

export function MidiUploader() {
  const { setMidi, fileName } = useMidiStore()

  const handleFile = useCallback(
    async (file: File) => {
      const arrayBuffer = await file.arrayBuffer()
      const midi = parseMidi(arrayBuffer)
      setMidi(midi, file.name)
    },
    [setMidi]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file && file.name.endsWith(".mid")) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  return (
    <Card>
      <CardContent className="p-6">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
        >
          <input
            type="file"
            accept=".mid,.midi"
            onChange={handleChange}
            className="hidden"
            id="midi-upload"
          />
          <label htmlFor="midi-upload" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {fileName ? (
                <>
                  已加载: <span className="font-medium">{fileName}</span>
                </>
              ) : (
                <>
                  拖拽 MIDI 文件到这里，或 <span className="text-blue-600">点击上传</span>
                </>
              )}
            </p>
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
