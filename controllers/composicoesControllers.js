const Composicoes = require('../models/Composicoes');
const SerieTrens = require('../models/serieTrens');

module.exports = class composicoesControllers {
    // cadastrar composicoes

    static async cadastrarComposicao(req, res) {
        // captando dados do body
        const { prefixo, manutencao, operacao, serieTrens } = req.body;
        // verificando se campos existem
        if (!prefixo) {
            res.status(422).json({ message: "precisamos do prefixo para cadastrar a composição" });
            return;
        }
        if (!serieTrens) {
            res.status(422).json({ message: "precisamos do serieTrens para cadastrar a composição" });
            return;
        }
        if (manutencao === undefined) {
            res.status(422).json({ message: "precisamos do manutencao para cadastrar a composição" });
            return;
        }
        if (operacao === undefined) {
            res.status(422).json({ message: "precisamos do operacao para cadastrar a composição" });
            return;
        }
        // captando usuario logado
        const usuario = req.user;
        // captando a serie de trens
        const serie = await SerieTrens.findOne({ serie: serieTrens })
        // criando portótipo
        const prototipo = new Composicoes({
            prefixo,
            manutencao,
            operacao,
            serieTrens: {
                id: serie._id,
                linhaOperacao:serie.linhaOperacao._id
            },
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                funcao: usuario.funcao
            }

        })
        // tentando salvar o portotipo
        try {
            const novaComposicao = await prototipo.save();
            res.status(200).json({ message: "Composição cadastrada com uscesso" });

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // remover composicoes
    static async removerComposicao(req, res) {

        // captando id de rota dinamica

        const id = req.params.idComposicao;

        // verificando se composição existe

        const composicao = await Composicoes.findById(id);

        if (!composicao) {
            res.status(422).json({ message: "Composição não existe" });
            return;
        }

        // tentando deletar composição
        try {
            await Composicoes.deleteOne({ _id: id });
            res.status(200).json({ message: "composição deletada com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }


    }
    // alterar composicoes

    static async alterarComposicao(req, res) {
        // captando id de rota dinamica

        const id = req.params.idComposicao;

        // verificando se composição existe

        const composicao = await Composicoes.findById(id);

        if (!composicao) {
            res.status(422).json({ message: "Composição não existe" });
            return;
        }


        // captando dados do body
        const { prefixo, manutencao, operacao } = req.body;
        // verificando se campos existem
        if (!prefixo) {
            res.status(422).json({ message: "precisamos do prefixo para cadastrar a composição" });
            return;
        }

        if (manutencao === undefined) {
            res.status(422).json({ message: "precisamos do manutencao para cadastrar a composição" });
            return;
        }
        if (operacao === undefined) {
            res.status(422).json({ message: "precisamos do operacao para cadastrar a composição" });
            return;
        }
        // criando prototipo

        const prototipo = {
            prefixo,
            manutencao,
            operacao

        }

        // tentando atualizar
        try {
            await Composicoes.updateOne({ _id: id }, prototipo);
            res.status(200).json({ message: "composição atualizada com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    // ver composicoes por usuario

    static async composicoesPorUsuario(req, res) {
        // captar o usuario
        const usuario = req.user;
        console.log(usuario);
        // tentar filtrar 
        try {
            const composicoes = await Composicoes.find({ 'usuario.id': usuario.id });
            console.log(composicoes);
            res.status(200).json(composicoes);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // ver todas composicoes 
    static async todasComposicoes(req, res) {
        // filtrando todas composições
        try {
            const composicoes = await Composicoes.find().lean();
            res.status(200).json(composicoes);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    // ver composicao individual

    static async composicaoIndividual(req, res) {
        // captando id de rota dinamica
        const id = req.params.idComposicao;
        // verificando se composição existe

        const composicao = await Composicoes.findById(id);

        if (!composicao) {
            res.status(422).json({ message: "Composição não existe" });
            return;
        }

        // filtrando composição individual
        try {
            res.status(200).json(composicao);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }


    }
    // filtrar por status de manutencao

    static async statusManutencao(req, res) {
        // captando status de body
        const { manutencao } = req.body;

        // checando se existe o campo
        if (manutencao === undefined) {
            res.status(422).json({ message: "Precisamos do status de manutenção para filtrar os dados" });
            return;
        }
        // tentando filtrar
        try {
            const composicoes = await Composicoes.find({ manutencao: manutencao });
            res.status(200).json(composicoes);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // filtrar por status de operacao
    static async statusOperacao(req, res) {
        // captando status de body
        const { operacao } = req.body;

        // checando se existe o campo
        if (operacao === undefined) {
            res.status(422).json({ message: "Precisamos do status de operacao para filtrar os dados" });
            return;
        }
        // tentando filtrar
        try {
            const composicoes = await Composicoes.find({ operacao: operacao });
            res.status(200).json(composicoes);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // mandar composicao para manutencao
    static async iniciarManuntencao(req, res) {
        // captando id de rota dinamica
        const id = req.params.idComposicao;
        // verificando se composição existe

        const composicao = await Composicoes.findById(id);

        if (!composicao) {
            res.status(422).json({ message: "Composição não existe" });
            return;
        }

        // criar portotipo

        const prototipo = {
            manutencao: true,
            operacao: false
        }
        // tentar iniciar manunteção
        try {
            await Composicoes.updateOne({ _id: id }, prototipo);
            res.status(200).json({ message: "Composição foi para manutenção" })
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    // retirar composicao da manutencao
    static async finalizarManuntencao(req, res) {
        // captando id de rota dinamica
        const id = req.params.idComposicao;
        // verificando se composição existe

        const composicao = await Composicoes.findById(id);

        if (!composicao) {
            res.status(422).json({ message: "Composição não existe" });
            return;
        }

        // criar portotipo

        const prototipo = {
            manutencao: false,
            operacao: true
        }
        // tentar iniciar manunteção
        try {
            await Composicoes.updateOne({ _id: id }, prototipo);
            res.status(200).json({ message: "Composição finalizou manutenção" })
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    
    
}