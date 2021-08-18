const search = document.getElementById('searchUser');
const searchIcon = document.getElementById('searchIcon')

function searchUser(e) {
    e.preventDefault();
    // alert('mmmm');
    options.method = 'GET'
    const formData = new FormData();
    formData.append('search', search.value);
    options.body = formData;
    fetch(`${base}/search-user`, options)
        .then(res => res.json())
        .then(x => {
            console.log(x);
            if (x.status != 'error') {
                Swal.fire(x.data);
                window.location.reload();
            } else {
                Swal.fire(x.error, '', 'error');
            }
        }).catch(e => alert(e));
}

searchIcon.addEventListener('submit', () => {
    console.log(search.value);
    searchUser();
});