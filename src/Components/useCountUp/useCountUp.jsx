// useCountUp.js
import { useEffect, useState } from 'react';

const useCountUp = (endValue, duration) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = endValue / (duration / 50); 
        const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
                start = endValue;
                clearInterval(timer);
            }
            setCount(Math.floor(start));
        }, 50);

        return () => clearInterval(timer);
    }, []);

    return count;
};

export default useCountUp;
