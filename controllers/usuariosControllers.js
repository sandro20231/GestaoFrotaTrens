const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const criarToken = require('../helpers/criarToken');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

module.exports = class usuariosControllers {
    // cadastrar usuario - gerente
    static async criar(req, res) {
        const { nome, email, funcao, senha, confirmacaoSenha } = req.body;
        //  verificação de campos
        if (!nome) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos do nome do novo usuário" });
            return;
        }

        if (!email) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos do email do novo usuário" });
            return;
        }
        if (!funcao) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos do funcao do novo usuário" });
            return;
        }
        if (!senha) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos da senha do novo usuário" });
            return;
        }
        if (!confirmacaoSenha) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos da confirmacaoSenha do novo usuário" });
            return;
        }

        // o email ja esta em uso?

        const userExists = await Usuarios.findOne({ email: email });

        if (userExists) {
            res.status(422).json({ message: "Não é possível continuar o cadastro pois o E-mail já está sendo usado por outro usuário" });
            return;
        }



        // senha e confirmação de senha são iguais?

        if (senha !== confirmacaoSenha) {
            res.status(422).json({ message: "senha e confirmacao de senha diferentes, digite de novo por favor" });
            return;
        }

        // criptografando senha

        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(senha, salt);

        // criando objeto de usuario

        const prototipo = new Usuarios({
            nome,
            email,
            funcao,
            senha: hash
        });

        // cadastrando usuário

        try {
            const novoUsuario = prototipo.save();
            return await criarToken(novoUsuario, req, res);
        } catch (err) {
            res.status(500).json({ message: err });

        }
    }
    // ver usuario 
    static async verUsuario(req, res) {
        const id = req.params.id;

        try {
            const usuario = await Usuarios.findById(id);
            res.status(200).json(usuario);
        } catch (err) {
            res.status(500).json({ message: err });
            return;
        }
    }
    // ver todos usuarios - gerente

    static async todosUsuarios(req, res) {
        try {
            const usuarios = await Usuarios.find().lean();
            res.status(200).json(usuarios);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // remover usuario - gerente
    static async remover(req, res) {
        const id = req.params.id;

        const usuario = await Usuarios.findById(id);

        if (!usuario) {
            res.status(200).json({ message: "Este usuário não existe mais" });
            return;
        }

        try {
            await Usuarios.deleteOne({ _id: id });
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // login
    static async login(req, res) {
        const { email, senha } = req.body;

        // verificando campos

        if (!email) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos do email do novo usuário" });
            return;
        }
        if (!senha) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos da senha do novo usuário" });
            return;
        }

        // verificando se o e-mail existe

        const userExists = await Usuarios.findOne({ email: email });

        if (!userExists) {
            res.status(422).json({ message: "Nenhum usuário cadastrado com este E-mail" });
            return;
        }

        // verificando se a senha digitada corresponde a senha do userExists

        const compare = await bcrypt.compare(senha, userExists.senha);

        if (!compare) {
            res.status(422).json({ message: "Senha incorreta, digite de novo por favor" });
            return;
        }

        // Fazendo login

        try {
            await criarToken(userExists, req, res);
        } catch (err) {
            res.status(500).json({ message: err });
            return;
        }

    }

    // alterar - gerente

    static async alterar(req, res) {

        const id = req.params.id;

        const usuario = await Usuarios.findById(id);

        if (!usuario) {
            res.status(422).json({ message: "usuário não existe" });
            return;
        }
        const { nome, email, funcao, senha, confirmacaoSenha } = req.body;

        if (!nome) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos do nome do novo usuário" });
            return;
        }

        if (!email) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos do email do novo usuário" });
            return;
        }
        if (!funcao) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos do funcao do novo usuário" });
            return;
        }
        if (!senha) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos da senha do novo usuário" });
            return;
        }
        if (!confirmacaoSenha) {
            res.status(422).json({ message: "para efetuar o cadastro precisamos da confirmacaoSenha do novo usuário" });
            return;
        }

        if (senha !== confirmacaoSenha) {
            res.status(422).json({ message: "senha e confirmacao de senha diferentes, digite de novo por favor" });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(senha, salt);

        const prototipo = {
            nome,
            email,
            funcao,
            senha: hash
        }

        try {
            await Usuarios.updateOne({ _id: id }, prototipo);
            res.status(200).json({ message: "usuario alteardo com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }

}