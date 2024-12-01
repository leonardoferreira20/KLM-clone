
document.addEventListener("DOMContentLoaded", function () {
    let sidebar = document.getElementById("sidebar");
    let overlay = document.getElementById("overlay");
    let menuButton = document.querySelector('.header-sidenav-btn-menu');

    // Abre o sidebar
    menuButton.onclick = function () {
        sidebar.classList.add("open");
        overlay.classList.add("open"); // Mostra o overlay
    };

    // Fecha o sidebar
    overlay.onclick = function () {
        sidebar.classList.remove("open");
        overlay.classList.remove("open"); // retira o overlay
    };
});

// document.addEventListener("DOMContentLoaded", function () {
//     let arrowIcon = document.querySelector('.arrow-image');
//     arrowIcon.addEventListener('click', swapLocations);
// });



// Função data atual
function setTodayDate() {
    let dateInput = document.getElementById('departure-date');
    let today = new Date();
    
    // Obtem dia, mês e ano
    let day = String(today.getDate()).padStart(2, '0'); // garante 2 números
    let month = String(today.getMonth() + 1).padStart(2, '0'); // Meses começam no 0
    let year = today.getFullYear(); //ano atual
    
    // define formato dd/MM/yyyy a ser mostrado
    let formattedDate = `${day}/${month}/${year}`;
    
    // coloca no formato yyyy-MM-dd necessário para o input
    let isoDate = `${year}-${month}-${day}`;
    
    dateInput.value = isoDate;

    // como vai mostrar
    dateInput.setAttribute('placeholder', formattedDate);
}
window.onload = setTodayDate;


// function swapLocations() {
//     let departureInput = document.getElementById('departure-location');
//     let arrivalInput = document.getElementById('arrival-location');
//     let temp = departureInput.value;

//     departureInput.value = arrivalInput.value;
//     arrivalInput.value = temp;
// }

document.addEventListener("DOMContentLoaded", function () {
    let searchButton = document.querySelector(".search-flights-btn");
    let flightInfoWrapper = document.querySelector(".flight-info-wrapper");

    searchButton.addEventListener("click", function () {
        flightInfoWrapper.style.display = "block";

        let departureDate = document.getElementById("departure-date").value;
        let flightType = document.getElementById("flight-type").value;
        let aeroportLocation = document.getElementById("aeroport-location").value;

        let origin, destination, duration;
        let flightStatus1, flightStatus2, flightHour1, flightHour2;
        let arrivalHour1, arrivalHour2; 

        if (flightType === "ida") {
            
            origin = aeroportLocation;
            destination = "Paris";
            duration = "1h 00m";

            let day = new Date(departureDate).getDate();
            //primeiro voo
            flightStatus1 = (day % 2 === 0) ? "No horário" : "Atrasado";
            flightHour1 = (origin === "Lisboa") ? "10:05" : "12:10";
            arrivalHour1 = (flightHour1 === "10:05") ? "11:05" : "13:10";

            //segundo voo
            flightStatus2 = flightStatus1;
            flightHour2 = (flightHour1 === "10:05") ? "18:05" : "10:05";
            arrivalHour2 = (flightHour2 === "18:05") ? "19:05" : "11:05";

        } 
        else if (flightType === "regresso") {
            origin = "Budapeste";
            destination = aeroportLocation;
            duration = "1h 00m";

            let month = new Date(departureDate).getMonth() + 1;
            flightStatus1 = (month % 2 === 0) ? "No horário" : "Chegou";

            //primeiro voo
            flightHour1 = (origin === "Lisboa") ? "10:05" : "12:10";
            arrivalHour1 = (flightHour1 === "10:05") ? "11:05" : "13:10";

            //segundo voo
            flightStatus2 = flightStatus1;
            flightHour2 = (flightHour1 === "10:05") ? "18:05" : "10:05";
            arrivalHour2 = (flightHour2 === "18:05") ? "19:05" : "11:05";

        }


        document.getElementById("flight-number1").textContent = "TP1";
        document.getElementById("flight-status1").textContent = flightStatus1;
        document.getElementById("flight-hour1").textContent = flightHour1;
        document.getElementById("arrival1").textContent = arrivalHour1; 
        document.getElementById("origin1").textContent = origin;
        document.getElementById("duration1").textContent = duration;
        document.getElementById("destination1").textContent = destination;

        document.getElementById("flight-number2").textContent = "TP2";
        document.getElementById("flight-status2").textContent = flightStatus2;
        document.getElementById("flight-hour2").textContent = flightHour2;
        document.getElementById("arrival2").textContent = arrivalHour2;
        document.getElementById("origin2").textContent = origin;
        document.getElementById("duration2").textContent = duration; 
        document.getElementById("destination2").textContent = destination;
    });
});




