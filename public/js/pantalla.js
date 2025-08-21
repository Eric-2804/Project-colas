const socket = io();

socket.on('ticket-actual', (ticket) => {
    document.getElementById('actual').innerText = 
        ticket ? `${ticket.numero} - ${ticket.nombre}` : 'Ninguno';
});

socket.on('cola-actualizada', (cola) => {
    const lista = document.getElementById('cola');
    lista.innerHTML = '';
    cola.forEach(t => {
        const li = document.createElement('li');
        li.innerText = `${t.numero} - ${t.nombre}`;
        lista.appendChild(li);
    });
});
