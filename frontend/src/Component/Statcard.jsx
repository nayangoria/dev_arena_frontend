export default function Statcard({ label, value, sub, icon }) {
  return (
    <div style={{
      background: "#1E1535", borderRadius: 12,
      border: "1px solid rgba(124,58,237,0.15)",
      padding: "16px 20px", flex: 1, minWidth: 120
    }}>
      <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#E2D9F3" }}>{value}</div>
      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "#4B3F72", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}