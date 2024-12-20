import express from "express";
import { listarPosts, postarNovoPost } from "../controllers/post.Controller.js"; 

const routes = (app) => {
    app.use(express.json())

    // Rota para obter todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost);
}

export default routes;