export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="blob animate-float"
        style={{
          width: "min(80vw, 500px)",
          height: "min(80vw, 500px)",
          top: "-10vw",
          left: "-10vw",
          background: "oklch(0.6 0.25 290)",
        }}
      />
      <div
        className="blob animate-float"
        style={{
          width: "min(90vw, 600px)",
          height: "min(90vw, 600px)",
          top: "15vh",
          right: "-15vw",
          background: "oklch(0.65 0.22 220)",
          animationDelay: "2s",
        }}
      />
      <div
        className="blob animate-float"
        style={{
          width: "min(70vw, 450px)",
          height: "min(70vw, 450px)",
          bottom: "-10vw",
          left: "20%",
          background: "oklch(0.6 0.25 320)",
          animationDelay: "4s",
        }}
      />
    </div>
  );
}
