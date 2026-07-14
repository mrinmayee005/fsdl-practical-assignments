const apiKey = '74eec28a325f6a1119575b767a977546';
let weatherChart;
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        // Update basic info
        document.getElementById('tempMain').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('locationName').innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById('condition').innerText = data.weather[0].main;
        document.getElementById('humidity').innerText = data.main.humidity;
        document.getElementById('wind').innerText = data.wind.speed;
        document.getElementById('visibility').innerText = (data.visibility / 1000).toFixed(1);
        document.getElementById('pressure').innerText = data.main.pressure;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        // Update Local Time and Day
        updateLocalTime(data.timezone);
        
        // Load Chart
        fetchForecast(city);

    } catch (err) {
        alert(err.message);
    }
}

function updateLocalTime(timezoneOffset) {
    // OpenWeather timezone is in seconds. UTC time in JS is in milliseconds.
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityLocalTime = new Date(utcTime + (timezoneOffset * 1000));

    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    const optionsDay = { weekday: 'long' };

    document.getElementById('localTime').innerText = cityLocalTime.toLocaleTimeString([], optionsTime);
    document.getElementById('localDay').innerText = cityLocalTime.toLocaleDateString([], optionsDay);
}

async function fetchForecast(city) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await res.json();

    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    const labels = dailyData.map(item => new Date(item.dt_txt).toLocaleDateString([], {weekday: 'short'}));
    const temps = dailyData.map(item => item.main.temp);

    const ctx = document.getElementById('weatherChart').getContext('2d');
    if (weatherChart) weatherChart.destroy();

    weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: temps,
                borderColor: '#405cf5',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(64, 92, 245, 0.05)'
            }]
        },
        options: { plugins: { legend: { display: false } } }
    });
}

document.getElementById('searchBtn').addEventListener('click', () => {
    fetchWeather(document.getElementById('cityInput').value);
});

// Initial Load
fetchWeather('London');