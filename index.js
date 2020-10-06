const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors')

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

const requestLogger = (request, response, next) => {
  console.log('--- Custom Middleware ---')
  console.log("Method:", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  next();
};

app.use(cors())
app.use(express.json());
app.use(requestLogger);
morgan.token('body', (req,res) => JSON.stringify(req.body))
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// getting incoming body as opposed to body after post route
// app.use(morgan(":body",{ immediate: true }))

// //req.body here contains id added from post route
// app.use(morgan( (tokens, req, res) => [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.req(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms',
//     JSON.stringify(req['body'])
//   ].join(' ')
// ));

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
    res.status(404).send({ error: "no such ID" }).end();
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

app.post("/api/persons", (req, res) => {
  getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  let ids = persons.map((person) => person.id);
  let tempId = 1;
  let errorMessage = "";
  let statusCode = 400;

  while (ids.includes(tempId)) {
    tempId = getRandomInt(10000);
  }

  const personData = req.body;
  const newPerson = {...personData,id: tempId}


  const { name, number } = newPerson;

  if (!name && !number) {
    errorMessage = "name and number are missing";
  } else if (!name) {
    errorMessage = "name is missing";
  } else if (!number) {
    errorMessage = "number is missing";
  } else if (persons.some((person) => person.name === name)) {
    errorMessage = "name already exists in the phonebook";
    statusCode = 409;
  }

  if (!errorMessage) {
    persons = [...persons, newPerson];
    return res.json(persons);
  } else {
    return res.status(statusCode).json({ error: errorMessage });
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
