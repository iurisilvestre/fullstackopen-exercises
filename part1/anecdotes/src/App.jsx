import { useState } from "react";

const Header = ({ text }) => {
    return <h2>{text}</h2>;
};

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const HighestVotedAnecdote = ({ points, anecdotes }) => {
    const highestVoteValue = Math.max(...points);
    console.log(points, highestVoteValue);
    const indexOfMostVoted = points.indexOf(highestVoteValue);
    return (
        <div>
            <div>{anecdotes[indexOfMostVoted]}</div>
            <div>
                has {highestVoteValue}{" "}
                {highestVoteValue === 1 ? "point" : "points"}
            </div>
        </div>
    );
};

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

    const handleVoteClick = () => {
        const newPoints = [...points];
        newPoints[selected] += 1;
        setPoints(newPoints);
    };

    const handleNextAnecdoteClick = () => {
        const randomNumber = Math.floor(Math.random() * anecdotes.length);
        setSelected(randomNumber);
    };

    return (
        <div>
            <Header text="Anecdote of the Day" />
            <div>{anecdotes[selected]}</div>
            <div>
                has {points[selected] || 0}{" "}
                {points[selected] === 1 ? "point" : "points"}
            </div>
            <Button text="vote" onClick={handleVoteClick} />
            <Button text="next anecdote" onClick={handleNextAnecdoteClick} />
            <Header text="Anecdote with most votes" />
            <HighestVotedAnecdote points={points} anecdotes={anecdotes} />
        </div>
    );
};

export default App;
