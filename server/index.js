const path = require('path')

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const PORT = 3001

const app = express()

app.use(cors())
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(bodyParser.json())

const employees = [
  { id: 1, name: "Johana Levi", status: "Working", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Avraham Cohen", status: "OnVacation", img: "https://randomuser.me/api/portraits/men/46.jpg" },
  { id: 3, name: "Philip Leser", status: "BusinessTrip", img: "https://randomuser.me/api/portraits/men/54.jpg" },
  { id: 4, name: "Nicci Troiani", status: "BusinessTrip", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 5, name: "Franz Ferdinand", status: "Working", img: "https://randomuser.me/api/portraits/men/72.jpg" },
  { id: 6, name: "Rebecca Moore", status: "Working", img: "https://randomuser.me/api/portraits/women/71.jpg" },
]

app.get('/users', (req, res) => {
  res.send(employees)
})

app.post('/users/:id', (req, res) => {
  const index = employees.findIndex((obj => obj.id === +req.params.id))
  employees[index].status = req.body.status
  res.send(employees)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${ PORT }`)
})