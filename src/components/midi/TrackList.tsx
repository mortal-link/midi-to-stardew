"use client"

import { useMidiStore } from "@/stores/midiStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export function TrackList() {
  const { tracks, toggleTrack, selectAllTracks, deselectAllTracks } = useMidiStore()

  if (tracks.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>音轨列表</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={selectAllTracks}>
              全选
            </Button>
            <Button variant="outline" size="sm" onClick={deselectAllTracks}>
              取消全选
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tracks.map((track) => (
            <div
              key={track.index}
              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
            >
              <Checkbox
                checked={track.selected}
                onCheckedChange={() => toggleTrack(track.index)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{track.name}</p>
                <p className="text-xs text-gray-500">
                  {track.noteCount} 个音符 · {track.instrument}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
