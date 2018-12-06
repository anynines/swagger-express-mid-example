import 'dotenv/config';
import express from 'express';

console.log('Hello ever running Node.js project. Yeah!');
console.log(process.env.MY_DATABASE_PASSWORD);

const app = express();
const port = 8000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
