export default function Logo({ size = 44, wordmark = true, variant = "dark" }) {
  const textColor = variant === "light" ? "#ffffff" : "#c70f1b"
  const subColor = variant === "light" ? "rgba(255,255,255,.8)" : "#6b6b7b"
  const nameSize = Math.round(size * 0.5)
  const subSize = Math.max(9, Math.round(size * 0.23))

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Caja Tacna" role="img">
        <circle cx="24" cy="24" r="24" fill="#c70f1b" />
        <circle cx="24" cy="13" r="5" fill="#ffffff" />
        <path d="M14 38 Q14 26 24 26 Q34 26 34 38" fill="#ffffff" />
        <line x1="10" y1="28" x2="38" y2="28" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {wordmark && (
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.04 }}>
          <span style={{ fontWeight: 800, fontSize: nameSize, color: textColor, letterSpacing: "-0.5px" }}>
            Caja Tacna
          </span>
          <span style={{ fontSize: subSize, fontWeight: 700, color: subColor, letterSpacing: "1.2px" }}>
            CORE FINANCIERO
          </span>
        </span>
      )}
    </span>
  )
}
