const backendURL = "https://teamconnect.onrender.com/";
const socket = io("https://teamconnect.onrender.com", {
  transports: ["websocket"],
  query: {
    userId: localStorage.getItem("userName"), // Use the user ID or any unique identifier
  },
});

// mesg-container

const mesg_container = document.getElementById("mesg-container");
const nameInput = document.getElementById("name-input");
nameInput.textContent = localStorage.getItem("userName");
const mesg_form = document.getElementById("mesg-form");
const mesgInput = document.getElementById("mesg-input");
const imgSpan = document.getElementById("img-span");
const img = localStorage.getItem("userImage");
let test_img = document.getElementById("test-img");
let user_email = document.getElementById("user-email");
let user_name = document.getElementById("user-name");
let user_email_2 = document.getElementById("user-email-2");
let user_name_2 = document.getElementById("user-name-2");
let userAge = document.getElementById("user-age-2")
let userMobile = document.getElementById("user-mobile")
if (img) {
  imgSpan.innerHTML = "";
  imgSpan.innerHTML = `<img id="img-tag" src=${img}>`;
  user_email.innerText = localStorage.getItem("userEmail");
  user_name.innerText = localStorage.getItem("userName");
  test_img.src = img;
  user_email_2.value = localStorage.getItem("userEmail");
  user_name_2.value = localStorage.getItem("userName");
}

// load user details
async function loadUserDetails(){
  try {
    console.log("test")
    let res = await fetch(`${backendURL}users/${localStorage.getItem("userId")}`)
    let user_data = await res.json();
    user_data = user_data.user_info
    user_email.innerText = user_data.userEmail
    user_name.innerText = user_data.userName
    test_img.src = user_data.userImage
    user_email_2.value = user_data.userEmail
    user_name_2.value = user_data.userName
    userAge.value =  user_data.userAge
    userMobile.value = user_data.userMobile
    console.log(user_data);
  } catch (error) {
    console.log(error)
  }
}
loadUserDetails();


mesg_form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

function sendMessage() {
  if (mesgInput.value === "") return;
  console.log(mesgInput.value);

  const data = {
    name: localStorage.getItem("userName"),
    mesg: mesgInput.value,
    dateTime: new Date(),
  };

  socket.emit("message", data);
  addMessagetoUI(true, data);
  mesgInput.value ="ghj";
}

socket.on("chat-group-mesg", (data) => {
  clearFeedback();
  console.log(data);
  addMessagetoUI(false, data);
});

socket.on("file upload message", (data) => {
  let { fileName, publicURL, downloadLink } = data;
  let msg = `<embed src=${publicURL} class="mesg-left" type="application/pdf" width="auto" height="auto" />
  <a href=${downloadLink} class="mesg-left" >${fileName}</a> 
`;
mesg_container.innerHTML += `\n${msg}`;
});

function addMessagetoUI(isOwnMessage, data) {
  clearFeedback();
  let ele = `<li class="${isOwnMessage ? "mesg-right" : "mesg-left"}">
    <p class="mesg">
    ${data.mesg}<span>${data.name} . ${moment(data.dateTime).fromNow()}</span>
    </p>
</li>`;
  mesg_container.innerHTML += ele;
  scrollToBottom();
}

function scrollToBottom() {
  mesg_container.scrollTo(0, mesg_container.scrollHeight);
}

// total clients logic
// const clients_total=document.getElementById('clients-total')

// socket.on('clients-total',(data)=>{
//     clients_total.innerText=`Total Clients : ${data}`
// })

// Emit user is typing feedback when input is focused or key is pressed
mesgInput.addEventListener("focus", () => {
  socket.emit("feedback", {
    feedback: `${localStorage.getItem("userName")} is typing`,
  });
});

mesgInput.addEventListener("keypress", () => {
  socket.emit("feedback", {
    feedback: `${localStorage.getItem("userName")} is typing`,
  });
});

mesgInput.addEventListener("blur", () => {
  socket.emit("feedback", {
    feedback: "",
  });
});
socket.on("feedback", (data) => {
  clearFeedback();
  let ele = ` <li class="mesg-feedback">
    <p class="feedback" id="feedback">
       ${data.feedback}
    </p>
</li>`;
  mesg_container.innerHTML += ele;
});

function clearFeedback() {
  document.querySelectorAll("li.mesg-feedback").forEach((ele) => {
    ele.parentNode.removeChild(ele);
  });
}
// Room name

// Prompt the user to enter a room
// const room = prompt('Enter a room name:');
// socket.emit('join room', room);

