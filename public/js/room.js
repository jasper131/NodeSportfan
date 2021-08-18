const errormessage = document.getElementById('error-message');
const createRoomForm = document.getElementById('roomForm');
const roomName = document.getElementById('roomName');
const roomDesc = document.getElementById('roomDesc');

const listOfRooms = document.getElementById("list-rooms");
const listOfUserRooms = document.getElementById("user-rooms");

const roomlayout = document.getElementById('all-rooms-layout');
const myRoomLayout = document.getElementById('my-room-container');
let room = document.getElementsByClassName('each-room')

if (createRoomForm) {
    createRoomForm.addEventListener('submit', createRoom)
}



function createRoom(e) {
     e.preventDefault();
    options.method = 'POST'
   

    if (!roomName.value && !roomDesc.value) {
        errormessage.innerHTML = 'Please enter all fields';
        if (errorMessage.style.display == "none") {
          errorMessage.style.display = "block";
        }
        setTimeout(function () {
          errorMessage.style.display = "none";
        }, 10000);
    } else if (!roomName.value || !roomDesc.value) {
             errormessage.innerHTML = "Please enter all fields";
             if (errorMessage.style.display == "none") {
               errorMessage.style.display = "block";
             }
             setTimeout(function () {
               errorMessage.style.display = "none";
             }, 10000);
           } else {
             const formData = new FormData();
             formData.append("groupname", roomName.value);
             formData.append("description", roomDesc.value);

             options.body = formData;
             fetch(`${base}/create-room`, options)
               .then((res) => res.json())
               .then((response) => {
                 console.log(response);
                 if (response.status != "error") {
                    
                     window.location.replace('/rooms')
                   Swal.fire(response.data);
                 } else {
                   Swal.fire(x.error, "", "error");
                 }
               });
           }
}


for (var i = 0; i < room.length; i++) {
  room[i].addEventListener("click", commentPost, false);
}

// list rooms
// listOfRooms.addEventListener('click', listRooms)
async function listRooms() {
    options.method = 'GET'
    await fetch(`${base}list-rooms`, options)
        .then(res => res.json())
        .then((response) => {
          const array = [];
          response.data.data.forEach(x => {
            const el = allRooms(x);
            array.push(el);
          });
          roomlayout.innerHTML = array.join(" ");
    })
}

// suggested rooms 
async function suggestRooms() {
  options.method = 'GET'
  await fetch(`${base}list-rooms`, options)
      .then(res => res.json())
      .then((response) => {
        console.log(response.data.data)
        const array = [];
        let shuffled = [];
        response.data.data.forEach(x => {
          const el = suggestedRooms(x);
          array.push(el);
        });
        shuffled =  array.sort(() => Math.random() - 0.5);
        document.getElementById("sug-rooms").innerHTML = shuffled.join(" ");
  })
}


// list of user's rooms
// listOfUserRooms.addEventListener('click', userRooms)
async function userRooms() {
    options.method = 'GET'
  await fetch(`${base}/list-user-rooms`, options)
      .then((res) => res.json())
      .then((response) => {
        const array = [];
        response.data.data.forEach(x => {
          const el = myRoom(x);
          array.push(el);
        });
        myRoomLayout.innerHTML = array.join(" ");
      });
}

function gotoRoom(group_uuid){
  localStorage.setItem("group_uuid", group_uuid);
  window.location.replace(`/room?group_uuid=${group_uuid}`)
}

function checkRoom() {
  const group_uuid = localStorage.getItem("group_uuid");
  console.log(group_uuid);
  options.method = 'GET'
  fetch(`${base}check-membership?group_uuid=${group_uuid}`, options)
      .then((res) => res.json())
      .then((response) => {
        if (response.data !== 'not a member') {
           document.getElementById('join-g-btn').style.display = 'none';
           joinGroup (group_uuid)
        }

        if (response.data === 'not a member') {
          Swal.fire('Please click the join group button to start be a part of the group!!!');
        }
      })
      .catch(e => console.log(e));
}

const myRoom = (data) => {
  return `
    <div class="room-box d-flex">
      <div class="text-center">
        <img src="${ data.ChatRoom.icon}" class="img-prof img-fluid">
      </div>
      <div class="room-detail">
        <p><strong><span><a href="#">${ data.ChatRoom.name}</a></span></strong>
          <span><button class="btn btn-info pull-right" onclick="gotoRoom('${data.ChatRoom.uuid}')">Enter room</button></span>
        </p>
        <span>50 Members</span>
      </div>
    </div>
                `
}

const allRooms = (data) => {
  return `
      <div class="room-box d-flex">
          <div class="text-center">
              <img src="${ data.icon}" class="img-prof img-fluid">
          </div>
          <div class=" room-detail">
              <h4><strong><span><a href="#">${ data.name}</a></span></strong>
                  <span><button class="btn btn-info d-flex pull-right" onclick="gotoRoom('${data.uuid}')">Join Room</button></span>
              </h4>
              <p><span>50 Members</span></p>

          </div>
      </div>
    `
}

const suggestedRooms = (data) => {
  return `

<div class="room-box d-flex">
      <div class="text-center">
        <img src="${data.icon}" class="img-prof img-fluid">
      </div>
      <div class="room-detail">
        <p><strong><span><a href="#">${data.name}</a></span></strong>
          <span><button class="btn btn-info pull-right" onclick="gotoRoom('${data.uuid}')">Join room</button></span>
        </p>
        <span>50 Members</span>
      </div>
    </div>
`;
  
}

const loadPage = async () => {
  try {
    await suggestRooms();
    await userRooms();
    await listRooms();
  } catch (error) {
    console.log(error);
  }
}

if (window.location.pathname == '/room') {
  checkRoom();
}

loadPage()