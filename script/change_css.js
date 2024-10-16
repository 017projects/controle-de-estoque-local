const changeAction = (t) => {

    const action = t.getAttribute('data-action')
    
    return actions[action](t)
    
    }
    
    const actions = {
     acaoUm: (t) =>{
     t.setAttribute('data-action', 'acaoDois')
     document.querySelector('#exportBtn').style = 'display: flex'
     document.querySelector('.csvFileInput').style = 'display: flex'
     document.querySelector('#sendDataButton').style = 'display: none'
     document.querySelector('#importDataButton').style = 'display: none'
     document.querySelector('.csv-button').innerHTML = '<b>DATA</b>'
     
     
     },
     acaoDois: (t) =>{
     t.setAttribute('data-action', 'acaoUm')
     document.querySelector('#exportBtn').style = 'display: '
     document.querySelector('.csvFileInput').style = 'display: '
     document.querySelector('#sendDataButton').style = 'display: '
     document.querySelector('#importDataButton').style = 'display: '
     document.querySelector('.csv-button').innerHTML = '<b>CSV</b>'
     


     },
    
}
