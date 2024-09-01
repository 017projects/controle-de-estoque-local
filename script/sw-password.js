var btn_sw = document.getElementById('password-sw')

document.getElementById('password-sw').addEventListener('click', function(){

if(btn_sw.checked){
    var onChecked = document.getElementById('password');
    onChecked.setAttribute('type', 'text')
}else{
    var offchecked = document.getElementById('password');
    offchecked.setAttribute('type', 'password')
}

})