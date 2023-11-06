import { memo } from "react";
import { useApp } from "./contexts/AppContext";

const ToggleSounds = memo(function ToggleSounds() {
  const { allowSound, setAllowSound } = useApp();
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
