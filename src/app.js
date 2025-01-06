import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))// json file inpit

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))
app.use(cookieParser())


// routes import 
import userRouter from "./routes/user.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"
import bookRouter from "./routes/book.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/books",bookRouter)
app.use("/api/v1/transactions",transactionRoutes)
app.use("/api/v1/dashboard",dashboardRouter)

export {app}