import express from "express";
import path, { dirname } from "path";
import authRoutes from './route/authRoutes.js'
import todoRoutes from './route/todoRoutes.js'
import authMiddleware from "./middleware/authMiddleware.js";
const app = express();
const PORT = process.env.PORT || 5003;


// ^ Middleware
app.use(express.static("public"));
app.use(express.json());

// ^ send back a static file 
app.get("/", (req, res) => {
  console.log("hello");
  res.sendFile("../public/index.html");
});

app.use( '/auth', authRoutes)
app.use( '/todos',authMiddleware, todoRoutes )

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});
