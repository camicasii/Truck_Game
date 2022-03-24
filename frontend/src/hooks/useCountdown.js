import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";

export const useCountdown = (date=[2021, 10, 18, 2] ) => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {    
    //const target = DateTime.utc(date[0],date[1],date[3],date[4]);    
    const target = DateTime.utc(date[0],date[1],date[2],date[3]);    
     setInterval(() => {
      const distance = target.diffNow() > 0 ? target.diffNow() : 0;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {    
    startTimer();    
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return {
    timerDays,
    timerHours,
    timerMinutes,
    timerSeconds,
  };
};
