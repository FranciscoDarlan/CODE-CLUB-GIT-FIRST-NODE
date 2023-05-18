/*primeira coisa a se fazer e criar uma rota ! */
/*sempre que preciso fazer um teste no meu codigo preciso para de rodar 
logo leva muito temmpo .... então devemos baixa o NODEMON
maneira correta de instalar o nodemon  para ajudar nesse problema. */

const express = require("express")
const app = express()
const PORT = 3000 /*posso criar uma vairavel da porta e jogar a variavel la no final */
const uuid = require('uuid') /*preciso criar essa variavel para ultilizar o uuid */

app.use(express.json())    /**esse e o padrao para avisar o express que json é o padrão */

const pedidos = []       /*simulando com se fosse um banco de dados */

app.get('/order', (request, response) => {
    return response.send(pedidos) /*aqui coloco (local dos dados), para mostra os dados */
})

app.post('/order', (request, response) => {
    const { order, clientName, price } = request.body

    /*preciso baixar o npm i uuid no terminal para criar id no meu codigo */
    const pedido = { id: uuid.v4(), order, clientName, price }

    pedidos.push(pedido)/* com esse método consigo empurrar as indormação dentro da variável */

    return response.json(pedido) /*não preciso coloca dentro de chaves, se nao aparece o nome da variavel */
})

app.put('/order/:id',(request, response) =>{
    const { order, clientName, price } = request.body /* variavel no metodo destruction com as informação do body */
    const { id } = request.params /*variável pegando as infomações do params */
    
    const updateOrder = { id, order, clientName, price} /*variavel de novo pedido */

    const index = pedidos.findIndex(pedidos => pedidos.id === id) /* variavel indice com função de posição se (pedidos => pedidos.id === id ) retorno uma posição ou -1 que  nao achou*/

    if (index < 0){ /*se index for menor que zero devido a posição vai retornar a mensagem abaixo de id nõa encontrado */
        return response.status(404).json({mensage:" Order not found"})
    }

    pedidos[index] = updateOrder /*todospedidos[posição do index no array] recebe o valor do novo pedido */

    return response.json(updateOrder) /*retorno na tela o atualizado */
})

app.delete('/order/:id',( request, response) => {
    /*const {order, clientName, price} = request.body*/// NO DELETE nao preciso dessas informações pois so quero deletar esse id (pedido)
    const { id } = request.params // só preciso da informação do id 

    const index = pedidos.findIndex(pedidos => pedidos.id === id) // confirmo a posição do id pelo findIndex
    
    if (index < 0 ){ // caso index retorne -1 colocar a mensagem abaixo não achado
        return response.status(404).json({mensage:" not "}) // status 404 informa erro
    }

    pedidos.splice( index,1 ) // splice responsável por deletar (não confundir com slice 😅)

    return response.status(201).json("ORDER SUCCESSFULLY DELETED") //status 201 sucesso
})

app.listen(PORT, () => {
    console.log(`o servidor está rodando na porta ${PORT}`) /*dessa forma consigo ver no terminal */
})