"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import {
  CUE_TAG_PRESETS,
  QUICK_CUSTOM_TAG_SUGGESTIONS,
} from "@/features/exercise-library/model/exercise.types";
import { useRecordStore } from "@/features/records/model/record.store";

type CueChipEditorProps = {
  exerciseId: string;
  selectedTags: string[];
};

export function CueChipEditor({ exerciseId, selectedTags }: CueChipEditorProps) {
  const toggleCueTag = useRecordStore((s) => s.toggleCueTag);
  const addCustomCueTag = useRecordStore((s) => s.addCustomCueTag);
  const [draft, setDraft] = useState("");

  const presetSet = new Set<string>(CUE_TAG_PRESETS);
  const customTags = selectedTags.filter((tag) => !presetSet.has(tag));

  const handleAddCustom = () => {
    if (!draft.trim()) return;
    addCustomCueTag(exerciseId, draft);
    setDraft("");
  };

  return (
    <div className="mt-4">
      <p className="text-xs font-black uppercase tracking-[0.15em]">큐잉 태그</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {CUE_TAG_PRESETS.map((tag) => {
          const isActive = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleCueTag(exerciseId, tag)}
              className={cn(
                "h-12 border-2 border-black px-3 text-sm font-bold",
                isActive ? "bg-black text-white" : "bg-white text-black"
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_CUSTOM_TAG_SUGGESTIONS.map((tag) => {
          const isActive = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleCueTag(exerciseId, tag)}
              className={cn(
                "h-12 border-4 border-dashed border-black px-3 text-sm font-black",
                isActive ? "bg-black text-white" : "bg-white text-black"
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCustom();
            }
          }}
          placeholder="#직접입력"
          className="h-14 min-w-0 flex-1 border-4 border-black bg-white px-4 text-base font-bold placeholder:font-bold placeholder:text-black/40 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAddCustom}
          disabled={!draft.trim()}
          className="flex h-14 w-14 shrink-0 items-center justify-center border-4 border-black bg-black text-white disabled:bg-neutral-300 disabled:text-neutral-500"
          aria-label="태그 추가"
        >
          <Plus className="h-6 w-6" strokeWidth={3} />
        </button>
      </div>

      {customTags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {customTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleCueTag(exerciseId, tag)}
              className="h-12 border-4 border-black bg-[#eab308] px-3 text-sm font-black text-black"
            >
              {tag} ×
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
