const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]


// const url =
//   `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

// previous URI
// `mongodb+srv://new_jesse:${password}@cluster0.bwdko.mongodb.net/phonebook?retryWrites=true&w=majority`

// URI from 11/25
// mongodb+srv://fullstackopen:<password>@cluster0.t0jhq.mongodb.net/<dbname>?retryWrites=true&w=majority

const url = `mongodb+srv://fullstackopen:${password}@cluster0.t0jhq.mongodb.net/allTheNotes?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })


Note.find({}).then(result =>{
  result.forEach(note =>{
    console.log(note)
  })
  mongoose.connection.close()
})
