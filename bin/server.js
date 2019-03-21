'use strict'
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**Respnsável pela criação do padrão MVC do NODE.JS*/
const server = http.createServer(app);

/**Inicializa o servidor para que fique escutando a porta definida para a aplicação*/
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

function normalizePort(val){
    const port = parseInt(val, 10);

    if(isNaN(val)) {
        return val;
    }

    if(port >= 10){
        return port;
    }

    return false;
}

function onError(error){
    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === String ? 'Pipe ' + port : 'Port ' + port;


    switch(error.code){
        case 'EACCESS':
            console.error(bind + ' requires elavated provileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}