const express = require('express');
const cors = require('cors');
const usersRoutes = require('./src/users/routes')

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));
app.use('/api/v1/users', usersRoutes)


const port = 8081;

app.get('/', (req, res) => {
    res.send('Hello Olet Hub')
})

app.listen(port, () => {
    console.log(`The server is running in port ${port}`)
})