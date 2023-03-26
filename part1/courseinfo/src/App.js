const Header = (props) => {
    return (
        <>
            <h1>{props.course.name}</h1>
        </>
    );
};

const Content = (props) => {
    return (
        <>
            <Part course={props.course[0]} />
            <Part course={props.course[1]} />
            <Part course={props.course[2]} />
        </>
    );
};

const Part = (props) => {
    return (
        <>
            <p>
                {props.course.part} {props.course.exercises}
            </p>
        </>
    );
};

const Total = (props) => {
    return (
        <>
            <p>
                Number of exercises ={" "}
                {props.course[0].exercises +
                    props.course[1].exercises +
                    props.course[2].exercises}
            </p>
        </>
    );
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            { part: "Fundamentals of React", exercises: 10 },
            { part: "Using props to pass data", exercises: 7 },
            { part: "State of a component", exercises: 14 },
        ],
    };

    return (
        <div>
            <Header course={course} />
            <Content course={course.parts} />
            <Total course={course.parts} />
        </div>
    );
};

export default App;
