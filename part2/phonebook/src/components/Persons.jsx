const Persons = ({ personsToShow, toggleDelete }) => {
    return (
        <table>
            <tbody>
                {personsToShow.map((person) => (
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td>
                            <button
                                onClick={() =>
                                    toggleDelete(person.id, person.name)
                                }
                            >
                                delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Persons;
