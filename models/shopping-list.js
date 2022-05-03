const Item = require("./item");

class ShoppingList {
  constructor() {
    this.list = [new Item("Frutas"), new Item("Verduras"), new Item("Pilas")];
  }

  addItem(name) {
    const newItem = new Item(name);
    this.list.push(newItem);
    return this.list;
  }

  removeItem(id) {
    this.list = this.list.filter((item) => item.id !== id);
  }

  getList() {
    return this.list;
  }

  editItem(id, newNme) {
    this.list = this.list.map((item) => {
      if (item.id === id) item.name = newNme;
      return item;
    });
  }

  increaseCounter(id) {
    this.list = this.list.map((item) => {
      if (item.id === id) item.counter += 1;
      return item;
    });
  }
}
module.exports = ShoppingList;
