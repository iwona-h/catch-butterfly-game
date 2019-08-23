var changer;
var mseconds = 0;
var time = 3000;
var points = 0;
var is_catch = true;
var mistakes = 0;
var results = "";

// Dźwięki z Twierdza RPG Makera www.rpgmaker.pl
var yes = new Audio("sounds/CLICK_3.wav");
var no = new Audio("sounds/mouse_error.wav");

// Funkcja zwracjąca planszę z losowo umieszczonym motylem
function showButterfly() {

    if (is_catch == false) {
        mistake();
    }

    // Losowanie liczby z przedziału 0-377
    var index = Math.floor(Math.random() * 378);

    var element = "";

    for (i = 0; i < 378; i++) {

        if (i == index) {
            element = element + '<img class="butterfly" src="img/butterfly2.jpeg" onclick="catchButterfly()"/>';
        }
        else {
            element = element + '<img class="empty" src="" alt="" />';
        }           
    }
    if (mistakes < 4) {
        document.getElementById("butterflies").innerHTML = element;
    }
    // Koniec gry
    else {
        defeat();
        gameOver();
    }

    is_catch = false;
}

// Funkcja rozpoczynajaca wyświetlanie plansz
function start() {
    showButterfly();
    changer = setInterval(counter, 100);

    document.getElementById("start_button").setAttribute("onclick", ";");
}

// Funkcja definiująca częstotliwość zmiany planszy
function counter() {
    mseconds = mseconds + 100;

    if (mseconds == time) {

        if (time < 1000) {
            showButterfly();
        }
        // Zwiększanie częstotliwości zmiany planszy
        else {
            showButterfly();
            time = time - 100;
        }
        mseconds = 0;
    }
}

// Funkcja zatrzymująca zmiany plansz i kończąca grę
function defeat() {
    clearInterval(changer);
}

// Funkcja uruchamiana po złapaniu (kliknięciu) motyla
function catchButterfly() {
    yes.play();

    var butterflies = document.getElementsByClassName("butterfly");
    butterflies[0].style.border = "2px solid #33ff33";
    butterflies[0].style.borderRadius = "5px";
    butterflies[0].style.cursor = "none";

    butterflies[0].setAttribute("onclick", ";");

    points = points + 20;
    actualizePoints();

    is_catch = true;
}

// Funkcja aktualizująca liczbę punktów
function actualizePoints() {
    document.getElementById("results").innerHTML = "Points: " + points;
}

// Funkcja licząca błędy
function mistake() {
    no.play();
    mistakes = mistakes + 1;

    if (mistakes < 4) {
        document.getElementById("mistake" + mistakes).style.display = "inline-block";
    }
}

// Funckja genrująca końcowy komunikat
function gameOver() {
    results = "Points scored: " + points;
    document.getElementById("butterflies").innerHTML = '<span id="game_over">GAME OVER</span><br></br>' + results +
    '<br></br><span id="try_again" onclick="location.reload()">Try again</span>';
}
