import React from "react";

const Total = ({ parts }) => {
    const total = parts.reduce((a, c) => a + c.exercises, 0);
    return (
        <>
            <h3>
                <strong>Number of exercises = {total}</strong>
            </h3>
        </>
    );
};

export default Total;
