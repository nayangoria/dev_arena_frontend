import { useEffect,useState } from "react";
function ScoreBar({ value, color }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), 100);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 6, flex: 1 }}>
      <div style={{
        height: "100%", borderRadius: 4, background: color,
        width: `${w}%`, transition: "width 1s ease"
      }} />
    </div>
  );
}
export default ScoreBar;