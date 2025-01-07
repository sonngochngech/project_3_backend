import express, { Request } from 'express';
import router from './router';
import { connectDB } from "./config/mongodb";
import cors from 'cors';


const app = express();
const port = 8082;
app.use(express.json());
app.use(cors<Request>())

app.use('/api/v1',router);

connectDB().then(()=>{
    console.log("Connected to database");
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export {app}


