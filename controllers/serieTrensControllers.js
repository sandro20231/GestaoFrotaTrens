const SerieTrens = require('../models/serieTrens');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

const Linhas = require('../models/Linhas');


module.exports = class serieTrensControllers {
    // cadastrar series
    static async cadastrarSeries(req, res) {
        // captando campos do body
        const { serie, fabricante, anoFabricacao, linha } = req.body;
        // checando se os campos existe
        if (!serie) {
            res.status(422).json({ message: "precisamos do campo serie para continuar o cadastro" });
            return;
        }
        if (!fabricante) {
            res.status(422).json({ message: "precisamos do campo fabricante para continuar o cadastro" });
            return;
        }
        if (!anoFabricacao) {
            res.status(422).json({ message: "precisamos do campo anoFabricacao para continuar o cadastro" });
            return;
        }
        if (!linha) {
            res.status(422).json({ message: "precisamos do campo linha para continuar o cadastro" });
            return;
        }
        // captando usuario logado
        const token = getToken(req);
        const user = await getUserByToken(token);

        // criando portotipo

        const linhaUtilizacao = await Linhas.findOne({ numero: linha });

        // checando se a linha de utilizacao existe

        if (!linhaUtilizacao) {
            res.status(422).json({ message: "A linha digitada nãoe xiste" });
            return;
        }

        const prototipo = new SerieTrens({
            serie,
            fabricante,
            anoFabricacao,
            linhaOperacao: linhaUtilizacao,
            usuario: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                funcao: user.funcao
            }

        })

        // tentando salvar nova serie

        try {
            const novaSerie = await prototipo.save();
            res.status(200).json({ message: "nova série de trens cadastrada com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // remover series
    static async removerSerie(req, res) {
        // captando id de rota dinamica
        const id = req.params.idSerie;

        // checando se série existe
        const serie = await SerieTrens.findById(id);

        if (!serie) {
            res.status(422).json({ message: "esta série de trens não existe" });
            return;
        }

        // tentando remover série de trens
        try {
            await SerieTrens.deleteOne({ _id: id });
            res.status(200).json({ message: "Série de trem removida com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    // alterar series 

    // Observacao: como cada série só pode estar em uma linha, não teria lógica poder alterar a linha da série então este campo
    // não está disponível na atualziação de série
    static async alterarSerie(req, res) {

        // captando campos do body
        const { serie, fabricante, anoFabricacao } = req.body;
        // checando se os campos existe
        if (!serie) {
            res.status(422).json({ message: "precisamos do campo serie para continuar o cadastro" });
            return;
        }
        if (!fabricante) {
            res.status(422).json({ message: "precisamos do campo fabricante para continuar o cadastro" });
            return;
        }
        if (!anoFabricacao) {
            res.status(422).json({ message: "precisamos do campo anoFabricacao para continuar o cadastro" });
            return;
        }


        // captando id de rota dinamica
        const id = req.params.idSerie;

        // checando se série existe
        const serieExists = await SerieTrens.findById(id);

        if (!serieExists) {
            res.status(422).json({ message: "esta série de trens não existe" });
            return;
        }

        // criando portotipo

        const prototipo = {
            serie,
            fabricante,
            anoFabricacao
        }

        // tentando alterar

        try {
            await SerieTrens.updateOne({ _id: id }, prototipo);
            res.status(200).json({ message: "Série de trens alterada com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    // ver series por usuario

    static async minhasSeries(req, res) {
        // captando usuario
        const usuario = req.user;
        console.log(usuario);
        // tentado filtrar series por usuário

        try {
            const series = await SerieTrens.find({ 'usuario.id': usuario._id });
            console.log(series);
            res.status(200).json(series);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // ver todas series
    static async todasSeries(req, res) {
        // tentando buscar todas as series
        try {
            const series = await SerieTrens.find().lean();
            res.status(200).json(series);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // ver serie individual

    static async serieIndividual(req, res) {
        // captando id de rota dinamica
        const id = req.params.idSerie;

        // checando se série existe
        const serieExists = await SerieTrens.findById(id);

        if (!serieExists) {
            res.status(422).json({ message: "esta série de trens não existe" });
            return;
        }

        // tentando filtrar serie individual
        try {
            res.status(200).json(serieExists);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    // filtrar por fabricante

    static async filtrarPorFabricante(req, res) {
        // captando campos do body
        const { fabricante } = req.body;

        // verificando se campo existe
        if (!fabricante) {
            res.status(422).json({ message: "preciso do campo fabricante para continuar o filtro" });
            return;
        }
        // tentando filtrar
        try {
            const series = await SerieTrens.find({ fabricante: fabricante });

            res.status(200).json(series);


        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    // filtrar por ano de fabricacao
    static async filtrarPorAno(req, res) {
        // captando campos do body
        const { anoFabricacao } = req.body;

        // verificando se campo existe
        if (!anoFabricacao) {
            res.status(422).json({ message: "preciso do campo anoFabricacao para continuar o filtro" });
            return;
        } ''
        // tentando filtrar
        try {
            const series = await SerieTrens.find({ anoFabricacao });

            res.status(200).json(series);


        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
}