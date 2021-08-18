// const displayMessage = document.getElementById('message');
const loginButton = document.getElementById('login-button');
const loginLoader = document.querySelector('.lds-circle');
// const email = document.getElementById('email');
// const password = document.getElementById('password');

if (loginButton) {
	loginButton.addEventListener('click', submit);
}

// const printMessage = (message, className) => {
// 	const messageDiv = document.createElement('div');
// 	messageDiv.classList.add('alert', 'infor', 'text-center', className);
// 	messageDiv.setAttribute('role', 'alert');
// 	messageDiv.appendChild(document.createTextNode(message));
// 	displayMessage.insertBefore(messageDiv, document.querySelector('#alert-message'));
// 	setTimeout(() => {
// 		document.querySelector('.alert').remove();
// 	}, 5000);
// };

function submit (e){
	e.preventDefault();
	loginLoader.style.display = 'inline-block';
	if (!email.value || password.value === '') {
		tata.error('Error', 'Please Fill All Fields', {
			duration: 3000
		});
		loginLoader.style.display = 'none';
	}
	else {
		loginLoader.style.display = 'none';

		tata.info('Signing In', 'Please wait while we are login you in', {
			duration: 3000
		});

		const formData = new FormData();
		formData.append('email', email.value);
		formData.append('password', password.value);
		fetch('/api/v1/auth/signin', {
			method: 'POST',
			body: formData
		})
			.then((res) => res.json())
			.then((x) => {
				console.log(x);
				if (x.status != 'error') {
					console.log(x.data.token);
					localStorage.setItem('token', x.data.token);
					tata.success('Success', 'Login Successfull', {
						duration: 3000
					});
					document.getElementById('success-message').innerHTML = 'Login successful';
					return (window.location.href = '/');
				}
				else {
					tata.error('Error', x.error, {
						duration: 3000
					});
				}
			});
	}
}
