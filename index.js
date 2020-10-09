const express =  require("express");
const { json, urlencoded }= require('body-parser');
const app = express();
const port = 3000;
const { path } =  require('path');
const fs = require('fs')
const {exec} = require('child_process');

app.use(json())
app.use(
  urlencoded({
    extended: true,
  })
)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

async function runTools (index,site) {
  //if site not null
  let comandstr = 'npm fetch ' + index 
  try {
    exec( comandstr, function (err, stdout, stderr){

    })
  }
  catch(err){
    
  }
}

app.post('/fetch',[body('index').not().isEmpty()],(req,res) => {
  let index = req.body
  //add the run function.
  let filePath = path.join(__dirname, './data')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      res.stauts(400).send(err);
    }
    res.stauts(200).send(data);
  })
} )

app.post('/fetchwithsite', body('index').not().isEmpty(),body('site').not().isEmpty() ,(req,res) => {
  
} )