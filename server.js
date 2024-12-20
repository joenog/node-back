import express from "express";
import routes from "./src/routes/post.routes.js";

const app = express();
routes(app);

// Define a porta do servidor
app.listen(3000, () => {
    console.log("Server listening on port 3000...");
});