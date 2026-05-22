const Linhas = require('../models/Linhas');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

module.exports = class linhasControllers {
    // cadastrar linha
    static async criarLinha(req, res) {
        // captar usuario
        const token = getToken(req);
        const user = await getUserByToken(token);

        // captar campos
        const { numero, nomeCor, habilitada, emObras } = req.body;
        // checando se os campos existem
        if (!numero) {
            res.status(422).json({ message: "Preciso do numero para dar continuidade ao cadastro" });
            return;
        }
        if (!nomeCor) {
            res.status(422).json({ message: "Preciso do nomeCor para dar continuidade ao cadastro" });
            return;
        }

        if (habilitada === undefined) {
            res.status(422).json({ message: "Preciso do habilitada para dar continuidade ao cadastro" });
            return;
        }
        if (emObras === undefined) {
            res.status(422).json({ message: "Preciso do emObras para dar continuidade ao cadastro" });
            return;
        }

        // criando objeto
        const prototipo = new Linhas({

            numero,
            nomeCor,
            habilitada,
            emObras,
            usuario: {
                id: user._id,
                nome: user.nome,
                funcao: user.funcao
            }
        })
        // tentando salvar
        try {
            const novaLinha = await prototipo.save();

            res.status(200).json({ message: "linha salva com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }


    }
    // remover linha

    static async removerLinha(req, res) {
        // captando id de rota dinâmica
        const id = req.params.idLinha;
        // a linha existe?
        const linha = await Linhas.findById(id);

        if (!linha) {
            rs.status(422).json({ message: "Esta linha não existe" });
            return;
        }
        // tentando remover
        try {
            await Linhas.deleteOne({ _id: id });
            res.status(200).json({ message: "linha removida com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // alterar linha
    static async atualizar(req, res) {
        // captando id de rota dinamica
        const id = req.params.idLinha;
        // verificando existencia de linha
        const linha = await Linhas.findById(id);

        if (!linha) {
            res.status(422).json({ message: "linha não existe" });
            return;
        }

        // captar usuario
        const token = getToken(req);
        const user = await getUserByToken(token);

        // captar campos
        const { numero, nomeCor, habilitada, emObras } = req.body;
        // checando se os campos existem
        if (!numero) {
            res.status(422).json({ message: "Preciso do numero para dar continuidade ao cadastro" });
            return;
        }
        if (!nomeCor) {
            res.status(422).json({ message: "Preciso do nomeCor para dar continuidade ao cadastro" });
            return;
        }

        if (habilitada === undefined) {
            res.status(422).json({ message: "Preciso do habilitada para dar continuidade ao cadastro" });
            return;
        }
        if (emObras === undefined) {
            res.status(422).json({ message: "Preciso do emObras para dar continuidade ao cadastro" });
            return;
        }

        // criando objeto
        const prototipo = {
            numero,
            nomeCor,
            habilitada,
            emObras
        }

        // tentando atualizar
        try {
            await Linhas.updateOne({ _id: id }, prototipo);
            res.status(200).json({ message: "Linha atualizada com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // ver linhas por usuario
    static async linhaPorUsuario(req, res) {
        // captando usuario
        const token = getToken(req);
        const usuario = await getUserByToken(token);
        // tentando ver linhas de usuario logado
        try {
            const linhas = await Linhas.find({ 'usuario.id': usuario._id })
            res.status(200).json(linhas);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    // ver todas linhas 

    static async todasLinhas(req, res) {
        try {
            const linhas = await Linhas.find().lean();
            res.status(200).json(linhas);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // ver linha individual

    static async linhaIndividual(req, res) {
        // captando id dinamico
        const id = req.params.idLinha;
        // linha existe?
        const linha = await Linhas.findById(id);

        if (!linha) {
            res.status(422).json({ message: "linha não existe" });
            return;
        }

        // tentando ver linha

        try {
            res.status(200).json(linha);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // filtrar por status de habilitada
    static async filtrarPorHabilitada(req, res) {
        // captando campo do body
        const { habilitada } = req.body;
        // checando se o campo booleano existe
        if (habilitada === undefined) {
            res.status(422).json({ message: "preciso do campo habilitada" });
            return;
        }
        // tentando filtrar dados
        try {
            const linhas = await Linhas.find({ habilitada: habilitada });
            res.status(200).json(linhas);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // filtrar por status de obras
    static async filtrarStatus(req, res) {
        // captando campo do body
        const { emObras } = req.body;
        // checando se campo booleano existe
        if (emObras === undefined) {
            res.status(422).json({ message: "preciso do campo emObras" });
            return;
        }
        // tentando filtrar linhas
        try {
            const linhas = await Linhas.find({ emObras: emObras });
            res.status(200).json(linhas);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // habilitar linha

    static async habilitarLinha(req, res) {
        // captando id dinamico da linha
        const id = req.params.idLinha;
        // checando se a linha existe

        const linha = await Linhas.findById(id);
        if (!linha) {
            res.status(422).json({ message: "linha não existe" });
            return;
        }
        // cirando prototipo de habilitacao
        const prototipo = {
            habilitada: true
        }
        // tentando habilitar
        try {
            await Linhas.updateOne({ _id: id }, prototipo);

            res.status(200).json({ message: "linha habilitada com sucesso" });

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    // desabilitar linha
    static async desabilitarLinha(req, res) {
        // captando id dinamico da linha
        const id = req.params.idLinha;
        // checando se a linha existe

        const linha = await Linhas.findById(id);
        if (!linha) {
            res.status(422).json({ message: "linha não existe" });
            return;
        }
        // criando prototipo 
        const prototipo = {
            habilitada: false
        }
        // tentando desabilitar
        try {
            await Linhas.updateOne({ _id: id }, prototipo);

            res.status(200).json({ message: "linha desabilitada com sucesso" });

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    // colocar linha em obras
    static async reformarLinha(req, res) {
        // captando id dinamico da linha
        const id = req.params.idLinha;
        console.log(id);
        // checando se a linha existe

        const linha = await Linhas.findById(id);
        console.log(linha);
        if (!linha) {
            res.status(422).json({ message: "linha não existe" });
            return;
        }
        // criando prototipo 
        const prototipo = {
            emObras: true
        }
        // tentando reformar
        try {
            await Linhas.updateOne({ _id: id }, prototipo);

            res.status(200).json({ message: "reformas iniciadas na linha" });

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // retirar linha de obras
    static async finalizarReformaLinha(req, res) {
        // captando id dinamico da linha
        const id = req.params.idLinha;
        // checando se a linha existe

        const linha = await Linhas.findById(id);
        if (!linha) {
            res.status(422).json({ message: "linha não existe" });
            return;
        }
        // criando prototipo 
        const prototipo = {
            emObras: false
        }
        // tentando finalizar reformas
        try {
            await Linhas.updateOne({ _id: id }, prototipo);

            res.status(200).json({ message: "reformas finalizadas na linha" });

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
}