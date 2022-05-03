const { v4: uuidv4 } = require("uuid");

class Item {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.counter = 0;
  }
}

module.exports = Item;
