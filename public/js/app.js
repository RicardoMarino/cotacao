const mainH3 = document.querySelector('h3')

const cotacaoForm = document.querySelector('form')

const symbol = document.getElementById('symbol')
const price_open = document.getElementById('price_open')
const price = document.getElementById('price')
const day_high = document.getElementById('day_high')
const day_low = document.getElementById('day_low')

cotacaoForm.addEventListener('submit', (event) => {
    mainH3.innerText = 'Buscando...'

    symbol.innerText = ''
    price_open.innerText = ''

    price.innerText = ''

    day_high.innerText = ''

    day_low.innerText = ''

    event.preventDefault()
    const ativo = document.querySelector('input').value
    if (!ativo) {
        document.querySelector('input').className = 'input-error'
        mainH3.innerHTML = 'O ativo deve ser preenchido'
        return
    }
    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    mainH3.innerText = `Alguma coisa deu errado: ${data.error.mensage} código ${data.error.code}`
                    return
                }

                mainH3.innerText = 'Resultado encontrado'

                symbol.innerText = data.symbol
                price_open.innerText = `Preço de abertura: R$ ${data.price_open.replace('.',',')}`
                price_open.style.color = 'green'

                price.innerText = `Preço do fechamento: R$ ${data.price.replace('.',',')}`
                price.style.color = 'green'

                day_high.innerText = `Maior alta do dia: R$ ${data.day_high.replace('.',',')}`
                day_high.style.color = 'green'

                day_low.innerText = `Menor baixa do dia: R$ ${data.day_low.replace('.',',')}`
                day_low.style.color = 'red'
            })
        })
})