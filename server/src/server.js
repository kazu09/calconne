const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  }
});
app.use(cors());
io.on('connection', (socket) => {
  console.log('新しいユーザーが接続しました');

  socket.on('chat message', (msg) => {
    console.log("確認用 : ",msg)
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('ユーザーが切断しました');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました。`);
});
