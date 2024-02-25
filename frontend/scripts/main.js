

const socket = io('https://teamconnect.onrender.com',{transports:["websocket"], query: {
            userId: localStorage.getItem('userName') // Use the user ID or any unique identifier
         }})

// mesg-container

const mesg_container=document.getElementById('mesg-container')
const nameInput=document.getElementById('name-input')
nameInput.textContent=localStorage.getItem('userName')
const mesg_form=document.getElementById('mesg-form')
const mesgInput=document.getElementById('mesg-input')
const imgSpan=document.getElementById('img-span');
const img=localStorage.getItem('userImg');
if(img){
    imgSpan.innerHTML="";
    imgSpan.innerHTML=`<img id="img-tag" src=${img}>`
}




mesg_form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

function sendMessage() {
    if (mesgInput.value === '') return;
    console.log(mesgInput.value);

    const data = {
        name: localStorage.getItem('userName'),
        mesg: mesgInput.value,
        dateTime: new Date()
    };

    socket.emit('message', data);
    addMessagetoUI(true, data);
    mesgInput.value = '';
}


socket.on('chat-group-mesg',(data)=>{
    clearFeedback()
    console.log(data)
    addMessagetoUI(false,data)
    
})


function addMessagetoUI(isOwnMessage,data){
    clearFeedback()
    let ele=`<li class="${isOwnMessage ? 'mesg-right':'mesg-left'}">
    <p class="mesg">
    ${data.mesg}<span>${data.name} . ${moment(data.dateTime).fromNow()}</span>
    </p>
</li>`
mesg_container.innerHTML+=ele;
scrollToBottom()
}

function scrollToBottom(){
    mesg_container.scrollTo(0,mesg_container.scrollHeight)
}

// total clients logic
// const clients_total=document.getElementById('clients-total')

// socket.on('clients-total',(data)=>{
//     clients_total.innerText=`Total Clients : ${data}`
// })

// Emit user is typing feedback when input is focused or key is pressed
mesgInput.addEventListener('focus', () => {
    socket.emit('feedback', {
        feedback: `${localStorage.getItem('userName')} is typing`
    });
});

mesgInput.addEventListener('keypress', () => {
    socket.emit('feedback', {
        feedback: `${localStorage.getItem('userName')} is typing`
    });
});

mesgInput.addEventListener('blur', () => {
    socket.emit('feedback', {
        feedback: ''
    });
});
socket.on('feedback',(data)=>{
    clearFeedback();
    let ele=` <li class="mesg-feedback">
    <p class="feedback" id="feedback">
       ${data.feedback}
    </p>
</li>`
mesg_container.innerHTML+=ele;
})

function clearFeedback(){
    document.querySelectorAll('li.mesg-feedback').forEach(ele=>{
        ele.parentNode.removeChild(ele)
    })
}
// Room name

// Prompt the user to enter a room
// const room = prompt('Enter a room name:');
// socket.emit('join room', room);

// Listen for chat messages
socket.on('chat message', (msg) => {
  $('#messages').append($('<li>').text(msg));
});

// Send chat message
// $('form').submit(function(e) {
//   e.preventDefault();
//   const msg = $('#msg-input').val();
//   if (msg) {
//     socket.emit('chat message', msg);
//     $('#msg-input').val('');
//   }
//   return false;
// });


// modal js
function showModal() {
    // Assuming your modal has an ID of "myModal"
    const id=document.getElementById('myModal')
    const myModal = new bootstrap.Modal(id);
    myModal.show();
}

const prof_btn = document.getElementById('prof-btn');
prof_btn.addEventListener('click', () => {
    const profile = new bootstrap.Modal(document.getElementById('profile-model'));
    profile.show();
    console.log('click');
});

//image upload js
let upload_img_form = document.getElementById("upload-img-form");
let save_img = document.getElementById("save-img");
save_img.addEventListener("click",async()=>{
    let new_image = document.getElementById("new-profile-image")
    let image = new_image.files[0];
    let data = new FormData();
    data.append('image',image)
    
    try{
        let res = await fetch(`https://coinsquare.onrender.com/user/profile/${localStorage.getItem('id')}`,{
            method:"PATCH",
            headers:{
                "enctype":"multipart/form-data"
            },
            body:data
        })
        let new_data = await res.json();
        console.log(new_data.updated);
        let test_img = document.getElementById("test-img")
        test_img.src = new_data.updated
        let profile_pic = document.getElementById("profile-pic")
        profile_pic.src = new_data.updated
        // localStorage.removeItem("image");
        // localStorage.setItem("image",new_data.updated);
        window.location.href="./dashboard.html"
    }
    catch(error){
        console.log(error)
    }
})
upload_img_form.addEventListener("submit",(e)=>{
    const profile = new bootstrap.Modal(document.getElementById('profile-model'));
    e.preventDefault();
    profile.show(); 
})

// load image on page load
async function loadImage(id){
    try {
        let res = await fetch(`https://coinsquare.onrender.com/user/profile/${id}`)
        let data = await res.json();
        console.log(data);
        let profile = data.image
        let test_img = document.getElementById("test-img")
            test_img.src = profile
            let profile_pic = document.getElementById("profile-pic")
            profile_pic.src = profile
    } catch (error) {
        console.log(error);
    }
  
}
// loadImage(id);


// logout fuctionalities
const logout = async () => {
    try {
      const response = await fetch('https://coinsquare.onrender.com/user/logout', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the access token if needed
        },
      });
  
      if (response.ok) {
        // Handle successful logout
        console.log("Logout successful");
        window.location.href = '../index.html';
      } else {
        // Handle error response
        const data = await response.json();
        console.error("Logout failed:", data.err);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  // Example button click event
document.getElementById("logout-btn").addEventListener("click", logout);


// video call js
