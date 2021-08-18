const new_image = document.getElementById('new_image');
const new_title = document.getElementById('new_title');
const new_content =document.getElementById('new_content');


const showNewsDetails = (title) => {
  // localStorage.setItem("new-title", title);
  window.location.replace(`view-news?title=${title}`)
}

