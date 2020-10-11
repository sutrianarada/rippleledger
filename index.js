const express =  require("express");
const { json, urlencoded }= require('body-parser');
const app = express();
const port = 3000;
const { join, resolve } =  require('path');
const fs = require('fs')
const {exec} = require('child_process');
const { body } =  require ('express-validator');
const {validationResult} = require('express-validator');
const { rejects } = require("assert");

app.use(express.json())
app.use(
  urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const userSanitizeResponse = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(422).json({ errors: errors.mapped() });
  } else{
    return true
  }
}

async function runTools (index,site) {
  let comandstr = `npm run fetch ${index} ${site}`  //run the tools comand
  console.log(comandstr)
  return new Promise ((resolve, rejects) => {
    exec( comandstr, function (err, stdout, stderr){
      if(err){
        console.log(err)
        response.status(200).send(err)
      }
      resolve(stdout? stdout: stderr)
    })
  })
  }


  // try {
  //   exec( comandstr, function (err, stdout, stderr){
  //     if(err){
  //       console.log(err)
  //       response.status(200).send(err)
  //     }
  //     console.log(stdout);
  //     console.log(stderr);
  //   })
  // }
  // catch(err){
  //   response.status(400).send(err)
  // }


async function readData (request,response) {
  if (userSanitizeResponse(request, response)==true) {
    const {index, site} = request.body
    //console.log(index)
    //call the run function.
    await runTools(index, site)
    let locate = './data/'+index+'.json';
    //console.log(locate)
    let filePath = join(__dirname, locate)
    //console.log(filePath)
    fs.readFile(filePath, 'utf8', function (err,data) {//read the tools result
      if (err) {
        response.status(400).send(err);
      }
      response.status(200).send(data);
    })
  }
}

app.post('/fetch',[body('index').not().isEmpty(),body('site').not().isEmpty()],readData)

app.post('/fetchwithsite', [body('index').not().isEmpty(),body('site').not().isEmpty()] ,(req,res) => {
  //same as above but with site
} )