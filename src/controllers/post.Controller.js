import { getTodosPosts, criarPost } from "../models/post.Model.js";

export async function listarPosts(req, res) { 
        // Chama a função para obter os posts
        const posts = await getTodosPosts(); 
        // Envia os posts como resposta para o cliente
        res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
        const novoPost = req.body;
        try {
                const postCriado = await criarPost(novoPost); 
                res.status(200).json(postCriado);
        } catch (error) {
                console.log(error.message);
                res.status(500).json({"erro": "Falha na requisição."});
        }
}