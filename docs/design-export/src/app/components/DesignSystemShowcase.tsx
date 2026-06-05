import { Button } from "./design-system/Button";
import { Chip } from "./design-system/Chip";
import { Card } from "./design-system/Card";
import { ProgressBar } from "./design-system/ProgressBar";
import { Alert } from "./design-system/Alert";

export function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white text-black p-8 border-2 border-black">
          <h1 className="mb-2">운동숙제 Design System</h1>
          <p className="text-sm opacity-60">Yeezy Brutalism × 15-Second Workflow</p>
        </div>

        {/* Colors */}
        <Card>
          <h2 className="mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="w-full h-20 bg-black border-2 border-black mb-2" />
              <p className="text-sm font-bold">Background</p>
              <p className="text-xs opacity-60">#000000</p>
            </div>
            <div>
              <div className="w-full h-20 bg-white border-2 border-black mb-2" />
              <p className="text-sm font-bold">Surface</p>
              <p className="text-xs opacity-60">#FFFFFF</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#CCFF00] border-2 border-black mb-2" />
              <p className="text-sm font-bold">Primary (Neon Green)</p>
              <p className="text-xs opacity-60">#CCFF00</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#FFFF00] border-2 border-black mb-2" />
              <p className="text-sm font-bold">Alert (Yellow)</p>
              <p className="text-xs opacity-60">#FFFF00</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#00FF00] border-2 border-black mb-2" />
              <p className="text-sm font-bold">Success (Green)</p>
              <p className="text-xs opacity-60">#00FF00</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#CCCCCC] border-2 border-black mb-2" />
              <p className="text-sm font-bold">Muted (Gray)</p>
              <p className="text-xs opacity-60">#CCCCCC</p>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card>
          <h2 className="mb-4">Typography</h2>
          <div className="space-y-4">
            <div>
              <h1>Heading 1 - 28px Bold</h1>
              <p className="text-xs opacity-60">letter-spacing: -0.5px</p>
            </div>
            <div>
              <h2>Heading 2 - 20px Bold</h2>
              <p className="text-xs opacity-60">letter-spacing: -0.25px</p>
            </div>
            <div>
              <h3>Heading 3 - 18px Bold</h3>
            </div>
            <div>
              <p>Body Text - 16px Regular, line-height 1.5</p>
            </div>
            <div>
              <button className="text-sm">BUTTON TEXT - 16PX BOLD UPPERCASE</button>
            </div>
          </div>
        </Card>

        {/* Buttons */}
        <Card>
          <h2 className="mb-4">Buttons</h2>
          <div className="space-y-3">
            <Button variant="primary" size="large" className="w-full">
              Primary CTA (Large)
            </Button>
            <Button variant="primary" size="default" className="w-full">
              Primary CTA (Default)
            </Button>
            <Button variant="secondary" size="default" className="w-full">
              Secondary Button
            </Button>
            <Button variant="alert" size="default" className="w-full">
              Alert Button
            </Button>
            <div className="flex gap-2">
              <Button variant="set" size="set">
                SET 1
              </Button>
              <Button variant="set" size="set" data-checked="true">
                SET 2 ✓
              </Button>
              <Button variant="set" size="set">
                SET 3
              </Button>
            </div>
          </div>
        </Card>

        {/* Chips */}
        <Card>
          <h2 className="mb-4">Chips</h2>
          <div className="flex gap-2 flex-wrap">
            <Chip label="김철수" sublabel="06.01" />
            <Chip label="이영희" sublabel="06.02" selected />
            <Chip label="박민수" sublabel="05.30" />
            <Chip label="+" />
          </div>
        </Card>

        {/* Progress Bar */}
        <Card>
          <h2 className="mb-4">Progress Bar</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm mb-2">25% Progress</p>
              <ProgressBar value={25} />
            </div>
            <div>
              <p className="text-sm mb-2">50% Progress</p>
              <ProgressBar value={50} />
            </div>
            <div>
              <p className="text-sm mb-2">80% Progress</p>
              <ProgressBar value={80} />
            </div>
            <div>
              <p className="text-sm mb-2">100% Progress</p>
              <ProgressBar value={100} />
            </div>
          </div>
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="mb-4">Alerts</h2>
          <div className="space-y-3">
            <Alert>
              <strong>김철수님</strong> 지난 숙제에서
              <br />
              <strong>"레그 익스텐션 15kg"</strong>이 가장 힘들었어요
            </Alert>
            <Alert icon="ℹ️">
              <strong>안내:</strong> 오늘은 하체 집중 운동입니다
            </Alert>
          </div>
        </Card>

        {/* Cards */}
        <Card>
          <h2 className="mb-4">Cards</h2>
          <Card className="bg-gray-50">
            <h3 className="mb-2">Exercise Card Example</h3>
            <p className="text-sm mb-2">3세트 × 12회 / 60kg</p>
            <p className="text-sm text-gray-600">큐잉: "무릎이 발끝 넘지 않게"</p>
          </Card>
        </Card>

        {/* Grid System */}
        <Card>
          <h2 className="mb-4">Grid & Spacing</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Base Grid:</strong> 4px
            </p>
            <p>
              <strong>Spacing Scale:</strong> 8px, 16px, 24px, 32px
            </p>
            <p>
              <strong>Touch Target:</strong> Minimum 56px height
            </p>
            <p>
              <strong>Border Width:</strong> 2px solid black
            </p>
            <p>
              <strong>Border Radius:</strong> 0px (pure brutalism)
            </p>
          </div>
        </Card>

        {/* Design Principles */}
        <Card>
          <h2 className="mb-4">Design Principles</h2>
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="mb-1">1. Zero-to-Done in 15 Seconds</h3>
              <p className="opacity-60">모든 액션은 3탭 이내, 56px+ 터치 영역, 스크롤 최소화</p>
            </div>
            <div>
              <h3 className="mb-1">2. Context Over Memory</h3>
              <p className="opacity-60">시스템이 트레이너 대신 기억하고 알림</p>
            </div>
            <div>
              <h3 className="mb-1">3. Brutal but Not Broken</h3>
              <p className="opacity-60">rounded-none, 흑백 대비 — 하지만 위계는 명확</p>
            </div>
            <div>
              <h3 className="mb-1">4. One-Handed Fatigue Mode</h3>
              <p className="opacity-60">엄지 하단 영역에 주요 액션, 큼직한 버튼</p>
            </div>
            <div>
              <h3 className="mb-1">5. White-Label Ready</h3>
              <p className="opacity-60">primary 컬러만 교체 가능한 CSS 변수 구조</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
