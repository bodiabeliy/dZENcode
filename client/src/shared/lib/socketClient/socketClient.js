import { io } from 'socket.io-client';



export class SocketClient {
  socket;

  static connect() {
    this.socket = io.connect(__BASE_URL, { transports: ['websocket'] });
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => {
        console.log("socket connected...", );
        return resolve()
      });
      this.socket.on('connect_error', (error) => reject(error));
    });
    
  }

  static disconnect() {
    return new Promise((resolve) => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve();
      });
    });
  }

  static emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      return this.socket.emit(event, data, (response) => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
          console.error(response.error);
          return reject(response.error);
        }

        return resolve();
      });
    });
  }

  static on(event, fun) {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      this.socket.on(event, fun);
      resolve();
    });
  }
}

