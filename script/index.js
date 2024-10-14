var unArray = ["Gabriele Avila", "017_us", "Hamilton Lazaro", "Luan Silva", "Matheus Maia"];
var pwArray = ["i&Us01.GA", "i&Us00.ADM", "i&Us02.HL", "i&Us03.LS", "i&Us04.MM"];

const jsonArray = [
    {ex1: "gabi", ex2: "22", ex3: "10/11/2024"}
]

function login(event) {
event.preventDefault();


const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

var valid = false;

    for (var i=0; i <unArray.length; i++) {
        if ((username == unArray[i]) && (password == pwArray[i])) {
            valid = true;
            break;
        }
}

    if (valid === true) {
            localStorage.setItem('user', unArray[i])
            localStorage.setItem('token', pwArray[i]);
            localStorage.setItem('exemplo', JSON.stringify(jsonArray))
            alert('Bem vindo'+' '+unArray[i])
            window.location.href = 'home.html';
            return
    } else {
        document.getElementById('error').innerText = 'Usuário ou senha incorretos.';
        document.getElementById('error').style.display = 'block';
    }

};

const ex1 = localStorage.getItem('user');






