const PersonForm = ({
    handleNewNameChange,
    handleNewNumberChange,
    newNumber,
    newName,
    addPerson,
}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input onChange={handleNewNameChange} value={newName} />
            </div>
            <div>
                number:{" "}
                <input onChange={handleNewNumberChange} value={newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
