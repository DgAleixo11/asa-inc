export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "999px",
        fontSize: 180,
        fontWeight: 700,
      }}
    >
      A
    </div>
  );
}