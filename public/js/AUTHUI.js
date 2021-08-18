class UI {
	printMessage (message, className) {
		const messageDiv = document.createElement('div');
		messageDiv.classList.add('alert', 'infor', 'text-center', className);
		messageDiv.setAttribute('role', 'alert');
		messageDiv.appendChild(document.createTextNode(message));
		const refMessage = document.querySelector('.form');
		refMessage.insertBefore(messageDiv, document.querySelector('.message'));
		setTimeout(() => {
			document.querySelector('.alert').remove();
		}, 3000);
	}
}
