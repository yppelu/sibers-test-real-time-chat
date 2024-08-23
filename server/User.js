module.exports = class User {
  static _users = [];

  static saveUser(user) {
    this._users.push(user);
  }

  static removeUserById(userId) {
    this._users = this._users.filter(user => user.id !== userId);
  }

  static getUserById(userId) {
    return this._users.find(user => user.id === userId);
  }

  static getUserByName(username) {
    return this._users.find(user => user.username === username);
  }

  static updateUser(userId, newData) {
    const user = this._users.find(user => user.id === userId);
    for (const key in newData) {
      user[key] = newData[key];
    }
  }

  static getUsersInRoom(roomName) {
    return this._users.filter(user => user.room = roomName);
  }

  constructor(id, username, room = '') {
    this.id = id;
    this.username = username;
    this.room = room;
  }
};
