const socket = io();

// ✅ Pide el estado al conectarse (evita la carrera)
socket.on('connect', () => {
    socket.emit('solicitar-estado');
});

document.getElementById('btnSiguiente').addEventListener('click', () => {
    socket.emit('llamar-siguiente');
});

socket.on('ticket-siguiente', (ticket) => {
    document.getElementById('siguiente').innerText =
        ticket ? `${ticket.numero} - ${ticket.nombre}` : 'Ninguno';
});

// (Opcional) ver en consola que llegan los eventos
socket.on('cola-actualizada', (cola) => console.debug('cola-actualizada', cola));
socket.on('ticket-actual', (t) => console.debug('ticket-actual', t));
