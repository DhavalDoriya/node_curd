const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true ,useUnifiedTopology : true ,useCreateIndex:true,useFindAndModify: false }).then(()=>{
    console.log('connection sucessful');
}).catch((e)=>{
    console.log(`no connection becouse ${e}`);
});
// module.exports = mongoose.connect;
module. exports = exports = mongoose; 