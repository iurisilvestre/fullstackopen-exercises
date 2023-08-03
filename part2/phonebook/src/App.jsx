import { useState, useEffect } from "react";
import personService from "./services/persons";

import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [personsToShow, setPersonsToShow] = useState(persons);
    const [notificationMessage, setNotificationMessage] = useState({
        message: "",
        isError: false,
    });

    const getAllPersonsService = () => {
        personService.getAll().then((dataPersons) => {
            setPersons(dataPersons);
            setPersonsToShow(dataPersons);
        });
    };

    useEffect(getAllPersonsService, []);

    const addPerson = (e) => {
        e.preventDefault();
        let personObject = {
            name: newName,
            id: crypto.randomUUID(),
            number: newNumber,
        };

        const duplicatedPerson = persons.find(
            (person) => person.name === newName
        );

        if (duplicatedPerson) {
            const duplicatedPersonId = duplicatedPerson.id;
            if (
                confirm(
                    `${newName} is already added to phonebook, replace the old nummber with a new one?`
                )
            ) {
                personObject = { ...personObject, id: duplicatedPersonId };
                personService
                    .update(duplicatedPersonId, personObject)
                    .then((returnedPerson) => {
                        getAllPersonsService;
                        setNewName("");
                        setNewNumber("");
                        setNotificationMessage({
                            ...notificationMessage,
                            message: `${personObject.name} was successfully updated`,
                        });
                        setTimeout(() => {
                            setNotificationMessage({
                                message: "",
                                isError: false,
                            });
                        }, 5000);
                    })
                    .catch((error) => {
                        getAllPersonsService();
                        setNewName("");
                        setNewNumber("");
                        setNotificationMessage({
                            isError: true,
                            message: `Information of ${personObject.name} has already been removed from server`,
                        });
                        setTimeout(() => {
                            setNotificationMessage({
                                message: "",
                                isError: false,
                            });
                        }, 5000);
                    });
            }
        } else {
            setNotificationMessage({
                ...notificationMessage,
                message: `${personObject.name} was successfully added`,
            });
            setTimeout(() => {
                setNotificationMessage({ message: "", isError: false });
            }, 5000);
            personService.create(personObject).then(getAllPersonsService);
            setNewName("");
            setNewNumber("");
        }
    };

    const handleSearchChange = (e) => {
        const searchName = e.target.value;
        const regex = new RegExp(searchName, "i");
        setPersonsToShow(persons.filter((person) => person.name.match(regex)));
    };

    const handleNewNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNewNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const toggleDelete = (id, personName) => {
        confirm(`Delete ${personName}?`) &&
            personService.deletePerson(id).then(getAllPersonsService);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification
                message={notificationMessage.message}
                isError={notificationMessage.isError}
            />
            <Filter handleSearchChange={handleSearchChange} />
            <h3>add a new</h3>
            <PersonForm
                handleNewNameChange={handleNewNameChange}
                handleNewNumberChange={handleNewNumberChange}
                newNumber={newNumber}
                newName={newName}
                addPerson={addPerson}
            />
            <h3>Numbers</h3>
            <Persons
                personsToShow={personsToShow}
                toggleDelete={toggleDelete}
            />
        </div>
    );
};

export default App;
