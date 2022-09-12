import express from "express";
const app = express();
import bodyParser from 'body-parser';
import multer from "multer";
const upload = multer();
import session from "express-session";
import cookieParser from "cookie-parser";

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

var Users = [];

app.get('/signup', function(req, res){
   res.render('signup');
});

app.post('/signup', function(req, res){
   if(!req.body.id || !req.body.password){
      res.status("400");
      res.send("Invalid details!");
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id){
            res.render('signup', {
               message: "User Already Exists! Login or choose another user id"});
         }
      });
      var newUser = {id: req.body.id, password: req.body.password};
      Users.push(newUser);
      req.session.user = newUser;
      res.redirect('/protected_page');
   }
});

app.listen(3000);