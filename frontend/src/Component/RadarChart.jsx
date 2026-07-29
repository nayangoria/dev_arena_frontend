// ─── Radar Chart ──────────────────────────────────────────────────
import { useEffect,useState,useRef } from "react";

function RadarChart({ scores1, scores2, label1, label2 }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const labels = ["Correctness", "Time", "Quality", "Readability", "Approach"];
  const keys = ["correctness", "timeComplexity", "codeQuality", "readability", "approach"];

  useEffect(() => {
    let frame;
    let start = null;
    const duration = 1200;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) / 2 - 40;
    const n = labels.length;
    ctx.clearRect(0, 0, W, H);

    const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
    const pt = (i, r) => ({
      x: cx + r * Math.cos(angle(i)),
      y: cy + r * Math.sin(angle(i)),
    });

    // Grid rings
    [0.2, 0.4, 0.6, 0.8, 1].forEach((t) => {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const p = pt(i, R * t);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Spokes
    for (let i = 0; i < n; i++) {
      const p = pt(i, R);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw polygon for a player
    const drawPoly = (scores, color) => {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const val = (scores[keys[i]] || 0) / 100;
        const r = val * R * progress;
        const p = pt(i, r);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.fillStyle = color.replace(")", ", 0.15)").replace("rgb", "rgba");
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Dots
      for (let i = 0; i < n; i++) {
        const val = (scores[keys[i]] || 0) / 100;
        const r = val * R * progress;
        const p = pt(i, r);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    };

    drawPoly(scores1, "#7C3AED");
    drawPoly(scores2, "#10B981");

    // Labels
    ctx.font = "bold 11px Inter, sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i < n; i++) {
      const p = pt(i, R + 22);
      ctx.fillStyle = "rgba(226,217,243,0.7)";
      ctx.fillText(labels[i], p.x, p.y);
    }
  }, [progress, scores1, scores2]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <canvas ref={canvasRef} width={280} height={280} />
      <div style={{ display: "flex", gap: 20 }}>
        {[{ label: label1, color: "#7C3AED" }, { label: label2, color: "#10B981" }].map(({ label, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
            <span style={{ fontSize: 11, color: "#9CA3AF" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RadarChart;