const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
  });

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
	console.log('Connection is made');

	socket.on('join', ({ name, room }, callback) => {
		console.log(name, room);

		callback();
	});

	socket.on('disconnect', () => {
		console.log('User had left');
	});
});


server.listen(
	PORT,
	() => console.log(`Server has been started on port ${PORT}`)
);
