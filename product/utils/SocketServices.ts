import { Socket } from 'socket.io';

class SocketServices {
    // connection socket
    connection(socket: Socket) {
        console.clear();
        console.log("connected");

        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.id}`);
        });
    }
}

export default new SocketServices();