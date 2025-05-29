// websocket/client.js
const WebSocket = require('ws');
const readline = require('readline');

// Conectamos al servidor WebSocket
const ws = new WebSocket('ws://localhost:8080');

// Configura entrada por consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Evento: conexión establecida
ws.on('open', () => {
  console.log('🟢 Conectado al chat.\nEscribí tu mensaje y presioná Enter:');

  rl.on('line', (input) => {
    ws.send(JSON.stringify({ message: input }));
  });
});

// Evento: mensaje recibido
ws.on('message', (data) => {
  const parsed = JSON.parse(data);
  console.log(`👤 Otro dijo: ${parsed.message}`);
});

// Evento: error
ws.on('error', (error) => {
  console.error('❌ Error:', error);
});

// Evento: conexión cerrada
ws.on('close', () => {
  console.log('🔴 Desconectado del servidor');
  rl.close();
});
