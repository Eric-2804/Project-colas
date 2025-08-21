let cola = [];
let ticketActual = null;
let contador = 0;

export default (socket, io) => {
    console.log('Cliente conectado:', socket.id);

    const emitirEstadoATodos = () => {
        io.emit('cola-actualizada', cola);
        io.emit('ticket-actual', ticketActual);
        io.emit('ticket-siguiente', cola[0] || null);
    };

    // ✅ Nuevo: cuando un cliente lo pida, le mandamos el estado actual
    socket.on('solicitar-estado', () => {
        socket.emit('cola-actualizada', cola);
        socket.emit('ticket-actual', ticketActual);
        socket.emit('ticket-siguiente', cola[0] || null);
    });

    // Cliente crea ticket
    socket.on('crear-ticket', (nombre, callback) => {
        contador++;
        const ticket = { numero: contador, nombre };
        cola.push(ticket);
        if (typeof callback === 'function') callback(ticket);
        emitirEstadoATodos();
    });

    // Terminal llama siguiente
    socket.on('llamar-siguiente', () => {
        if (cola.length > 0) {
            ticketActual = cola.shift();
            emitirEstadoATodos();
        }
    });

    // Puedes mantener este broadcast inicial si quieres:
    emitirEstadoATodos();

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
};
