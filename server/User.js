module.exports = class User {
  static _users = [];

  static addUser(user) {
    this._users.push(user);
  }

  static removeUserById(userId) {
    this._users = this._users.filter(user => user.id !== userId);
  }

  static getUsernameById(userId) {
    const user = this._users.find(user => user.id === userId);
    return user.username;
  }

  constructor(id, username, room = '') {
    this._id = id;
    this._username = username;
    this._room = room;
    User.addUser(this);
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get username() {
    return this._username;
  }

  set username(username) {
    this._username = username;
  }

  get room() {
    return this._room;
  }

  set room(room) {
    this._room = room;
  }
};
