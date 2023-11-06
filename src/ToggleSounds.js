import { memo } from "react";
import { useCalculator } from "./contexts/CalculatorContext";

const ToggleSounds = memo(function ToggleSounds() {
  const { allowSound, setAllowSound } = useCalculator();
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
});

export default ToggleSounds;
