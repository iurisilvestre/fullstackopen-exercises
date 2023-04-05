import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const average = (good - bad) / (good + neutral + bad);
    const positive = (good * 100) / (good + neutral + bad);

    return (
        <>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={total} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={positive} />
                </tbody>
            </table>
        </>
    );
};

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            {text === "positive" ? <td>{value}%</td> : <td>{value}</td>}
        </tr>
    );
};

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => {
        setGood(good + 1);
    };
    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    };
    const handleBadClick = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <h2>give feedback</h2>
            <Button text={"good"} onClick={handleGoodClick} />
            <Button text={"neutral"} onClick={handleNeutralClick} />
            <Button text={"bad"} onClick={handleBadClick} />

            {(good > 0 || neutral > 0 || bad > 0) && (
                <Statistics good={good} neutral={neutral} bad={bad} />
            )}
        </div>
    );
};

export default App;
