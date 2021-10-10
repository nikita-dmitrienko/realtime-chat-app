import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { io } from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	const ENPOINT = 'localhost:5000';

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		socket = io(ENPOINT);

		setName(name);
		setRoom(room);

		socket.emit('join', { name, room });
	}, [ENPOINT, location.search]);

	return (
		<h1>Chat</h1>
	);
};

export default Chat;