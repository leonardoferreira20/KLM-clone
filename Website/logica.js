// FLY STATUS - TAB
var tabFlyStatus = document.getElementById('tabFlyStatus');
var tabFlyStatusIcon = document.getElementById('tabFlyStatus-icon');
var formFlyStatus = document.getElementById('formFlyStatus');

// RESERVE FLY - TAB
var tabReserveFly = document.getElementById('tabReserveFly');
var tabReserveFlyIcon = document.getElementById('tabReserveFly-icon');
var formReserveFly = document.getElementById('formReserveFly');

var flyStatusDatePicker = document.getElementById('flyStatusDatePicker');
var flyStatusType = document.getElementById('flyStatusType');
var flyStatusAirport = document.getElementById('flyStatusAirport');
var flyStatusContainer = document.getElementById('flyStatusContainer');
var formShowMoreBtn = document.getElementById('showMoreBtn');
var searchContainer = document.getElementById("flyContainerSearchBox");
var header = document.getElementById("header");
var menuButton = document.getElementById('sidenavBtnMenu');
var sidebar = document.getElementById("sidebar");
var overlay = document.getElementById("overlay");
var sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
var searchButton = document.getElementById('flyStatusSearchBtn');
var flyStatusInfoContainer = document.getElementById('flyStatusInfoContainer');
var flyStatusContainerCloseBtn = document.getElementById('flyStatusContainerCloseBtn');
var clearInputAirport = document.getElementById('clearInputAirport');
var inputTakeOffAirport = document.getElementById('inputTakeOffAirport');
var clearInputTakeOffAirport = document.getElementById('clearInputTakeOffAirport');
var clearInputArrivalAirport = document.getElementById('clearInputArrivalAirport');
var inputArrivalAirport = document.getElementById('inputArrivalAirport');

// GET ACTUAL DATE
function setTodayDate() {
    let today = new Date();
    
    // Obtem dia, mês e ano
    let day = String(today.getDate()).padStart(2, '0'); // garante 2 números
    let month = String(today.getMonth() + 1).padStart(2, '0'); // Meses começam no 0
    let year = today.getFullYear(); //ano atual
    
    // define formato dd/MM/yyyy a ser mostrado
    let formattedDate = `${day}/${month}/${year}`;
    
    // coloca no formato yyyy-MM-dd necessário para o input
    let isoDate = `${year}-${month}-${day}`;
    
    flyStatusDatePicker.value = isoDate;
}
setTodayDate();

// EXPAND SEARCH BOX FORM
formShowMoreBtn.addEventListener('click', function(){
    searchContainer.style.height = (window.innerWidth <= 960) ? "690px" : "260px";
    formShowMoreBtn.style.display = "none";
});

// SCROLL EFFECT
var previousScrollPosition = window.scrollY;
window.onscroll = function() {
    var currentScrollPosition = window.scrollY;
    
    if ( previousScrollPosition > currentScrollPosition ){
        header.style.top = "0";
    }else {
        header.style.top = "-56px";
    }
    
    previousScrollPosition = currentScrollPosition;
};

// OPEN SIDEBAR FUNCTION
function openSidebar(){
    sidebar.classList.add('open');
    overlay.classList.add('open');
}
menuButton.addEventListener('click', openSidebar);

// CLOSE SIDEBAR FUNCTION
function closeSidebar(){
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
}
overlay.addEventListener('click', closeSidebar)
sidebarCloseBtn.addEventListener('click', closeSidebar);

// ACTIVATE FLY STATUS TAB
tabFlyStatus.addEventListener('click', function(){

    tabFlyStatus.style.backgroundColor = "#FFF";
    tabFlyStatus.style.color = "#072B45";
    tabFlyStatusIcon.src = "img/travel (1).png";
    
    tabReserveFly.style.background = "#072B45";
    tabReserveFly.style.color = "#FFF";
    tabReserveFlyIcon.src = "img/black-plane_notActive.png";

    formReserveFly.style.display = 'none';
    formFlyStatus.style.display = 'block';


    searchContainer.style.height = (window.innerWidth <= 960) ? "334px" : "106px";
    formShowMoreBtn.style.display = 'flex';
});

// ACTIVATE RESERVE FLY TAB
tabReserveFly.addEventListener('click', function(){
    tabReserveFly.style.backgroundColor = "#FFF";
    tabReserveFly.style.color = "#072B45";
    tabReserveFlyIcon.src = "img/black-plane_active.png";
    
    tabFlyStatus.style.background = "#072B45";
    tabFlyStatus.style.color = "#FFF";
    tabFlyStatusIcon.src = "img/travel.png";

    formReserveFly.style.display = 'block';
    formFlyStatus.style.display = 'none';
});

