const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const multer = require('multer');
const path = require('path');
const postRouter = require('./routes/postRoute');
const categoryRouter = require('./routes/categoryRouter');
const authRouter = require('./routes/authRouter');
const userRouter= require('./routes/userRouter');

const app = express();
app.use(cors());
app.use(express.json());




app.use("/images", express.static(path.join(__dirname, "/images")));
app.use('/posts', postRouter);
// app.use('/post',postRouter);
app.use('/categories', categoryRouter);
app.use('/auth', authRouter);
app.use('/users',userRouter);






const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use((req, res, next)=>{
    res.status(404).send({error:'API NOT SUPPORTED'})

})

app.use((err, req, res, next)=> {
    res.status(500).json(new Response(true, err.message, null));
});


mongoose.connect('mongodb://127.0.0.1:27017/myBlogDB',
  () => {
    app.listen(3002);
});
