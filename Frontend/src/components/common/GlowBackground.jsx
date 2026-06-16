import useMouseGlow from "../../hooks/useMouseGlow";

const GlowBackground = () => {
  const pos = useMouseGlow();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `
          radial-gradient(
            120px circle at ${pos.x}px ${pos.y}px,
            rgba(255,255,255,0.15),
            transparent 70%
          )
        `,
      }}
    />
  );
};

export default GlowBackground;