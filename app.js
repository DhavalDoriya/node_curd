const express = require('express')
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-Parser");
const ejs = require("ejs");
const path = require('path')
const multer = require("multer")
const fs = require('fs');
const PORT = process.env.PORT || 8000;
const Todo = require('./models/todomodel');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
         // upload only png and jpg format
        //  return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 



app.post('/',imageUpload.single('image'),async (req,res)=>{
    const newtodo = new Todo({
        title : req.body.title,
        desc : req.body.desc,
        image :req.file.filename
    })
    const newto = await newtodo.save();
    const todo =  await Todo.find()
    res.status(201).render("onepage", {todo,todo , msg: `data added sucesfully` })  
})
app.get('/',  async(req,res)=>{
    try {
        const todo =  await Todo.find()
        res.render('onepage',{todo,todo , msg: `` })
        
    } catch (error) {
            res.send(error)
    }   

});
app.get('/show/:id',async (req,res)=>{
    const todoo = await Todo.findById(req.params.id)
    res.render('show',{todoo:todoo}) 
    // console.log(`images/${todo.image}`);
})

app.get('/delete/:id',async (req,res)=>{
    const onetodo = await Todo.findByIdAndDelete(req.params.id)
    // delete a file
    try {
    fs.unlinkSync(`public/images/${onetodo.image}`);
        //  console.log(`${onetodo.title} File is deleted.`);
    } catch (error) {
        console.log(error);
    }
    const todo =  await Todo.find()
    res.render('onepage', { todo:todo , msg: `data deleted` })
})

app.get('/edit/:id',async (req,res)=>{
    const todo = await Todo.findById(req.params.id)
    res.render('edit', { todo:todo })
})
app.post('/edit/:id',async (req,res)=>{
    const updateddata = {
        title:req.body.title,
        desc:req.body.desc
    }
    const updateddata1 = await Todo.findByIdAndUpdate(req.params.id,updateddata)
    const id = req.params.id
    res.redirect(`/show/${id}`)
})


app.listen(PORT, () => {
    console.log(`server is runiing at localhost:${PORT}`);
  })