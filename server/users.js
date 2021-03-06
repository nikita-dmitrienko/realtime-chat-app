const users = [];

const addUser = ({ id, name, room }) => {
	const normalizedName = name.trim().toLowerCase();
	const normalizedRoom = room.trim().toLowerCase();

	const isDuplicateUser = users.find(
		(user) => user.room === room && user.name === name
	);

	if (isDuplicateUser) {
		return { error: 'Username is taken!' };
	}

	const user = {
		id,
		name,
		room
	};

	users.push(user);
	return { user };
};

const removeUser = (id) => {
	const userIndex = users.findIndex(
		(user) => user.id === id
	);

	if (userIndex !== -1) {
		return users.splice(index, 1)[0];
	}
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersByRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUsersByRoom,
};
