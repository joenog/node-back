import { getTodosPosts, criarPost, atualizarPost } from "../models/post.Model.js";
import gerarDescricaoComGemini from "../services/geminiService.mjs"
import fs from "fs";

// Função para listar todos os posts
export async function listarPosts(req, res) { 
        // Chama a função do modelo para buscar todos os posts
        const posts = await getTodosPosts(); 
        // Envia os posts como resposta em formato JSON com status 200 (sucesso)
        res.status(200).json(posts);
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
        // Obtém os dados do novo post a partir do corpo da requisição
        const novoPost = req.body;
        try {
                // Chama a função do modelo para criar o novo post
                const postCriado = await criarPost(novoPost); 
                // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
                res.status(200).json(postCriado);
        } catch (error) {
                // Registra o erro no console para depuração
                console.error(error.message);
                // Envia uma mensagem de erro genérica ao cliente com status 500 (erro interno do servidor)
                res.status(500).json({"erro": "Falha na requisição."});
        }
}

// Função para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
        // Cria um objeto com os dados do novo post, incluindo o nome original do arquivo
        const novoPost = {
                descicao: "",
                imgUrl: req.file.originalname,
                alt: ""
        }

        try {
                // Chama a função do modelo para criar o novo post
                const postCriado = await criarPost(novoPost); 
                // Constrói o novo nome do arquivo com o ID do post inserido
                const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
                // Renomeia o arquivo para o novo nome
                fs.renameSync(req.file.path, imagemAtualizada)
                // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
                res.status(200).json(postCriado);
        } catch (error) {
                // Registra o erro no console para depuração
                console.log(error.message);
                // Envia uma mensagem de erro genérica ao cliente com status 500 (erro interno do servidor)
                res.status(500).json({"erro": "Falha na requisição."});
        }
}

export async function atualizarNovoPost(req, res) {
        const id = req.params.id;
        const urlImagem = `http://localhost:3000/${id}.png`

        try {
              const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
              const descricao = await gerarDescricaoComGemini(imgBuffer);
              
              const post = {
                      imgUrl: urlImagem,
                      descricao: descricao,
                      alt: req.body.alt
                }
                
              postCriado = await atualizarPost(id, post);
              res.status(200).json(postCriado);  

        } catch (error) {
                console.log(500).json(error);
        }
}