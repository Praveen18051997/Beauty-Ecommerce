import React, { useState, useEffect } from 'react';

export const CountdownTimer = ({ targetHours = 14 }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: targetHours, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 }; // Loop over
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="flex items-center gap-2 text-rose-900 dark:text-rose-100 font-medium">
      <div className="flex flex-col items-center bg-rose-100/80 dark:bg-rose-950/60 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 shadow-sm">
        <span className="text-lg font-bold font-serif">{formatNumber(timeLeft.hours)}</span>
        <span className="text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-300">Hours</span>
      </div>
      <span className="text-xl font-serif text-rose-400 font-bold">:</span>
      <div className="flex flex-col items-center bg-rose-100/80 dark:bg-rose-950/60 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 shadow-sm">
        <span className="text-lg font-bold font-serif">{formatNumber(timeLeft.minutes)}</span>
        <span className="text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-300">Mins</span>
      </div>
      <span className="text-xl font-serif text-rose-400 font-bold">:</span>
      <div className="flex flex-col items-center bg-rose-100/80 dark:bg-rose-950/60 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 shadow-sm">
        <span className="text-lg font-bold font-serif text-rose-600 dark:text-rose-400 animate-pulse">{formatNumber(timeLeft.seconds)}</span>
        <span className="text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-300">Secs</span>
      </div>
    </div>
  );
};
