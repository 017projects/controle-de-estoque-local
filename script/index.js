var unArray = ["Gabriele Avila", "exemploadm", "Hamilton Lazaro"];
var pwArray = ["i&Us01.GA", "123", "i&Us02.HL"];

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
            localStorage.setItem('token', pwArray[i]);
            alert('Bem vindo'+' '+unArray[i])
            window.location.href = 'home.html';
            return
    } else {
        document.getElementById('error').innerText = 'Usuário ou senha incorretos.';
        document.getElementById('error').style.display = 'block';
    }

};





