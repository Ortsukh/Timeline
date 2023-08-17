import ClipLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "aqua",
};

export default function Spiner() {
  const color = ("#36d7b7");

  return (
    <div className="sweet-loading">
      <ClipLoader
      type="CircleLoader"
        color={color}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
