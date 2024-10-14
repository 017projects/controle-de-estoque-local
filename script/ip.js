let ipAddressv4;
let ipAddressv6;

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    ipAddressv4 = data.ip;
  })
  
  .catch(error => console.error('Erro ao obter IP:', error));

  fetch('https://api64.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    ipAddressv6 = data.ip;
  })
  
  .catch(error => console.error('Erro ao obter IP:', error)); 