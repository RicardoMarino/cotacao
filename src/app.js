const path = require('path')

const express = require('express')
const hbs = require('hbs')
const cotacao = require('./util/cotacao')
const publicDiretoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partial')
    // Configuração basica
const app = express()
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDiretoryPath))
hbs.registerPartials(partialsPath)



/*
    Configuração de tempo de resposta
*/
const port = process.env.PORT || 3000


// Rotas:
app.get('', (request, response) => {
        response.render('index', {
            title: "Bem vindo ao sistema de cotações",
            author: "Ricardo Marino da Silva Oliveira"
        })
    })
    .get('/about', (request, response) => {
        response.render('about', {
            title: 'About',
            author: "Ricardo Marino da Silva Oliveira"
        })
    })
    .get('/help', (request, response) => {
        response.render('help', {
            title: 'Help',
            author: "Ricardo Marino da Silva Oliveira"
        })
    })
    .get('/cotacoes', (request, response) => {
        if (!request.query.ativo) {
            return response.status(400).json({
                error: {
                    mensage: 'O ativo é obrigatório.',
                    code: 400
                }
            })
        }

        let symbol = request.query.ativo.toUpperCase()
        cotacao(symbol, (error, data) => {
            if (error) {
                const message = {
                    error: {
                        mensage: error.mensage,
                        code: error.code
                    }

                }
                return response.status(error.code).json(message)
            }

            return response.status(200).json(data)
        })
    })
    .get('/about/*', (request, response) => {
        response.render('404', {
            title: '404 about',
            author: "Ricardo Marino da Silva Oliveira",
            errorMessage: 'Página não encontrada'
        })
    })
    .get('*', (request, response) => {
        response.render('404', {
            title: '404',
            author: "Ricardo Marino da Silva Oliveira",
            errorMessage: 'Página não encontrada'
        })
    })


app.listen(port, () => {
    console.log(`server up ${port}`)
})