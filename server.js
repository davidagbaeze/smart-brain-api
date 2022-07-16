const express = require('express')
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt');
const register = require('./controller/register');
const signin = require('./controller/signin');
const image = require('./controller/image');
const profile = require('./controller/profile');
const saltRounds = 10;


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'Developer00#',
    database : 'smart-brain'
  }
});


const server = express();

server.use(cors())
server.use(express.json())


server.get('/', (req, res)=>{res.json('It is working')})

server.post('/signin', (req, res)=> {signin.handleSignin(req, res, db, bcrypt)})
server.post('/register', (req, res)=> {register.handleRegister(req,res,db, bcrypt, saltRounds)})
server.get('/profile/:id', (req, res)=> {profile.handleProfile(req, res, db)})
server.put('/image', (req, res) => {image.handleImage(req, res, db)})
server.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


server.listen(process.env.PORT|| 3000, ()=> {
  console.log(`app is running in port ${process.env.PORT}`)
})