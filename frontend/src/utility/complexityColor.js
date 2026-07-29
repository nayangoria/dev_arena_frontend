export function  complexityColor (tc) {
  if (!tc) return "#6B7280";
  if (tc.includes("1)")) return "#10B981";
  if (tc.includes("log")) return "#10B981";
  if (tc.includes("n)") && !tc.includes("²") && !tc.includes("³")) return "#7C3AED";
  if (tc.includes("log n)")) return "#F59E0B";
  if (tc.includes("²")) return "#F59E0B";
  if (tc.includes("³") || tc.includes("2^")) return "#EF4444";
  return "#6B7280";
};