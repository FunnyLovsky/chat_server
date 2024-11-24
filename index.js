
const express = require('express');
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        'http://localhost:5173',
    ],
    methods: ['GET', 'POST']
}));
app.use(express.json());

let messages= [];
let clients = [];

app.post('/message', (req, res) => {
  const  message = req.body;
  messages.push(message);

  clients.forEach(client => client.res.json( message ));
  clients = [];

  res.status(200).send();
});

app.get('/messages', (req, res) => {
    const client = { res };
    clients.push(client);

  const timeoutId = setTimeout(() => {
    const index = clients.indexOf(client);
    if (index !== -1) {
      clients.splice(index, 1);
    }
    if (!res.headersSent) { 
      res.json({  });
    }
  }, 10000);


  req.on('close', () => {
    clearTimeout(timeoutId);
    const index = clients.indexOf(client);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});


const start = () => {
    try {
        app.listen(PORT, () => console.log('Server start in port: ' + PORT))
    } catch (error) {
        console.log(error)
    }
}


start()