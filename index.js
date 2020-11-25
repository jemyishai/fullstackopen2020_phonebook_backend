require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { response } = require("express");

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4,
//   },
//   {
//     name: "Testy McTesterson",
//     number: "39-555-6423122",
//     id: 5,
//   },
// ];

const requestLogger = (request, response, next) => {
  console.log("--- Custom Middleware ---");
  console.log("Method:", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  next();
};

// app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(requestLogger);
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((peeps) => {
      res.json(peeps);
    })
    .catch((err) => console.error(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  // const id = Number(req.params.id);
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      }
      //doesnt this prevent the .catch from catching the error
        else{
          res.status(404).end()
        }
    })
    .catch((err) => {
      next(err)
      // console.log(err);
      // res.status(400).send({error:'malformed id'});
    });
  // const note = persons.find((note) => note.id === id);

  // if (note) {
  //   res.json(note);
  // } else {
  //   res.status(404).send({ error: "no such ID" }).end();
  // }
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
  .then(res =>{
    res.status(204).end()
  })
  .catch(err=>next(err))
  // const id = Number(req.params.id);
  // persons = persons.filter((note) => note.id !== id);

  // res.status(204).end();
});

// app.get("/info", (req, res) => {
//   let num = persons.length;
//   res.send(`<p>Phonebook has info for ${num} people</p>` + Date());
// });

// front end checks if it exists
// put route to update
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {new:true})
    .then(updatedPeep => {
      res.json(updatedPeep)
    })
    .catch(err=>next(err))
  // const id = Number(req.params.id);
  // const personData = req.body;

 // // this error messge shouldnt even come into play
  // let errorMessage = !persons.some((peep) => peep.id === id)
  //   ? "Person Not Found"
  //   : null;
  // if (errorMessage) {
  //   return res.status(400).json({ error: errorMessage });
  // }

  // persons = persons.filter((note) => note.id !== id);
  // persons = [...persons, { id: id, ...personData }];

  // return res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedNote) => {
    res.json(savedNote);
  });
  // getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  // let ids = persons.map((person) => person.id);
  // let tempId = 1;
  // let errorMessage = "";
  // let statusCode = 400;

  // while (ids.includes(tempId)) {
  //   tempId = getRandomInt(10000);
  // }

  // const personData = req.body;
  // const newPerson = { ...personData, id: tempId };

  // const { name, number } = newPerson;

  // if (!name && !number) {
  //   errorMessage = "name and number are missing";
  // } else if (!name) {
  //   errorMessage = "name is missing";
  // } else if (!number) {
  //   errorMessage = "number is missing";
  // } else if (persons.some((person) => person.name === name)) {
  //   errorMessage = "name already exists in the phonebook";
  //   statusCode = 409;
  // }

  // if (!errorMessage) {
  //   persons = [...persons, newPerson];
  //   return res.json(persons);
  // } else {
  //   return res.status(statusCode).json({ error: errorMessage });
  // }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) =>{
  console.error(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
