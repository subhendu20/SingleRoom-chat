
const root = `http://localhost:7001`
const socket  = io(root)



const audio = new Audio('/sound.mp3')
const appendnew=(message,side)=>{
          const child = document.createElement('div');
          child.innerText=message;
          child.classList.add('message2');
          const parent = document.createElement('div');
          parent.appendChild(child)
          parent.classList.add(side);
          chat.appendChild(parent);
}
const appendmessage=(message,side)=>{
          const child = document.createElement('div');
          child.innerText=message;
          child.classList.add('message');
          const parent = document.createElement('div');
          parent.appendChild(child)
          parent.classList.add(side);
          chat.appendChild(parent);
}
const appendpeople=async(e)=>{
          peoples.innerHTML="";
          if(peoples.innerHTML==""){
                    const newdiv = await document.createElement('span')
          newdiv.innerText=e
          peoples.appendChild(newdiv)

          }
}
const chat = document.getElementById('chatbox')
const join = document.getElementById('join')
const joinbtn = document.getElementById('joinbtn')
const form = document.getElementById('formid')
const message = document.getElementById('messageid')
const peoples = document.getElementById('peoples')
var joinstatus = false;
var user
joinbtn.addEventListener("click",function(){
          $('#chatparentbox,#document').removeClass('hide').addClass('flex')
          $('#documentbox').removeClass('flex').addClass('hide')
          $('#main').removeClass('back')
          
          
          const newuser = join.value;
          user=newuser;
          socket.emit("new-user",newuser);
          
          joinstatus=true;
          join.value=""
})

const leave =()=>{
          $('#chatparentbox,#document').removeClass('flex').addClass('hide')
          $('#documentbox').removeClass('hide').addClass('flex')
          $('#main').addClass('back')
          socket.emit('leave',user)
}
socket.on("new-one",(data)=>{
          if(joinstatus){
                    
                    appendnew(`${data.name} joined the chat`,'center')
                    audio.play()
                   
                    data.arr.map((e)=>{
                              return appendpeople(e.name) 
                    })
          }
})

const submitmsg=()=>{
          const send = message.value
          if(send==""){
                   alert("Don't send blank message")
                    }
          else{
                    if(joinstatus){
                              appendmessage(`you :${send}`,'right')
                              socket.emit('send',send);
                              
                              
                              message.value=""

                    }
                    else{
                              alert('you have to join before messaging')
                    }
                    
          }
}

socket.on('receive',(data)=>{
          appendmessage(`${data.user}:${data.message}`,'left')
          audio.play()
})

socket.on('left',(data)=>{
          data.user.map((e)=>{
                    return appendpeople(e.name) 
          })
         appendnew(`${data.name} left the chat`,'center')
})

 


