import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const formatTime = function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const timer = useCallback(function () {
    setTime(formatTime(new Date()));
  }, []);

  const [time, setTime] = useState(formatTime(new Date()));
  const partOfDay = time.slice(-2);
  const workouts = useMemo(() => {
    return [
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
    ];
  }, [partOfDay]);

  const [allowSound, setAllowSound] = useState(true);

  // Will be be AM or PM

  useEffect(
    function () {
      const id = setInterval(timer(), 1000);

      return () => clearInterval(id);
    },
    [allowSound, time, partOfDay, timer]
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

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a CalculatorContext");
  }
  return context;
};

export { AppContextProvider, useApp };
