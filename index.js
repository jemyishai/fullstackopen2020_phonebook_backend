// const { response } = require("express");
const express = require("express");
const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Testy McTesterson",
    number: "39-23-6423122",
    id: 5,
  },
];

app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = persons.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((note) => note.id !== id);

  res.status(204).end();
});

app.get("/info", (req, res) => {
  let num = persons.length;
  res.send(`<p>Phonebook has info for ${num} people</p>` + Date());
});


app.post('/api/persons', (req,res)=> {
  getRandomInt = (max) =>  Math.floor(Math.random() * Math.floor(max));
  let ids = persons.map(person=>person.id)
  let tempId = 1;

  while (ids.includes(tempId)) {
    tempId = getRandomInt(10000)
  }

  const person = req.body
  person.id = tempId

  console.log('person',person)
  persons = [...persons,person];

  console.log(persons)
  res.json(persons)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
