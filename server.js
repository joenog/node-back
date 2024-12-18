import express, { json } from "express"; // Importa o framework Express e a função "json" para manipular dados em formato JSON.
import conectarAoBanco from "./src/config/dbconfig.js"; // Importa a função "conectarAoBanco" do arquivo de configuração do banco de dados.

// Conecta ao banco de dados usando a string de conexão definida na variável de ambiente "STRING_CONEXAO".
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const app = express(); // Cria uma instância do servidor usando o framework Express.

/*
const posts = [
    {
        id: 1,
        name: "jhon",
        age: 28,
    },
    {
        id: 2,
        name: "maria",
        age: 19
    },
]; 
*/
// Comentado: Este trecho é um exemplo de dados fictícios estáticos para ilustrar como os posts poderiam ser representados.

// Configura o servidor para ouvir na porta 3000 e exibe uma mensagem no console ao iniciar.
app.listen(3000, () => {
    console.log("Server listening...");
});

// Função assíncrona para obter todos os posts armazenados na coleção "posts" do banco de dados.
async function getTodosPosts() {
    const db = conexao.db("imersao-instabyte"); // Acessa o banco de dados "imersao-instabyte".
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
    return colecao.find().toArray(); // Retorna todos os documentos da coleção "posts" como um array.
}

// Rota HTTP GET para "/posts". Quando chamada, retorna todos os posts do banco de dados.
app.get("/posts"), async (req, res) => {
    const posts = await getTodosPosts(); // Obtém todos os posts do banco de dados usando a função "getTodosPo
}
/*function buscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id);
    })
}*/