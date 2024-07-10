const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let events = []; 

app.get('/events', (req, res) => {
    res.json(events);
});

app.post('/events', (req, res) => {
    const newEvent = req.body;
    events.push(newEvent);
    res.status(201).json(newEvent);
});

app.put('/events/:id', (req, res) => {
    const eventId = req.params.id;
    const updatedEvent = req.body;
    events = events.map(event => (event.id === eventId ? updatedEvent : event));
    res.json(updatedEvent);
});

app.delete('/events/:id', (req, res) => {
    const eventId = req.params.id;
    events = events.filter(event => event.id !== eventId);
    res.status(200).json({ message: 'Мероприятие удалено' });
});

app.listen(port, () => {
    console.log(`Сервер мероприятий запущен на порту ${port}`);
});