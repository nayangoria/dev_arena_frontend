import { complexityColor } from "../utility/complexityColor";
function TCBadge({ tc }) {
  const color = complexityColor(tc);
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}44`,
      borderRadius: 6, padding: "3px 10px", fontSize: 13, fontWeight: 700,
      fontFamily: "monospace", letterSpacing: 1
    }}>{tc}</span>
  );
}
export default TCBadge;