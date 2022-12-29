import "./styles.css";
import { useEffect, useState, useCallback, useMemo } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    console.log("times before");
    const cleanUp = setInterval(() => {
      setTimer((prevState) => prevState + 1);
    }, 1000);
    return () => {
      console.log("times afeter");
      clearInterval(cleanUp);
    };
  }, []);

  return <h2>Timer is: {timer}</h2>;
};

export default function App() {
  const [number, setNumbers] = useState([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/number.json")
      .then((resp) => resp.json())
      .then((data) => setNumbers(data));
  }, []);

  const handleClick = useCallback(() => {
    setNumbers((previous) => [...previous, previous.length + 1]);
  }, []);

  const sum = useMemo(() => number.reduce((a, v) => a + v, 0), [number]);

  const resetTimer = useCallback(() => {
    setIndex(index + 1);
  }, [index]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Numbers are: {JSON.stringify(number)}</h2>
      <button onClick={handleClick}>Add numbers </button>
      <h2>sum of numbers: {sum}</h2>
      <Timer key={index} />
      <button onClick={resetTimer}>Reset timer</button>
    </div>
  );
}
