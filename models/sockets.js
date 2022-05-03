const ShoppingList = require("./shopping-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.shoppingList = new ShoppingList();
    this.socketEvents();
  }

  socketEvents() {
    // Inicializacion de socket
    this.io.on("connection", (socket) => {
      //#region Eventos unicos
      console.log(`Socket ${socket.id} conectado`);

      socket.on("disconnect", async (reason) => {
        console.error(`Socket ${socket.id} desconectado por: ${reason}`);
      });

      // Emitir a los clientes el listado de compras cuando se conectan.
      socket.emit("fetch-list", this.shoppingList.getList());

      //#endregion

      //#region Suscripcion a eventos que va a recibir desde el frontend

      socket.on("increment-counter", (id, acknowledgementCallback) => {
        this.shoppingList.increaseCounter(id);
        acknowledgementCallback("Contador incrementado para: " + id);

        this.io.emit("fetch-list", this.shoppingList.getList());
      });

      socket.on("remove-item", (id) => {
        this.shoppingList.removeItem(id);
        this.io.emit("fetch-list", this.shoppingList.getList());
      });

      socket.on("edit-item", ({ id, name }) => {
        this.shoppingList.editItem(id, name);
        this.io.emit("fetch-list", this.shoppingList.getList());
      });

      socket.on("add-item", ({ name }) => {
        this.shoppingList.addItem(name);
        this.io.emit("fetch-list", this.shoppingList.getList());
      });

      //#endregion
    });
  }
}

module.exports = Sockets;
