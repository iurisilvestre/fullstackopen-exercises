const morgan = require("morgan");
const express = require("express");
const app = express();

let phoneNumbers = require("./numbers");

morgan.token("body-content", function getBodyContent(req) {
    return JSON.stringify(req.body);
});

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms, :body-content"
    )
);
app.use(express.json());

app.get("/info", (request, response) => {
    const requestDate = new Date();
    response.send(
        `
        <p>Phonebook has info for ${phoneNumbers.length} people</p>
        <p>${requestDate}</p>
        `
    );
});

app.get("/api/persons", (request, response) => {
    response.json(phoneNumbers);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = phoneNumbers.find((person) => person.id === id);

    person ? response.json(person) : response.status("404").end();
});

app.post("/api/persons", (request, response) => {
    const body = request.body;
    const id = Math.floor(Math.random() * 10000000);
    console.log(body);
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "content missing",
        });
    }

    if (
        phoneNumbers.some(
            (phoneNumbers) =>
                phoneNumbers.name.toLowerCase() === body.name.toLowerCase()
        )
    ) {
        return response.status(400).json({
            error: "name must be unique",
        });
    }

    const newNumber = {
        id: id,
        name: body.name,
        number: body.number,
    };

    phoneNumbers = [...phoneNumbers, newNumber];
    response.json(newNumber);
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    phoneNumbers = phoneNumbers.filter((phoneNumber) => phoneNumber.id !== id);

    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
