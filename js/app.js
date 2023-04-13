
const socket  = io('http://localhost:7001')



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
const chat = document.getElementById('chatbox')
const join = document.getElementById('join')
const joinbtn = document.getElementById('joinbtn')
const form = document.getElementById('formid')
const message = document.getElementById('messageid')
var joinstatus = false;

joinbtn.addEventListener("click",function(){
          
          
          const newuser = join.value;
          socket.emit("new-user",newuser);
          
          joinstatus=true;
          join.value=""
          

          

})







socket.on("new-one",(data)=>{
          if(joinstatus){
                    appendnew(`${data} joined the chat`,'center')
                    audio.play()

          }
          
         

          // append(data.message,"center")
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
          appendnew(`${data} left the chat`,'center')
          
 })



