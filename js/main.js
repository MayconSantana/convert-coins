// API Moedas
let url = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL"
let dolarAPI;
let euroAPI;

fetch(url).then((response) => {
    response.json().then((data) => {

        dolarAPI = (+data.USDBRL.low + +data.USDBRL.high) / 2
        euroAPI = (+data.EURBRL.low + +data.EURBRL.high) / 2
        
    })
})

// Seleção de Elementos
const input = document.querySelector('#moeda')
radioGroup = document.querySelectorAll('.radio-group')
radioGroupDolar = document.querySelector('.dolar')
radioGroupEuro = document.querySelector('.euro')
radioGroupLibra = document.querySelector('.libra')
radios = document.getElementsByName('radio')
convertBtn = document.querySelector('#converter')
backBtn = document.querySelector('#voltar')
container1 = document.querySelector('.container1')
container2 = document.querySelector('.container2')
spanReal = document.querySelector('#real')
spanValor = document.querySelector('#valor')
spanResult = document.querySelector('#result')

// Funções
const changeScreen = () => {
    container1.classList.toggle('none')
    container2.classList.toggle('none')
}

const resetInputs = () => {
    input.value = ''
    radioGroupDolar.style.background = "#000";
    radioGroupEuro.style.background = "#000"
    radioGroupLibra.style.background = "#000"
}

// Eventos
[convertBtn, backBtn].forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
    })
})

backBtn.addEventListener("click", () => {
    changeScreen()
    resetInputs()
});

let radioValue;

radios.forEach((r) => {
    r.addEventListener('change', () => {
        
        if(r.checked) {
            radioValue = r.value
        }

        switch(radioValue) {
            case "Dólar": 
                radioGroupDolar.style.background = "#06489e";
                radioGroupEuro.style.background = "#000"
                radioGroupLibra.style.background = "#000"
            break;

            case "Euro":
                radioGroupDolar.style.background = "#000";
                radioGroupEuro.style.background = "#06489e"
                radioGroupLibra.style.background = "#000"
            break;

            case "Libra":
                radioGroupDolar.style.background = "#000";
                radioGroupEuro.style.background = "#000"
                radioGroupLibra.style.background = "#06489e"
            break;
        }
    })
})

convertBtn.addEventListener("click", () => {
    let moeda = input.value;
null
    if (moeda !== '') {
        if (radioValue !== undefined) {
            changeScreen()
        } else {
            alert('Selecione a moeda para converter!')
        }
    } else {
        alert('Coloque o valor!')
        return
    }
    

    spanReal.innerText = `R$${moeda}`;

    let cotDolar = dolarAPI;
    let cotEuro = euroAPI;
    let cotLibra = 0.16;

    let moedaConvertida;

    switch(radioValue) {
        case "Dólar":
            spanValor.innerText = "Dólar: "
            moedaConvertida = (moeda / cotDolar).toFixed(2)
            spanResult.innerText = `${moedaConvertida}US$`
        break;

        case "Euro":
            spanValor.innerText = "Euro:"
            moedaConvertida = (moeda / cotEuro).toFixed(2)
            spanResult.innerText = `${moedaConvertida}€`
        break;

        case "Libra":
            spanValor.innerText = "Libra:"
            moedaConvertida = (moeda * cotLibra).toFixed(2)
            spanResult.innerText = `${moedaConvertida}£`
        break;
    }

    
})