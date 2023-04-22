const formEl = document.querySelector('form') as HTMLFormElement;
const addressInputEl = document.getElementById('address') as HTMLInputElement;

function searchAddressHandler(event: Event) {
	event.preventDefault();
	const enteredAddress = addressInputEl.value;
	// send this to Google's API!
}

formEl.addEventListener('submit', searchAddressHandler);
