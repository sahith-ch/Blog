import bodyParser from 'body-parser';
import express  from 'express';
import { Authorize } from './middlewares';
import users from "./routes/users"
import comments from "./routes/comments"
import mongoose from 'mongoose';
import articles from "./routes/articles"
import cors from "cors"
const app  = express()
const port =3001
app.use(cors({origin:'http://localhost:3000',methods:["GET","POST","PUT","DELETE"],credentials:true}))
app.use(bodyParser.json())
app.use("/users",users)
app.use("/articles",articles)
app.use("/comments",comments)
app.listen(port, () => {
    console.log(`listening`)
})
mongoose.connect(process.env.MONGODB_URI?process.env.MONGODB_URI:"")
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
