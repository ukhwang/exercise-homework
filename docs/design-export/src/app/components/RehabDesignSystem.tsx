import { Button } from "./design-system/Button";
import { Chip, CueChip } from "./design-system/Chip";
import { Card } from "./design-system/Card";
import { ProgressBar } from "./design-system/ProgressBar";
import { Alert } from "./design-system/Alert";

export function RehabDesignSystem() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6 space-y-12">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold mb-2">REHAB FLOW Design System</h1>
          <p className="text-[#757575]">Minimalist B2B/B2C Fitness Dashboard UI</p>
        </div>

        {/* Design Principles */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Design Principles</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-1">1. Trendy Minimalism</h3>
              <p className="text-[#757575]">
                Remove unnecessary decoration, focus on form and function to minimize cognitive load
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">2. High Contrast</h3>
              <p className="text-[#757575]">
                Clean white background with vivid colors (blue, yellow) for instant recognition
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">3. Refined Roundness</h3>
              <p className="text-[#757575]">
                Modern soft impression with subtle rounded corners (4px-8px) instead of harsh rectangles
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">4. Content Hierarchy</h3>
              <p className="text-[#757575]">
                Clear priority distinction through color blocks, whitespace, font size and weight
              </p>
            </div>
          </div>
        </Card>

        {/* Color Palette */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="w-full h-24 bg-white border-2 border-[#E5E5E5] rounded-lg mb-2" />
              <p className="text-sm font-semibold">Base Background</p>
              <p className="text-xs text-[#757575]">#FFFFFF</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#004DFF] rounded-lg mb-2" />
              <p className="text-sm font-semibold">Primary Accent</p>
              <p className="text-xs text-[#757575]">#004DFF</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#FFEA00] rounded-lg mb-2" />
              <p className="text-sm font-semibold">Alert Accent</p>
              <p className="text-xs text-[#757575]">#FFEA00</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#E5E5E5] rounded-lg mb-2" />
              <p className="text-sm font-semibold">Cue Gray</p>
              <p className="text-xs text-[#757575]">#E5E5E5</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#E0EEE0] rounded-lg mb-2" />
              <p className="text-sm font-semibold">Cue Green</p>
              <p className="text-xs text-[#757575]">#E0EEE0</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#E0E8F0] rounded-lg mb-2" />
              <p className="text-sm font-semibold">Cue Blue</p>
              <p className="text-xs text-[#757575]">#E0E8F0</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#F0F0F0] rounded-lg mb-2" />
              <p className="text-sm font-semibold">Borders</p>
              <p className="text-xs text-[#757575]">#F0F0F0</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#1A1A1A] rounded-lg mb-2" />
              <p className="text-sm font-semibold text-white">Text</p>
              <p className="text-xs text-[#757575]">#1A1A1A</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#00C853] rounded-lg mb-2" />
              <p className="text-sm font-semibold">Success</p>
              <p className="text-xs text-[#757575]">#00C853</p>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Typography</h2>
          <div className="space-y-4">
            <div>
              <h1 className="mb-1">Heading 1 - 24px Bold</h1>
              <p className="text-xs text-[#757575]">letter-spacing: -0.3px</p>
            </div>
            <div>
              <h2 className="mb-1">Heading 2 - 20px Semibold</h2>
              <p className="text-xs text-[#757575]">letter-spacing: -0.2px</p>
            </div>
            <div>
              <h3 className="mb-1">Heading 3 - 18px Semibold</h3>
            </div>
            <div>
              <p className="text-base mb-1">Body Text - 16px Regular</p>
              <p className="text-xs text-[#757575]">Modern sans-serif (Pretendard, similar)</p>
            </div>
            <div>
              <p className="text-sm mb-1">Small Text - 14px Regular</p>
            </div>
          </div>
        </Card>

        {/* Buttons */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Buttons</h2>
          <div className="space-y-3">
            <Button variant="primary" size="large" className="w-full">
              Primary Large Button
            </Button>
            <Button variant="primary" size="default" className="w-full">
              Primary Default Button
            </Button>
            <Button variant="secondary" size="default" className="w-full">
              Secondary Button
            </Button>
            <Button variant="ghost" size="default" className="w-full">
              Ghost Button
            </Button>
            <div className="flex gap-2">
              <Button variant="set" size="set">
                1
              </Button>
              <Button variant="set" size="set" data-checked="true">
                ✓
              </Button>
              <Button variant="set" size="set">
                3
              </Button>
              <Button variant="set" size="set">
                4
              </Button>
            </div>
          </div>
        </Card>

        {/* Member Chips */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Member Chips</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#757575] mb-3">Default State</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                <Chip label="Sarah J." sublabel="Today" status="active" />
                <Chip label="Mike R." sublabel="Yesterday" status="pending" />
                <Chip label="Emma K." sublabel="2 days ago" />
              </div>
            </div>
            <div>
              <p className="text-sm text-[#757575] mb-3">Selected State</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                <Chip label="Sarah J." sublabel="Today" status="active" selected />
              </div>
            </div>
          </div>
        </Card>

        {/* Cue Chips */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Cue Chips</h2>
          <div className="flex flex-wrap gap-2">
            <CueChip label="Knees over toes" color="gray" />
            <CueChip label="Core engaged" color="green" />
            <CueChip label="Controlled descent" color="blue" />
            <CueChip label="Breathe steadily" color="gray" />
            <CueChip label="Straight line" color="green" />
            <CueChip label="Full range" color="blue" />
          </div>
        </Card>

        {/* Progress Bars */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Progress Bars</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2 text-[#757575]">25% Progress (Primary)</p>
              <ProgressBar value={25} color="primary" />
            </div>
            <div>
              <p className="text-sm mb-2 text-[#757575]">50% Progress (Primary)</p>
              <ProgressBar value={50} color="primary" />
            </div>
            <div>
              <p className="text-sm mb-2 text-[#757575]">75% Progress (Success)</p>
              <ProgressBar value={75} color="success" />
            </div>
            <div>
              <p className="text-sm mb-2 text-[#757575]">100% Progress (Success)</p>
              <ProgressBar value={100} color="success" />
            </div>
          </div>
        </Card>

        {/* Alerts */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Alerts</h2>
          <div className="space-y-3">
            <Alert variant="warning" icon="💡">
              <strong>Sarah J.</strong> reported difficulty with <strong>"Leg Extension 15kg"</strong> in
              the last session
            </Alert>
            <Alert variant="info" icon="ℹ️">
              <strong>Info:</strong> Today's focus is on lower body strength training
            </Alert>
            <Alert variant="success" icon="✓">
              <strong>Success:</strong> Workout plan successfully sent to the client
            </Alert>
          </div>
        </Card>

        {/* Cards */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Card Variants</h2>
          <div className="space-y-3">
            <Card variant="default">
              <h3 className="font-semibold mb-1">Default Card</h3>
              <p className="text-sm text-[#757575]">Border with #F0F0F0</p>
            </Card>
            <Card variant="elevated">
              <h3 className="font-semibold mb-1">Elevated Card</h3>
              <p className="text-sm text-[#757575]">Subtle shadow</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-semibold mb-1">Outlined Card</h3>
              <p className="text-sm text-[#757575]">Border with #E5E5E5</p>
            </Card>
          </div>
        </Card>

        {/* Layout & Spacing */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Layout & Spacing</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Border Radius:</strong> 4px (sm), 6px (md), 8px (lg), 12px (xl)
            </p>
            <p>
              <strong>Border Width:</strong> 1px for subtle borders
            </p>
            <p>
              <strong>Shadows:</strong> Minimal, only for elevated cards
            </p>
            <p>
              <strong>Touch Targets:</strong> Minimum 48px height
            </p>
            <p>
              <strong>Sticky Bottom CTA:</strong> Fixed bottom, full width, large button
            </p>
            <p>
              <strong>Scrollable Carousel:</strong> Horizontal scroll for member cards
            </p>
          </div>
        </Card>

        {/* Figma Component Tips */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Figma Component Tips</h2>
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Components</h3>
              <p className="text-[#757575]">
                Create individual components for member cards, alerts, search bar, cue chips, and CTA
                buttons
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Variants</h3>
              <p className="text-[#757575]">
                Member cards: Active/Pending/Selected states | Cue chips: Gray/Green/Blue colors
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Auto Layout</h3>
              <p className="text-[#757575]">
                Apply auto layout to all components and dashboard frames for responsive design
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Naming Convention</h3>
              <p className="text-[#757575]">
                REHAB_FLOW / Component_Name / Variant_State (e.g., Member_Card / Active)
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
