// servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./sokets');


class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // HTTP server
        this.server = http.createServer(this.app);

        // Configuraciones de sokets
        this.io = socketio(this.server, { /* configuraciones */ }) ;

    }
    middlewares() {
        // Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        
        // CORS
        this.app.use(cors());  
    }

    configurarSockets() {
        new Sockets( this.io );
    }
    
    execute() {

        // Inicializar Middelwares
        this.middlewares();

        // Inicializara sokets
        this.configurarSockets();

        // Inicializar server
        this.server.listen(this.port, () => {
         console.log("Server corriendo en puerto:", this.port );
        });

    }

}




module.exports = Server;