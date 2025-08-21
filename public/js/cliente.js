const socket = io();

document.getElementById('btnCrear').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) {
        alert("Por favor escribe tu nombre");
        return;
    }
    socket.emit('crear-ticket', nombre, (ticket) => {
        document.getElementById('ticket').innerText =
            `Tu ticket es: ${ticket.numero}`;
    });
});
