const express = require('express')
const app = express();
const bodyParser = require("body-Parser");
const ejs = require("ejs");
const path = require('path')
const fs = require('fs');
const PORT = process.env.PORT || 8000;
const Todo = require('./models/todomodel');
const imageUpload = require('./middleware/multer')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
    const user = await Todo.findById(req.params.id)
 
    res.render('profile',{user}) 
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
    res.render('onepage', { msg: `data deleted` , todo:todo })
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