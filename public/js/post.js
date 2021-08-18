const post = document.getElementById('postInput');
const sendPost = document.getElementById("sendPost");
const userPost = document.getElementById("user-posts");
const layout = document.getElementById('post-layout');
let comment = document.getElementsByClassName("comments");
let commentSection = document.getElementsByClassName("comment-section");
let commentButton = document.getElementsByClassName("comment-send");
const userLayout = document.getElementById('media')
const postLayout = document.getElementById('post')


console.log(layout)
const allPost = document.getElementById("getAllPosts")

try {
  sendPost.addEventListener("click", createPost);
} catch (error) {
  console.log(error)
}
function createPost() {
  let file = document.getElementById("image-upload").files[0];
  // readAsDataURL(file)
  console.log(file)
    options.method = 'POST'
    const formData = new FormData();

  // imageUpload.change((e) => {
  //   var clicked = e.target;
  //   var file = clicked.files[0];
  // })
  formData.append('post', post.value);
  formData.append('file', file);
    options.body = formData;
    fetch(`${base}/create-post`, options)
        .then(res => res.json())
        .then(x => {
            console.log(x);
            if (x.status != 'error') {
              // if (file) {
                
              // }
                Swal.fire(x.data);
                window.location.reload();
            } else {
                Swal.fire(x.error, '', 'error');
            }
        }).catch(e =>  Swal.fire(e));
}


function getMediaType(data) {
  console.log(data);
  const type = data.media.split('.')[3];
  if (type == 'mp4') {
    return `<video width="526" height="500" class="materialboxed"  controls>
    <source src="${data.media}" type="video/mp4">
     Your browser does not support HTML video.
     </video>`;
  }

  if (type == 'jpg' || type == 'png') {
    console.log(type);
    return `<img src="${data.media}" class="img-fluid img-resized" width="500" alt=""></img>`
  }

  if ( type == undefined) {
    return ``;
  }
 
}

function createCanva(data) {

  if (data.media && data.media !== '') {
    console.log('got it');
    return `<p class="comment-p">${data.post}</p>`;
  } else {
    if (data.post.length < 40) {
      return `<div class="post-bg">
      <div class="post-txt-small">
        <p style="font-size:50px">${data.post}</p>
      </div>
    </div>`
    } else if (data.post >= 40) {
      return `<div class="post-bg">
      <div class="post-txt">
        <p style="font-size:50px">${data.post}</p>
      </div>
    </div>`
    }
  
  }
}


// userPost.addEventListener('click', listUserPost)

function listUserPosts() {
    options.method = 'GET'
    fetch(`${base}/list-user-posts`, options)
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.status != 'error') {
            const array = [];
            let mediapost = response.data.filter(checkPost).map((x) => {
              return usersMedia(x)
            });
            userLayout.innerHTML = mediapost.join(' ')
            console.log(mediapost)

            response.data.forEach(x => {
              const el = usersPost(x);
              // el.join('')
              array.push(el);
              
            });
            

            // console.log(array)
            postLayout.innerHTML = array.join(" ");

            function checkPost(post) {
              return post.media !== '';
            }
          }
    })
}


const usersPost = (data) => {
  // let layout = document.getElementById('post-layout');
  // layout
  return `<div class="d-flex justify-content-start">
            <div>
                <img src="/img/21104.svg" class="img-prof">
            </div>
            <div class="tab-profile-detail ml-2">
              <p class="fan-name">${data.owner_name} <span class="color-red fan-fn">Coach</span> <span class="fan-time"> 1hrs ago</span></p>
              
              <p class="my-3">${data.post}</p>
                ${getMediaType(data)}
            </div>
            
        </div>
        <hr style=" border: 1px solid #ccc">`;
}


const usersMedia = (data) => {
  console.log(data)
  // let layout = document.getElementById('post-layout');
  // layout
  return `<div class="col-12 col-sm-6 col-lg-3">
    <img class="w-100" src="/image-1.jpg" data-target="#carouselExample" data-slide-to="${data.uuid}">
    ${getMediaType(data)}
  </div>
            
        </div>
        <hr style=" border: 2px solid #ccc">`;
}


