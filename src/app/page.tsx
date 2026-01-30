import { MidiUploader, TrackList, ExportPanel } from "@/components/midi"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            MIDI to Stardew Valley
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            将 MIDI 文件转换为星露谷钢琴块配置
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* 上传区域 */}
        <div className="mb-6">
          <MidiUploader />
        </div>

        {/* MIDI 信息和编辑区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：音轨列表 */}
          <div className="lg:col-span-2">
            <TrackList />
          </div>

          {/* 右侧：导出设置 */}
          <div>
            <ExportPanel />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          Piano Block Mod for Stardew Valley
        </div>
      </footer>
    </div>
  )
}
