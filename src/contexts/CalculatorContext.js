import { createContext, useContext, useMemo, useState } from "react";
import { useApp } from "./AppContext";

const CalculatorContext = createContext();

const CalculatorContextProvider = ({ children }) => {
  const { workouts } = useApp();
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  const value = useMemo(
    () => ({
      number,
      sets,
      speed,
      duration,
      durationBreak,
      mins,
      seconds,
      setNumber,
      setSets,
      setSpeed,
      setDurationBreak,
      workouts,
    }),
    [
      number,
      sets,
      speed,
      duration,
      durationBreak,
      mins,
      seconds,
      setNumber,
      setSets,
      setSpeed,
      setDurationBreak,
      workouts,
    ]
  );
  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within a CalculatorContext");
  }
  return context;
};

export { CalculatorContextProvider, useCalculator };
