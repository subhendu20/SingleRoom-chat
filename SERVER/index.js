const cors = require('cors')
cors()
const io = require('socket.io')(7001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
})
const names = {}
const users = []
io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    const exist = users.some(e=>{
      if(e.name==name){
        return true
      }
      return false
    })
    if(!exist){
      names[socket.id] = name;
      users.push({name:name,id:socket.id})

      console.log(users)
      socket.broadcast.emit("new-one", {name:names[socket.id],arr:users})

    }
   
   
  });
  socket.on('send', (message) => {
    if (names[socket.id] !== undefined) {
      socket.broadcast.emit('receive', { message: message, user: names[socket.id] })

    }
  })
  socket.on('leave',(data)=>{
    
    const find = users.findIndex(e=>{
      return e.name==names[socket.id]
    })
    users.splice(find,1)
    console.log(users)
    socket.broadcast.emit('left',{name:data,user:users})
    


  })
  socket.on('disconnect', () => {
    const find = users.findIndex(e=>{
      return e.name==names[socket.id]
    })
    users.splice(find,1)
    console.log(users)
    socket.broadcast.emit('left',{name:names[socket.id],user:users})
    console.log(`${socket.id} left the chat`)

  
    

  })


})
