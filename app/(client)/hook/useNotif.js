import {useState, useEffect} from 'react';

export const useNotif = (message, setMessage, time) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(()=>{
    if(!message) return;

    setIsVisible(true);

    const fadeOutTimer =setTimeout(() => setIsVisible(false), time);
     const removeTimer = setTimeout(() => setMessage(''), time + 300);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };

  }, [message]);


  return isVisible ;

}