import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import session from "express-session";
import userRoutes from "./routes/user.route.js"
import blogRouter from "./routes/blog.route.js";

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}))

app.use(express.json())  
app.use(express.urlencoded({ extended: true })) 

app.use(session({
    secret: process.env.SESSION_SECRET || "fallback-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use("/api/v1/users", userRoutes)

app.use("/api/v1/posts", blogRouter)

app.get('/', (req, res) => {
  res.send('Hello World!!!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost${port}`)
})


export {app}