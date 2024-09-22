    import bodyParser from 'body-parser';
    import express  from 'express';
    import { Authorize } from './middlewares';
    import users from "./routes/users"
    import comments from "./routes/comments"
    import mongoose from 'mongoose';
    import articles from "./routes/articles"
    import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
    const app  = express()
    const port =3001
    app.use(cors({origin:'http://localhost:3000',methods:["GET","POST","PUT","DELETE"],credentials:true}))
    app.use(bodyParser.json())
    app.use("/users",users)
    app.use("/articles",articles)
    app.use("/comments",comments)
  


    console.log(process.env.MONGODB_URI)
    const mongoUri = process.env.MONGODB_URI as string;

    mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
    
    app.listen(port, () => {
        console.log(`listening`)
    })