// allPost.addEventListener('click', listAllPosts)

async function listAllPosts() {
    TOAST.welcomeToast();
    options.method = 'GET'
   await fetch(`${base}/list-posts`, options)
        .then((res) => res.json())
        .then((response) => {
         console.log(response);
            if (response.status != 'error') {
                const array = [];
              response.data.forEach(x => { 
                 const el = generalPost(x);
                 array.push(el);
                });
              layout.innerHTML = array.join(" ");
         }
    })
}


// socket io for posting comments 
function commentPost(post_uuid) {
    console.log(post_uuid)
    // M.toast({html: 'Sending your comment....'})
    TOAST.infoToast('Sending your comment....');
    const post = document.getElementById(`${post_uuid}-comment-input`);
    socketClient.emit('post-comment', { post_uuid, post: post.value })
    post.value = ''
  }
  

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function deletePost() {
  options.method = 'DELETE'
  fetch(`${base}/delete-post?post_uuid`, options)
  .then((res) => res.json())
}


const displayComments = (data) => {
    const array = [];
    if (data) { 
        data.forEach(x => {
        const element =
      ` <div class="d-flex justify-content-start mt-3">
          <div>
            <img src="img/4.jpg" class="img-prof ">
          </div>
          <div class="ml-2">
            <h4 class="fan-name">${x.user_name}<span class="fan-fn"> Player</span> <span class="fan-time">10(s) ago</span>
            </h4>
              <p class="comment-p">${x.comment}</p>
          </div>
          
        </div>
        <hr>
         ` 
    array.push(element);    
    });
    }
   return array.join(" ")
}

const displayRoomChats = (data) => {
  const array = [];
  if (data) {
    data.forEach(x => {
      const element = `<div class="comment-bot pd-15">
            <div class="sender-text">
                <p>${user}</p>
                <p> ${message} </p>
            </div>
        </div>`
      array.push(element);
    });
  }
  return array
}
//${ GETDURATION(data.createdAt)}
const generalPost = (data) => {
    // let layout = document.getElementById('post-layout');
    // layout
    return `<div class="card mt-5 pd-15" >
                  <div class="d-flex justify-content-start">
                    <div>
                      <img src="img/4.jpg" class="img-prof">
                    </div>
                    <div class="ml-2">
                      <h4 class="fan-name">${data.owner_name}<span class="fan-fn"> <br>Player</span><br> <p class="fan-fn">Arsenal</p> <span class="fan-time">10(s) ago</span></h4>
                    
                    </div>
                    
                  </div>
                  <div id="post-canva">
                      ${createCanva(data)}
                      </div>
                      <div class="img-boxz">
                         ${getMediaType(data)}
                      </div>
                  <div class="tap-content-post">
                    <div class="d-flex justify-content-between m-bd">
                      <p class="p-2 text-center">
                        <i class="fa fa-thumbs-up"></i> Like
                      </p>
                      <p class="p-2 text-right">
                        <i class="fa fa-comments"></i> Comment
                      </p>
                      <p class="p-2 text-right">
                        <i class="fa fa-share-alt"></i> Share
                      </p>
                    </div>
                    <div class="comment-section scrollable-comments" id="comments${data.uuid}">
                       ${displayComments(data.comment)}
                    </div>
                    <div class="d-flex justify-content-between mt-4 bt-2">
                    
                      <div class="text-center">
                        <img src="/img/21104.svg" class="img-prof">
                      </div>
                      <div class=" flex-grow-1 pd-4 ml-2 ">
                        <div class="form-group green-border-focus">
                          <textarea name="" placeholder="Write comments..."id="${data.uuid}-comment-input" class="form-control">
                          
                          </textarea>
                          </div>
                          <p class="fa fa-send border-none clip-attach" onclick="commentPost('${data.uuid}')"</p>
                        </div>
                      
                    </div>
                  </div>
                </div>`;
}

const loadPosts = async () => {
  try {
    if (window.location.pathname == '/') {
      await listAllPosts()
      
    } 
    if (window.location.pathname == '/profile') {
      await listUserPosts()
    }
  } catch (error) {
    console.log(error);
  }
}

loadPosts()
