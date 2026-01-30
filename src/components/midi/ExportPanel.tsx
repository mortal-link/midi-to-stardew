"use client"

import { useState } from "react"
import { Download, Copy, Check } from "lucide-react"
import { useMidiStore } from "@/stores/midiStore"
import { exportToPreset, type ExportOptions } from "@/utils/midiParser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export function ExportPanel() {
  const { midi, tracks, fileName } = useMidiStore()
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState<ExportOptions>({
    quantization: 50,
    chordThreshold: 30,
    includeVelocity: true,
  })

  if (!midi) return null

  const selectedTracks = tracks.filter((t) => t.selected).map((t) => t.index)

  const handleExport = () => {
    const preset = exportToPreset(midi, selectedTracks, options)
    const json = JSON.stringify(preset, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${fileName?.replace(".mid", "") || "preset"}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    const preset = exportToPreset(midi, selectedTracks, options)
    const json = JSON.stringify(preset, null, 2)
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>导出设置</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 量化精度 */}
        <div>
          <label className="text-sm font-medium">
            量化精度: {options.quantization}ms
          </label>
          <Slider
            value={[options.quantization]}
            onValueChange={([v]) => setOptions({ ...options, quantization: v })}
            min={10}
            max={200}
            step={10}
            className="mt-2"
          />
        </div>

        {/* 和弦检测阈值 */}
        <div>
          <label className="text-sm font-medium">
            和弦检测阈值: {options.chordThreshold}ms
          </label>
          <Slider
            value={[options.chordThreshold]}
            onValueChange={([v]) => setOptions({ ...options, chordThreshold: v })}
            min={10}
            max={100}
            step={5}
            className="mt-2"
          />
        </div>

        {/* 包含力度 */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="velocity"
            checked={options.includeVelocity}
            onCheckedChange={(checked) =>
              setOptions({ ...options, includeVelocity: checked as boolean })
            }
          />
          <label htmlFor="velocity" className="text-sm font-medium">
            包含力度 (Velocity)
          </label>
        </div>

        {/* 导出按钮 */}
        <div className="flex gap-2">
          <Button onClick={handleExport} disabled={selectedTracks.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            下载 JSON
          </Button>
          <Button variant="outline" onClick={handleCopy} disabled={selectedTracks.length === 0}>
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? "已复制" : "复制"}
          </Button>
        </div>

        {/* 统计信息 */}
        <div className="text-xs text-gray-500">
          已选择 {selectedTracks.length} 个音轨，共{" "}
          {tracks
            .filter((t) => t.selected)
            .reduce((sum, t) => sum + t.noteCount, 0)}{" "}
          个音符
        </div>
      </CardContent>
    </Card>
  )
}
