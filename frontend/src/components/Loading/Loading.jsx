import { useState, useEffect } from "react";
import "./loading.css";

const Loading = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='loading-page'>
      <div className='loader'></div>
      <div className='loading-text'>
        <p>Please wait, backend is loading...</p>
        <p>Time elapsed: {counter} seconds</p>
      </div>
    </div>
  );
};

export default Loading;
