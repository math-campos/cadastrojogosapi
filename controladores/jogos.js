const { pool } = require('../config');

const getJogos = (request, response) => {
    pool.query(`select j.codigo as codigo, j.nome as nome, 
        j.descricao as descricao, j.estrelas as estrelas, 
        j.produtora as produtora
        from jogo j
        join produtora p on j.produtora = p.codigo
        order by j.codigo`, 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao consultar os jogos: ' + error
            });
        }
        response.status(200).json(results.rows);
    })
}

const addJogo = (request, response) => {
    const {nome, descricao, estrelas, produtora} = request.body;
    pool.query(`insert into jogo (nome, descricao, estrelas, produtora) 
    values ($1, $2, $3, $4)
    returning codigo, nome, descricao, estrelas, produtora`, 
    [nome, descricao, estrelas, produtora] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir jogo!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Jogo criado!",
            objeto : results.rows[0]
        });
    })
}

const updateJogo = (request, response) => {
    const {codigo, nome, descricao, estrelas, produtora} = request.body;
    pool.query(`UPDATE jogo
	SET nome=$1, descricao=$2, estrelas=$3, produtora=$4
	WHERE codigo=$5
returning codigo, nome, descricao, estrelas, produtora`, 
    [nome, descricao, estrelas, produtora, codigo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao atualizar jogo!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Jogo criado!",
            objeto : results.rows[0]
        });
    })
}


const deleteJogo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM jogo WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover jogo! ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Jogo removido!"
        });
    })
}

const getJogoPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM jogo WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar jogo!'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = {
    getJogos, addJogo, updateJogo, deleteJogo, getJogoPorCodigo
}
