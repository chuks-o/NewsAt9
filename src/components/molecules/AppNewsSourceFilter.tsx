import React from "react";
import { AppSelect } from "~/components/atoms/AppSelect";

interface AppNewsSourceFilterProps {
  value: string;
  sources: { id: string; name: string; enabled: boolean }[];
  updateFilter: (value: string) => void;
}

export const AppNewsSourceFilter: React.FC<AppNewsSourceFilterProps> = ({ value, sources, updateFilter }) => (
  <AppSelect label="Source" id="source" value={value} options={sources.filter((s) => s.enabled)} onChange={(e) => updateFilter(e.target.value)} />
);
