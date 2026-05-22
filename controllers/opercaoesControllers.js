const Operacoes2 = require('../models/Operacoes');
const Linhas = require('../models/Linhas');
const Composicoes = require('../models/Composicoes');
const SerieTrens = require('../models/serieTrens');

module.exports = class Operacoes {
    // cadastrar operacoes

    static async cadastrarOperacao(req, res) {
        // captando dados do body
        const { numeroLinha, prefixoComposicao } = req.body;
        // verificando a existencia dos campos

        if (!numeroLinha) {
            res.status(422).json({ message: "Precisamos do numeroLinha para continuar a operação" });
            return;
        }
        if (!prefixoComposicao) {
            res.status(422).json({ message: "Precisamos da prefixoComposição para continuar a operação" });
            return;
        }

        // captando linha

        const linhaObjeto = await Linhas.findOne({ numero: numeroLinha });
        console.log(linhaObjeto)
        // verificando a existencia de linha

        if (!linhaObjeto) {

            res.status(422).json({ message: "Linha não existe em nosso sistema" });
            return;
        }

        // captando composicao

        const composicaoObjeto = await Composicoes.findOne({ prefixo: prefixoComposicao });
        console.log(composicaoObjeto)
        if (!composicaoObjeto) {

            res.status(422).json({ message: "composição não existe em nosso sistema" });
            return;
        }

        // regras

        // trem em manutenção não pode entrar em operação

        if (composicaoObjeto.manutencao === true) {
            res.status(422).json({ message: "Esta composição está em manuntenção portanto não pode operar em linha" });
            return;
        }

        // As linhas em obras não recebem trens

        if (linhaObjeto.emObras === true) {
            res.status(422).json({ message: "Esta linha está em obras portanto não pode receber composição" });
            return;

        }

        // As linhas dsabilitadas não recebem trens

        if (linhaObjeto.habilitada === false) {
            res.status(422).json({ message: "Esta linha está desabilitada portanto não pode receber composição" });
            return;

        }

        // trens de determinadas séires so servem para uma única linha


        const idSerie = composicaoObjeto.serieTrens.id;

        const serieAlfa = await SerieTrens.findById({ _id: idSerie })
        if (!serieAlfa) {
            res.status(422).json({
                message: "Série não encontrada"
            });
            return;
        }

        const idLinha = serieAlfa.linhaOperacao.id;

        if (linhaObjeto._id.toString() !== idLinha.toString()) {
            res.status(422).json({ message: "esta composição não pode rodar nesta linha" });
            return;
        }

        // captando usuario

        const usuario = req.user;

        // criando portótipo
        console.log(usuario.nome)
        const prototipo = new Operacoes2({

            linha: {
                id: linhaObjeto._id,
                numero: linhaObjeto.numero,
                nomeCor: linhaObjeto.nomeCor
            },
            composicao: {
                id: composicaoObjeto._id,
                prefixo: composicaoObjeto.prefixo
            },
            usuario: {
                id: usuario.id,
                nome: usuario.nome
            }
        })

        console.log(prototipo)
        console.log(Operacoes);
        console.log(typeof Operacoes);
        console.log(Operacoes.prototype);

        // tentando salvar operação

        try {
            await prototipo.save();
            res.status(200).json({ message: "Operação criada com sucesso!!!" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }


    }
    // remover operacoes

    static async removerOperacao(req, res) {
        // captando id de rota dinamica
        const id = req.params.idOperacao;
        // verificando se a operação existe
        const op = await Operacoes2.findById(id);

        if (!op) {
            res.status(422).json({ message: "Operação inexistente" });
            return;
        }
        // tentando remover a operação
        try {
            await Operacoes2.deleteOne({ _id: id });
            res.status(200).json({ message: "composição removida com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    // ver operacoes por usuario
    static async porUsuario(req, res){
        // captando usuario logado
        const usuario = req.user;
       
        // tentando filtrar
         try {
            const operacoes = await Operacoes2.find({'usuario.id':usuario.id});
            res.status(200).json(operacoes);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // ver todas operacoes 

    static async todasOperacoes(req, res) {
        // tentar filtrar todas operações
        try {
            const operacoes = await Operacoes2.find().lean();
            res.status(200).json(operacoes);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // ver operacao individual
    static async operacaoIndividual(req, res) {
        // captando id de rota dinamica
        const id = req.params.idOperacao;
        // filtrando operação
        try {
            const operacao = await Operacoes2.findById(id);
            res.status(200).json(operacao);
        } catch (err) {
            res.status(500).json({ message: "operacao não existe" });
            return;
        }
    }
}