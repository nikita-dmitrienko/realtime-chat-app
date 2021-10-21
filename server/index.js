const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');


const {
	addUser,
	removeUser,
	getUser,
	getUsersByRoom,
} = require('./users');
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
	socket.on('join', ({ name, room }, callback) => {
		const { id } = socket;

		const newUser = {
			id,
			name,
			room,
		};

		const { error, user } = addUser(newUser);
		if (error) return callback(error);

		socket.emit('message', {
			user: 'admin',
			text: `${user.name}, welcome to the room ${user.room}`,
		});

		socket.broadcast.to(user.room).emit('message', {
			user: 'admin',
			text: `${user.name}, has joined!`,
		});

		socket.join(user.room);

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const { id } = socket;

		const user = getUser(id);
		io.to(user.room).emit('message', {
			user: user.name,
			text: message,
		});

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
