import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/post.Controller.js";

const upload = multer({dest: "./uploads"});

const routes = (app) => {
    app.use(express.json())

    // Rota para obter todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost);
    // ROta para enviar imagem
    app.post("/upload", upload.single("imagem"), uploadImagem)
}

export default routes;