// Listen for chat messages
socket.on("chat message", (msg) => {
  $("#messages").append($("<li>").text(msg));
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
  const id = document.getElementById("myModal");
  const myModal = new bootstrap.Modal(id);
  myModal.show();
}

const prof_btn = document.getElementById("prof-btn");
prof_btn.addEventListener("click", () => {
  const profile = new bootstrap.Modal(document.getElementById("profile-model"));
  profile.show();
  console.log("click");
});

//image upload js
let upload_img_form = document.getElementById("upload-img-form");
let save_img = document.getElementById("save-img");
save_img.addEventListener("click", async () => {
  let new_image = document.getElementById("new-profile-image");
  let image = new_image.files[0];
  let data = new FormData();
  data.append("file", image);

  try {
    let res = await fetch(
      `https://teamconnect.onrender.com/users/update/image/${localStorage.getItem(
        "userId"
      )}`,
      {
        method: "PATCH",
        headers: {
          enctype: "multipart/form-data",
        },
        body: data,
      }
    );
    let new_data = await res.json();
    console.log(new_data.image);
    // console.log(new_data.updated);
    let test_img = document.getElementById("test-img");
    test_img.src = new_data.image;
    // let profile_pic = document.getElementById("profile-pic")
    // profile_pic.src = new_data.updated
    // localStorage.removeItem("image");
    localStorage.setItem("userImage", new_data.image);
    window.location.href = "./chatbox.html";
  } catch (error) {
    console.log(error);
  }
});
upload_img_form.addEventListener("submit", (e) => {
  const profile = new bootstrap.Modal(document.getElementById("profile-model"));
  e.preventDefault();
  profile.show();
});



// logout fuctionalities
const logout = async () => {
  try {
    const response = await fetch(
      "https://coinsquare.onrender.com/user/logout",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the access token if needed
        },
      }
    );

    if (response.ok) {
      // Handle successful logout
      console.log("Logout successful");
      window.location.href = "../index.html";
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

// upload images/files
let attachments = document.getElementById("new-attachments");
let fileUploadBtn = document.getElementById("send-attachments");

fileUploadBtn.addEventListener("click", () => {
  console.log("c");
  uploadAttachment();
});

async function uploadAttachment() {
  try {
    let files = attachments.files[0];
    let data = new FormData();
    data.append("file", files);
    let res = await fetch(`${backendURL}messages/files`, {
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
      },
      body: data,
    });
    let new_data = await res.json();
    const { fileName, publicURL, downloadLink } = new_data;

    let msg = `<embed src=${publicURL} class="mesg-right" type="application/pdf" width="auto" height="auto"/>
    \n <a href=${downloadLink} class="mesg-right" >${fileName}</a> `;
    mesg_container.innerHTML += `\n${msg}`;

    socket.emit("file upload", { fileName, publicURL, downloadLink });
  } catch (error) {
    console.log(error);
  }
}


// update user details
async function updateUserDetails(){
  try {
      let res = await fetch(`${backendURL}users/update/details/${localStorage.getItem("userId")}`,{
        method:"PATCH",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          userName:user_name_2.value,
          email:user_email_2.value,
          mobile:userMobile.value,
          age:userAge.value
        })
      })
      let data = await res.json();
      console.log(data)
      loadUserDetails();
  } catch (error) {
    console.log(error)
  }

}

let user_details_updateBtn = document.getElementById("prof-chg-submit")

user_details_updateBtn.addEventListener("click",updateUserDetails);

//
let channel_createBtn = document.getElementById("channel-create");

channel_createBtn.addEventListener("click",()=>{
  
})

let create_new_channelBtn = document.getElementById("new-channel-button")
let new_channel_name = document.getElementById("new-channel-name")
create_new_channelBtn.addEventListener("click",()=>{
  addChannel(new_channel_name.value)
})
let currentWorkspace = localStorage.getItem("currentWorkspace");
async function addChannel(channelName){
  try {
    let res = await fetch(`${backendURL}workspace/add/channel/${currentWorkspace}/${channelName}`,{
      method:"PATCH",
      headers:{
        "Content-type":"application/json"
      }
    })
    let data = await res.json();
    console.log(data)
    getChannelList(currentWorkspace)
  } catch (error) {
    console.log(error)
  }
}
/* <li><a class="dropdown-item" href="#">Action</a></li> */
let workspaceList = document.getElementById("workspace-list")
let channelList = document.getElementById("ch-list");

function createWorkspaceElement(item){
 let li_tag = document.createElement("li")
 let a_tag  = document.createElement("a")
 a_tag.className = "dropdown-item"
 a_tag.innerText = item.workspaceName
 a_tag.setAttribute("data-id",item._id)
 li_tag.append(a_tag)
 a_tag.addEventListener("click",(e)=>{
  
  document.getElementById("workspace-name").innerText = a_tag.innerText
  localStorage.setItem("currentWorkspace",e.target.dataset.id);
  getChannelList(e.target.dataset.id) // update channel list 
 })
 return li_tag
}
async function getWorkspaceList(){
  try {
    let res = await fetch(`${backendURL}workspace/list`)

    let data = await res.json();
    console.log(data.workspace_list);
    
    data.workspace_list.forEach(item =>{
      let elem = createWorkspaceElement(item)
      workspaceList.append(elem)
      console.log(item.channels)
    })
  } catch (error) {
    console.log(error)
  }
}
getWorkspaceList()
getChannelList(currentWorkspace)
async function getChannelList(workspaceId){
    try {
      channelList.innerHTML = ""
      let res = await fetch(`${backendURL}workspace/${workspaceId}`)
      let data = await res.json();
      let channels = data.workspace.channels
      channels.forEach(item =>{
       
        let p_tag = document.createElement('p')
        p_tag.textContent = item.channelName
        p_tag.setAttribute("data-id",item._id)
        p_tag.setAttribute("style","display:block;")
        p_tag.addEventListener("click",(e)=>{
          console.log(e.target.dataset.id);
        })
        
        channelList.append(p_tag)
      })
    } catch (error) {
      console.log(error)
    }
}


// private chats
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});