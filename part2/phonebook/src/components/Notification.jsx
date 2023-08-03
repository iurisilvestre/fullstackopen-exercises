const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "green",
    padding: 10,
    marginBottom: 10,
};

const errorStyle = {
    ...successStyle,
    color: "red",
    borderColor: "red",
};

const Notification = ({ message, isError }) => {
    if (message === "") {
        return null;
    }

    return <div style={isError ? errorStyle : successStyle}>{message}</div>;
};

export default Notification;
