const { Router } = require('express');

const controleProdutoras = require('./controladores/produtoras');
const controleJogos = require("./controladores/jogos");
const seguranca = require('./controladores/seguranca');

const rotas = new Router();

rotas.route("/login")
     .post(seguranca.login)

rotas.route('/jogos')
   .get(seguranca.verificaJWT, controleJogos.getJogos)
   .post(seguranca.verificaJWT, controleJogos.addJogo)
   .put(seguranca.verificaJWT, controleJogos.updateJogo)

rotas.route('/jogos/:codigo')
   .get(seguranca.verificaJWT, controleJogos.getJogoPorCodigo)
   .delete(seguranca.verificaJWT, controleJogos.deleteJogo)


rotas.route('/produtoras')
     .get(seguranca.verificaJWT, controleProdutoras.getProdutoras)
     .post(seguranca.verificaJWT, controleProdutoras.addProdutora)
     .put(seguranca.verificaJWT, controleProdutoras.updateProdutora)

rotas.route('/produtoras/:codigo')
     .get(seguranca.verificaJWT, controleProdutoras.getProdutoraPorCodigo)
     .delete(seguranca.verificaJWT, controleProdutoras.deleteProdutora)

module.exports = rotas;