const cors = require('cors')
cors()
const io = require('socket.io')(7001, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
})
const names = {}
io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    // world
    names[socket.id] = name;



    console.log(names)


    socket.broadcast.emit("new-one", names[socket.id])

  });
  socket.on('send', (message) => {
    if (names[socket.id] !== undefined) {
      socket.broadcast.emit('receive', { message: message, user: names[socket.id] })

    }
  })
  socket.on('disconnect', (name) => {
    socket.broadcast.emit('left', name)

  })


})
