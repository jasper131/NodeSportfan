const addFriend = document.getElementById('add-friend');
const friendId = document.getElementById('friend-Id');
const friendName = document.getElementById('friend-name');
const userSearchInput = document.getElementById('userSearchInput')

const searchResult = document.getElementById('search-result-layout')
const follow_box = document.getElementById('follow-box');

// get user details

function getUserDetails(user_uuid) {
    const my_uuid = localStorage.getItem('my_uuid');
    window.location.replace(`/friendprofile?user_uuid=${user_uuid}&my_uuid=${my_uuid}`);
}


 function searchUser() {
   
   console.log('it is getting a string')
  options.method = "GET"
   fetch(`${base}/search-user?input=${userSearchInput.value}`, options)
  .then((res) => res.json())
     .then((response) => {
      console.log(response)
      const array = [];
      response.data.forEach(x => {
        const el = result(x);
        array.push(el);
      });
       searchResult.innerHTML = array.join("");
  }).catch((error) => console.log(error))
}


const result = (data) => {
  return `
  <div class="room-box d-flex">
      <div class="text-center">
        <img src="${ data.icon}" class="img-prof img-fluid">
      </div>
      <div class="room-detail">
        <p onclick="getUserDetails('${data.uuid}')"><strong><span><a href="#">${ data.name}</a></span></strong>
        </p>
      </div>
      <span><button class="btn btn-primary" onclick="followUser('${data.uuid}')">Follow</button></span>
    </div>
  `
}

const followUser = (uuid) => {
      if(follow_box.innerText == 'unFollow') {
        unFollowUser(uuid);
      } else {
        options.method = "POST";
        fetch(`${base}follow-user?user_uuid=${uuid}`, options)
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            if (response.status != "error") {
              follow_box.innerText = 'unFollow'
            } else {
              Swal.fire(response.error, "", "error");
            }
          })
          .catch((e) => console.log(e));
      }
}

const unFollowUser = (uuid) => {
  if (follow_box.innerText == 'Follow') {
    followUser(uuid);
  } else {
    options.method = "PUT";
    fetch(`${base}un-follow-user?user_uuid=${uuid}`, options)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status != "error") {
          follow_box.innerText = 'Follow'
        } else {
          Swal.fire(response.error, "", "error");
        }
      })
      .catch((e) => console.log(e));
  }

}

