const weatherInput = document.getElementById("weather-input");
document.getElementById("weather-btn").addEventListener("click", (e) => {
	e.target.innerHTML = `
   
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Loading...
  
    `;
	const location = weatherInput.value;
	weatherInput.value = "";
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=733c5c70e8727a505858dd36a27ff4c2`
	)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				e.target.innerHTML = "Weather";
				throw Error("Sorry, can't find.");
			}
		})
		.then((data) => showWeather(data, e))
		.catch((err) => errorShow(err));
});

const errorShow = (err) => {
	alert(err.message);
};
const showWeather = (datum, e) => {
	console.log(datum);
	e.target.innerHTML = "Weather";
	const { name, main, weather } = datum;
	const temperature = main.temp - 273.15;
	const src = weather[0].icon;
	document.getElementById(
		"icon"
	).src = `https://openweathermap.org/img/wn/${src}@2x.png`;
	document.getElementById("name").innerText = name;
	document.getElementById("tem").innerText = temperature.toFixed(2);
	document.getElementById("weather").innerText = weather[0].main;
};
