// Example Express app skeleton
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Example protected route using APP_SECRET
app.get('/api/secret-info', (req,res)=>{
  const key = req.headers['x-app-key'];
  if(key !== process.env.APP_SECRET) return res.status(401).json({error:'unauthorized'});
  res.json({msg:'secret info placeholder'});
});

app.get('/api/products', (req,res)=>{
  // placeholder static products — replace with DB
  res.json([
    {id:'p1',name:'Product One',price:29},
    {id:'p2',name:'Product Two',price:49},
  ]);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log('Server listening on', port));
