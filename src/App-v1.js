import { memo } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";
import { useApp } from "./contexts/AppContext";
import { CalculatorContextProvider } from "./contexts/CalculatorContext";

function App() {
  const { time } = useApp();
  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds />
      <CalculatorContextProvider>
        <Calculator />
      </CalculatorContextProvider>
    </main>
  );
}

export default memo(App);
