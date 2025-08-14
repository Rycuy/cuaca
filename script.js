const apiKey = "3b0e7f97a91696c63853f082e7bc248b";

// Element DOM
const searchBox = document.querySelector(".searchBox input");
const searchBtn = document.querySelector(".fa-magnifying-glass");

const suhuElement = document.querySelector(".suhu");
const descElement = document.querySelector(".desc");
const kelembapanElement = document.querySelector(".kelembapan p");
const anginElement = document.querySelector(".angin p");
const cuacaImg = document.querySelector(".cuaca img");

// Fungsi Ambil Data Cuaca
async function getWeather(city) {
    if (!city) {
        alert("Silakan masukkan nama kota!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=id`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Lokasi tidak ditemukan. Periksa kembali nama kota.");
            } else {
                throw new Error("Terjadi kesalahan saat mengambil data cuaca.");
            }
        }

        const data = await response.json();

        // Menampilkan data
        suhuElement.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
        descElement.textContent = data.weather[0].description;
        kelembapanElement.innerHTML = `${data.main.humidity}% <span>Kelembapan</span>`;
        anginElement.innerHTML = `${data.wind.speed} <span>km/h</span>`;
        cuacaImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    } catch (error) {
        alert(error.message);
    }
}

// Event tombol klik
searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value.trim());
});

// Event tekan Enter
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather(searchBox.value.trim());
    }
});
