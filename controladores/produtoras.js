const {pool} = require('../config');

const getProdutoras = (request, response) => {
    pool.query('SELECT * FROM produtora order by codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar produtora: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }       
    )
}

const addProdutora = (request, response) => {
    const {nome, descricao} = request.body;
    pool.query(`INSERT INTO produtora (nome, descricao) 
    values ($1, $2) returning codigo, nome, descricao`,
    [nome, descricao],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao inserir o produtora: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Produtora criada",
            objeto: results.rows[0]
        })
    })
}

const updateProdutora = (request, response) => {
    const {codigo, nome, descricao} = request.body;
    pool.query(`UPDATE produtora SET nome=$1, descricao=$2
    where codigo=$3 returning codigo, nome, descricao`,
    [nome, descricao, codigo],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao alterar produtora: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Produtora alterada",
            objeto: results.rows[0]
        })
    })
}

const deleteProdutora = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM produtora WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao remover produtora: ' + 
                (error ? error :'Não removeu nenhuma linha')
            })
        }
        response.status(200).json({
            status : "success" , message : "Produtora removida"
        })
    })
}

const getProdutoraPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM produtora WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar produtora: ' + 
                (error ? error :'Não encontrou nenhuma linha')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getProdutoras, addProdutora, updateProdutora, deleteProdutora, getProdutoraPorCodigo
}

 
