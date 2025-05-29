// websocket/server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('🟢 Servidor WebSocket activo en ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('🧩 Un nuevo usuario se ha conectado.');

  ws.on('message', (message) => {
    let data;

    try {
      data = JSON.parse(message);
    } catch (err) {
      console.error('❌ Mensaje no es JSON válido:', message);
      return;
    }

    console.log('📨 Mensaje recibido:', data.message);

    // Reenviar el mensaje a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on('close', () => {
    console.log('🔌 Un usuario se ha desconectado.');
  });
});
