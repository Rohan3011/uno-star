export const users: SocketData[] = [];

export const addUser = (
  userData: SocketData,
  roomId: string
): ResponseMessage => {
  let message: ResponseMessage;
  const usersCount = users.filter((user) => userData.roomId === roomId).length;

  if (usersCount === 2) {
    message = {
      error: "Room is already full!",
    };
    return message;
  }
  users.push(userData);
  message = { data: userData, success: "Created user successfully!" };
  return message;
};

export const removeUser = (userData: SocketData): ResponseMessage => {
  let message: ResponseMessage;
  const removeIndex = users.findIndex(
    (user) => user.userId === userData.userId
  );

  if (removeIndex === -1) {
    message = {
      error: "No such user exists!",
    };
    return message;
  }

  const NewUsers = users.splice(removeIndex, 1)[0];
  message = {
    data: JSON.stringify(NewUsers),
    success: "User removed successfully!",
  };
  return message;
};

export const getUser = (userId: string) => {
  return users.find((user) => user.userId == userId);
};

export const getUsersInRoom = (roomId: string) => {
  return users.filter((user) => user.roomId === roomId);
};
