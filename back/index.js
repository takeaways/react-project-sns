const express = require('express');
const app = express();
const path = require('path')
const db = require('./models');
db.sequelize.sync();
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const hashtagAPIRouter = require('./routes/hashtag');

app.use(morgan('dev'));
app.use('/',express.static('uploads'));
app.use(cors({
  origin:true,
  credentials:true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  scret:process.env.COOKIE_SECRET,
  cookie:{
    httpOnly:true, //자바스크립트로 쿠키 접근 불가능
    secure:false, //https 사용할때 true
  },
  name:'rswdj'
}));
app.use(express.json());//json 형식의 본문 . 폼 처리
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());


//API는 다른 서비스가 내 서비스의 기능을 실행할 수있게 열어둔 창구
app.use('/api/user',userAPIRouter);
app.use('/api/post',postAPIRouter);
app.use('/api/posts',postsAPIRouter);
app.use('/api/hashtag',hashtagAPIRouter);




app.listen(3065, ()=>{
  console.info(`Server is running on localhost:3065`);
})