// SHOW FLIGHTS
formFlyStatus.addEventListener('submit', function (event) {
    // Prevenir o envio padrão do formulário
    event.preventDefault();

    // Capturar os valores dos campos
    var flyStatusTypeValue = flyStatusType.value;
    var flyStatusDatePickerValue = flyStatusDatePicker.value;
    var flyStatusAirportValue = flyStatusAirport.value;

    // Verificar se os campos estão preenchidos (opcional, já validado pelo navegador)
    if (!flyStatusTypeValue || !flyStatusDatePickerValue || !flyStatusAirportValue) {
        alert('Por favor, preencha todos os campos antes de continuar.');
        return;
    }

    var origin, destination, duration;
    var flightStatus1, flightStatus2, flightHour1, flightHour2;
    var arrivalHour1, arrivalHour2;

    overlay.classList.add('open');
    document.body.style.overflowY = "hidden";
    flyStatusContainer.style.display = "block";
    flyStatusInfoContainer.style.display = "block";

    if (flyStatusTypeValue === "ida") {
        origin = flyStatusAirportValue;
        destination = "Paris";
        duration = "1h 00m";

        var day = new Date(flyStatusDatePickerValue).getDate();
        // FIRST FLIGHT
        flightStatus1 = (day % 2 === 0) ? "No horário" : "Atrasado";
        flightHour1 = (origin === "Lisboa, Humberto Delgado Airport") ? "10:05" : "12:10";
        arrivalHour1 = (flightHour1 === "10:05") ? "11:05" : "13:10";

        // SECOND FLIGHT
        flightStatus2 = flightStatus1;
        flightHour2 = (flightHour1 === "10:05") ? "18:05" : "10:05";
        arrivalHour2 = (flightHour2 === "18:05") ? "19:05" : "11:05";

    } else if (flyStatusTypeValue === "regresso") {
        origin = "Budapeste";
        destination = flyStatusAirportValue;
        duration = "1h 00m";

        var month = new Date(flyStatusDatePickerValue).getMonth() + 1;
        flightStatus1 = (month % 2 === 0) ? "No horário" : "Chegou";

        // FIRST FLIGHT
        flightHour1 = (origin === "Lisboa, Humberto Delgado Airport") ? "10:05" : "12:10";
        arrivalHour1 = (flightHour1 === "10:05") ? "11:05" : "13:10";

        // SECOND FLIGHT
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

flyStatusContainerCloseBtn.addEventListener('click', function(){
    flyStatusContainer.style.display = "none";
    document.body.style.overflowY = 'auto';
    overlay.classList.remove('open');
});

clearInputAirport.addEventListener('click', function(){
    flyStatusAirport.value = "";
});

clearInputTakeOffAirport.addEventListener('click', function(){
    inputTakeOffAirport.value = "";
});

clearInputArrivalAirport.addEventListener('click', function(){
    inputArrivalAirport.value = "";
});


// CONTACT
var titleContact = document.getElementById('titleContact');
var openArrowContact = document.getElementById('openArrowContact');
var contentContact = document.getElementById('contentContact');
var counterContact = 0;

titleContact.addEventListener('click', function(){
    counterContact++;
    if ( counterContact % 2 == 0 ){
        openArrowContact.style.rotate = "0deg";
        contentContact.style.height = "0";
    }else {
        openArrowContact.style.rotate = "180deg";
        contentContact.style.height = "176px";
    }
});

// ABOUT
var titleAbout = document.getElementById('titleAbout');
var openArrowAbout = document.getElementById('openArrowAbout');
var contentAbout = document.getElementById('contentAbout');
var counterAbout = 0;

titleAbout.addEventListener('click', function(){
    counterAbout++;
    if ( counterAbout % 2 == 0 ){
        openArrowAbout.style.rotate = "0deg";
        contentAbout.style.height = "0";
    }else {
        openArrowAbout.style.rotate = "180deg";
        contentAbout.style.height = "208px";
    }
});

// OFFERS
var titleOffers = document.getElementById('titleOffers');
var openArrowOffers = document.getElementById('openArrowOffers');
var contentOffers = document.getElementById('contentOffers');
var counterOffers = 0;

titleOffers.addEventListener('click', function(){
    counterOffers++;
    if ( counterOffers % 2 == 0 ){
        openArrowOffers.style.rotate = "0deg";
        contentOffers.style.height = "0";
    }else {
        openArrowOffers.style.rotate = "180deg";
        contentOffers.style.height = "80px";
    }
});

// MORE ABOUT
var titleMoreAbout = document.getElementById('titleMoreAbout');
var openArrowMoreAbout = document.getElementById('openArrowMoreAbout');
var contentMoreAbout = document.getElementById('contentMoreAbout');
var counterMoreAbout = 0;

titleMoreAbout.addEventListener('click', function(){
    counterMoreAbout++;
    if ( counterMoreAbout % 2 == 0 ){
        openArrowMoreAbout.style.rotate = "0deg";
        contentMoreAbout.style.height = "0";
    }else {
        openArrowMoreAbout.style.rotate = "180deg";
        contentMoreAbout.style.height = "112px";
    }
});

//DOWNLOAD
var titleDownload = document.getElementById('titleDownload');
var openArrowDownload = document.getElementById('openArrowDownload');
var contentDownload = document.getElementById('contentDownload');
var counterDownload = 0;

titleDownload.addEventListener('click', function(){
    counterDownload++;
    if ( counterDownload % 2 == 0 ){
        openArrowDownload.style.rotate = "0deg";
        contentDownload.style.height = "0";
    }else {
        openArrowDownload.style.rotate = "180deg";
        contentDownload.style.height = "116px";
    }
});

//WEBSITES RELACIONADOS
var titleWebRelated = document.getElementById('titleWebRelated');
var openArrowWebRelated = document.getElementById('openArrowWebRelated');
var contentWebRelated = document.getElementById('contentWebRelated');
var counterWebRelated = 0;

titleWebRelated.addEventListener('click', function(){
    counterWebRelated++;
    if ( counterWebRelated % 2 == 0 ){
        openArrowWebRelated.style.rotate = "0deg";
        contentWebRelated.style.height = "0";
    }else {
        openArrowWebRelated.style.rotate = "180deg";
        contentWebRelated.style.height = "208px";
    }
});

//GUIAS DE VIAGEM
var titleTravelGuide = document.getElementById('titleTravelGuide');
var openArrowTravelGuide = document.getElementById('openArrowTravelGuide');
var contentTravelGuide = document.getElementById('contentTravelGuide');
var counterTravelGuide = 0;

titleTravelGuide.addEventListener('click', function(){
    counterTravelGuide++;
    if ( counterTravelGuide % 2 == 0 ){
        openArrowTravelGuide.style.rotate = "0deg";
        contentTravelGuide.style.height = "0";
    }else {
        openArrowTravelGuide.style.rotate = "180deg";
        contentTravelGuide.style.height = "336px";
    }
});

//TOP DESTINOS
var titleTopDestinations = document.getElementById('titleTopDestinations');
var openArrowTopDestinations = document.getElementById('openArrowTopDestinations');
var contentTopDestinations = document.getElementById('contentTopDestinations');
var counterTopDestinations = 0;

titleTopDestinations.addEventListener('click', function(){
    counterTopDestinations++;
    if ( counterTopDestinations % 2 == 0 ){
        openArrowTopDestinations.style.rotate = "0deg";
        contentTopDestinations.style.height = "0";
    }else {
        openArrowTopDestinations.style.rotate = "180deg";
        contentTopDestinations.style.height = "336px";
    }
});

//PAISES MAIS PROCURADOS
var titleSearchedContries = document.getElementById('titleSearchedContries');
var openArrowSearchedContries = document.getElementById('openArrowSearchedContries');
var contentSearchedContries = document.getElementById('contentSearchedContries');
var counterSearchedContries = 0;

titleSearchedContries.addEventListener('click', function(){
    counterSearchedContries++;
    if ( counterSearchedContries % 2 == 0 ){
        openArrowSearchedContries.style.rotate = "0deg";
        contentSearchedContries.style.height = "0";
    }else {
        openArrowSearchedContries.style.rotate = "180deg";
        contentSearchedContries.style.height = "304px";
    }
});

//DESTINOS POPULARES
var titlePopularDestinations = document.getElementById('titlePopularDestinations');
var openArrowPopularDestinations = document.getElementById('openArrowPopularDestinations');
var contentPopularDestinations = document.getElementById('contentPopularDestinations');
var counterPopularDestinations = 0;

titlePopularDestinations.addEventListener('click', function(){
    counterPopularDestinations++;
    if ( counterPopularDestinations % 2 == 0 ){
        openArrowPopularDestinations.style.rotate = "0deg";
        contentPopularDestinations.style.height = "0";
    }else {
        openArrowPopularDestinations.style.rotate = "180deg";
        contentPopularDestinations.style.height = "272px";
    }
});