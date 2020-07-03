//import the modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false})
);
mongoose.connect('mongodb+srv://ManideepN:mani123@demo-rxar9.mongodb.net/Web?retryWrites=true&w=majority')
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

var apiRouter = require('./Routes/route');

const port = process.env.PORT || 8080;
app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port,()=>{
  console.log('server started at port '+ port);
});
