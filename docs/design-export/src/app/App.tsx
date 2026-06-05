import { useState } from "react";
import { RehabDesignSystem } from "./components/RehabDesignSystem";
import { RehabTrainerWorkspace } from "./components/RehabTrainerWorkspace";
import { RehabMemberLink } from "./components/RehabMemberLink";

type Screen = "design-system" | "trainer" | "member";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("design-system");

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-white border-b border-[#F0F0F0] p-4 sticky top-0 z-50">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setCurrentScreen("design-system")}
            className={`px-6 h-[44px] rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
              currentScreen === "design-system"
                ? "bg-[#004DFF] text-white"
                : "bg-[#F8F8F8] text-[#1A1A1A] hover:bg-[#E5E5E5]"
            }`}
          >
            Design System
          </button>
          <button
            onClick={() => setCurrentScreen("trainer")}
            className={`px-6 h-[44px] rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
              currentScreen === "trainer"
                ? "bg-[#004DFF] text-white"
                : "bg-[#F8F8F8] text-[#1A1A1A] hover:bg-[#E5E5E5]"
            }`}
          >
            Trainer Workspace
          </button>
          <button
            onClick={() => setCurrentScreen("member")}
            className={`px-6 h-[44px] rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
              currentScreen === "member"
                ? "bg-[#004DFF] text-white"
                : "bg-[#F8F8F8] text-[#1A1A1A] hover:bg-[#E5E5E5]"
            }`}
          >
            Member Link
          </button>
        </div>
      </div>

      {/* Screen Renderer */}
      {currentScreen === "design-system" && <RehabDesignSystem />}
      {currentScreen === "trainer" && <RehabTrainerWorkspace />}
      {currentScreen === "member" && <RehabMemberLink />}
    </div>
  );
}