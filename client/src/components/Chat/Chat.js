import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { io } from 'socket.io-client';
import './Chat.css';

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const ENDPOINT = 'localhost:5000';

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);

		setName(name);
		setRoom(room);

		socket.emit('join', { name, room }, () => {
			console.log(name, room);
		});

		return () => {
			socket.emit('disconnect');
			socket.off();
		};
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);
	
	const sendMessage = (e) => {
		e.preventDefault();

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''))
		}
	}

	console.log(message, messages);
	return (
		<div className="outerContainer">
			<div className="container">
				<input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
				/>
			{/* <InfoBar room={room} /> */}
			{/* <Messages messages={messages} name={name} /> */}
			{/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
		</div>
		{/* <TextContainer users={users}/> */}
	  </div>
	);
};

export default Chat;