import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CalculatorContext = createContext();

const CalculatorContextProvider = ({ children }) => {
  const formatTime = useCallback(function formatTime(date) {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }, []);

  const [time, setTime] = useState(formatTime(new Date()));
  const partOfDay = time.slice(-2);
  const workouts = useMemo(
    () => [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ],
    [partOfDay]
  );

  const [allowSound, setAllowSound] = useState(true);

  // Will be be AM or PM

  useEffect(
    function () {
      const id = setInterval(function () {
        setTime(formatTime(new Date()));
      }, 1000);

      return () => clearInterval(id);
    },
    [allowSound, time, partOfDay, formatTime]
  );

  const value = useMemo(
    () => ({
      allowSound,
      setAllowSound,
      time,
      workouts,
    }),
    [allowSound, setAllowSound, time, workouts]
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
