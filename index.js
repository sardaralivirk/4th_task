const db=require('./database/connect_db');
const express=require('express')
const UserSchema=require('./model/userSchema')
const UserPostSchema=require('./model/userPostSchema')
const userRouter=require('./route/allRoutes')
const app = express();
app.use(express.json())
app.use('/',userRouter)








const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});




