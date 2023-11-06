import { memo, useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";
import { useCalculator } from "./contexts/CalculatorContext";

const App = memo(function App() {
  const { time } = useCalculator();
  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds />
      <Calculator />
    </main>
  );
});

export default App;
