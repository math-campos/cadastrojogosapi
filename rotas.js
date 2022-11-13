const { Router } = require('express');

const controleProdutoras = require('./controladores/produtoras');
const controleJogos = require("./controladores/jogos");

const rotas = new Router();

rotas.route('/jogos')
   .get(controleJogos.getJogos)
   .post(controleJogos.addJogo)
   .put(controleJogos.updateJogo)

rotas.route('/jogos/:codigo')
   .get(controleJogos.getJogoPorCodigo)
   .delete(controleJogos.deleteJogo)


rotas.route('/produtoras')
     .get(controleProdutoras.getProdutoras)
     .post(controleProdutoras.addProdutora)
     .put(controleProdutoras.updateProdutora)

rotas.route('/produtoras/:codigo')
     .get(controleProdutoras.getProdutoraPorCodigo)
     .delete(controleProdutoras.deleteProdutora)

module.exports = rotas;