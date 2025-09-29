import dados from "../models/dados.js"; 
const {bruxos} = dados; 

// GET
const getAllBruxos = (req, res) => {
    const resultado = bruxos; 
    res.status(200).json ({
        total: bruxos.length,
        bruxos: resultado,
        message: "Lista de bruxos convocada com sucesso!"
    })
};

const bruxosById = (req, res) => {
    const id = parseInt (req.params.id);
    const bruxo = bruxos.find(b => b.id === id);
  
    if (bruxo) {
      res.status(200).json(bruxo);
    } else {
      res.status(404).json({
        mensagem: "Nenhum bruxo foi encontrado no Beco Diagonal!"
      });
    }
  };

  // CREATE 
const createBruxo = (req, res) => {
    const {nome, casa, ano, varinha, mascote, patrono, especialidade} = req.body; 

    if (!nome || !casa) {
        return res.status(400).json ({
            success: false,
            message: "Feitiço mal executado! Verifique os ingredientes."
        });
    }

    const novoBruxo = {
        id:  bruxos.length + 1,
        nome: nome, 
        casa: casa, 
        ano: ano,
        varinha: varinha, 
        mascote: mascote,
        patrono: patrono,
        especialidade: especialidade
    }

    const bruxoExiste = bruxos.find (b => b.nome === novoBruxo.nome);
    
    if (bruxoExiste) {
        res.status(409).json({
            success: false, 
            message: "Já existe um bruxo com esse nome!"
        }) 
       } else {
        bruxos.push(novoBruxo); 

        res.status(201).json ({
            success: true, 
            message: "Novo bruxo matriculado em Hogwarts!",
            bruxo: novoBruxo
        })
    }
};

//NEW
//Deletar um bruxo

const deleteBruxo = (req, res) => {
    let id = parseInt(req.params.id);

    const bruxoParaRemover = bruxos.find(b => b.id === id);

    if (!bruxoParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Esse bruxo não foi encontrado em Hogwarts!`
        })
    }

    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id != id);

bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

res.status(200).json ({
    success: true,
    message: "Bruxo expulso de Hogwarts com sucesso!",
    bruxoRemovido: bruxoParaRemover
    })
};


//POST
const updateBruxo = (req, res) => {
    const id = parseInt(req.params.id); 
    const {nome, casa, ano, varinha, mascote, patrono, especialidade} = req.body; 

    const idParaEditar = id; 

    if (isNaN(idParaEditar)) {
        return res.status(400).json ({
            success: false, 
            message: "O id deve ser um número válido!"
        })
    }

    const bruxoExiste = bruxos.find(bruxo => bruxo.id === idParaEditar); 

    if (!bruxoExiste) {
        return res.status(404).json ({
            success: false, 
            message: "Não é possível reparar o que não existe!"
        })
    }

    const bruxosAtualizados = bruxos.map(bruxo => 
        bruxo.id === idParaEditar 
            ? { 
                ...bruxo, 
                ...(nome && { nome }),
                ...(casa && { casa }),
                ...(ano && { ano: parseInt(ano) }),
                ...(varinha && { varinha }),
                ...(mascote && { mascote }),
                ...(patrono && { patrono }),
                ...(especialidade && { especialidade })
              }
            : bruxo);
 
            bruxos.splice(0, bruxos.length, ...bruxosAtualizados); 
            
            const bruxoNovo = bruxos.find(bruxo => bruxo.id === idParaEditar); 

            res.status(200).json({
                success: true, 
                message: "Bruxo atualizado com sucesso!", 
                bruxo: bruxoNovo
            })
}; 

export {getAllBruxos, bruxosById, createBruxo, deleteBruxo, updateBruxo};