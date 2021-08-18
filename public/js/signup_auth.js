const displayMessage = document.querySelector('#message');
const formList = document.querySelector('#form-list');
const fullName = document.querySelector('#fullName');
const userName = document.querySelector('#username');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const status = document.querySelector('#status');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const checkbox = document.querySelector('#checkbox');
const loader = document.querySelector('.lds-circle');
const submitAuthForm = document.querySelector('#submit');

const printMessage = (message, className) => {
	const messageDiv = document.createElement('div');
	messageDiv.classList.add('alert', 'infor', 'text-center', className);
	messageDiv.setAttribute('role', 'alert');
	messageDiv.appendChild(document.createTextNode(message));
	displayMessage.insertBefore(messageDiv, document.querySelector('#alert-message'));
	setTimeout(() => {
		document.querySelector('.alert').remove();
	}, 5000);
};

const submitForm = async (e) => {
	e.preventDefault();
	loader.style.display = 'inline-block';
	if (
		!fullName.value ||
		!userName.value ||
		!email.value ||
		status.value === '' ||
		password.value === '' ||
		confirmPassword.value === ''
	) {
		loader.style.display = 'none';
		printMessage('Please Fill All Fields!!', 'alert-danger');
	}
	else if (password.value !== confirmPassword.value) {
		printMessage('Passwords Does Not Match!!!', 'alert-danger');
		loader.style.display = 'none';
	}
	else {
		try {
			loader.style.display = 'none';

			const formData = new FormData();
			formData.append('name', fullName.value);
			formData.append('username', userName.value);
			formData.append('email', email.value);
			formData.append('phone', phone.value);
			formData.append('password', password.value);
			formData.append('role', 'user');
			formData.append('status', status.value);

			const response = await fetch('/api/v1/auth/signup', {
				method: 'POST',
				body: formData
			})
				.then((res) => res.json())
				.then((x) => {
					console.log(x);
					if (x.status != 'error') {
						printMessage(x.data.message, 'alert-success');
						return (window.location.href = '/verify-message');
					}
					else {
						const errorArray = Object.values(x);
						errorArray.forEach((item) => printMessage(item, 'alert-danger'));
					}
				});
		} catch (error) {}
	}
};

function eventList (){
	submitAuthForm.addEventListener('click', submitForm);
}
eventList();
