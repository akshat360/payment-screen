/** @format */

let amount = 599;

function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	console.log('userAgent', userAgent);

	if (/android/i.test(userAgent)) {
		document.getElementById('no-payment').style.display = 'none';
	} else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		let paytmBtn = document.getElementById('paytm-btn');
		let bhimBtn = document.getElementById('bhim-btn');
		paytmBtn.remove();
		bhimBtn.remove();
		document.getElementById('no-payment').style.display = 'none';
	} else {
		let payBtnContainer = document.getElementById('pay-btn-container');
		payBtnContainer.remove();
	}
}
getMobileOperatingSystem();

//when UPi pay btn is clicked
const getUpiData = UpiName => {
	try {
		const url = new URL(`http://localhost:8080/${UpiName}`);
		fetch(url, {
			method: 'GET',
		})
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.error('Request Failed: Error Occured! ', err);
			});
	} catch (err) {
		console.error('Something went wrong! ', err);
	}
};

//when Send btn is clicked
const sendData = () => {
	try {
		let phoneNumber = document.getElementById('phone-input').value;
		const data = { phoneNumber, amount };
		const url = new URL('http://localhost:8080/send');

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.error('Request Failed: Error Occured! ', err);
			});
	} catch (err) {
		console.error('Something went wrong! ', err);
	}
};
