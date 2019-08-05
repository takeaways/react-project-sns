const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');
const passport = require('passport');
const {isLoggedIn} = require('./middleware')



router.get('/',isLoggedIn, async (req, res)=>{
  const fullUser = await db.User.findOne({
    where:{id : req.user.id},
    include:[{
      model:db.Post,
      as:'Posts',
    },{
      model:db.User,
      as:'Followers',
      attributes:['id']
    },{
      model:db.User,
      as:'Followings',
      attributes:['id']
    }],
    attributes:['id','nickname','userId'],
  });
  return res.json(fullUser);
});

router.post('/', async (req, res, next)=>{
  try {
    const exUser = await db.User.findOne({
      where:{
        userId:req.body.userId,
      },
    });
    if(exUser) return res.status(403).send('이미 사용중인 아이디 입니다.');
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    console.log(hashedPassword);
    const newUser = await db.User.create({
      nickname:req.body.nickname,
      userId:req.body.userId,
      password:hashedPassword,
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    //에러처리를 여기서
    return next(e); //알아서 프론트에 에러가 났다고 알려줍니다.
  }
});
router.get('/:id', async (req, res)=>{
  try {
    const user = await db.User.findOne({
      where:{id:parseInt(req.params.id)},
      include:[{
        model:db.Post,
        as:'Posts',
        attributes:['id']
      },
      {
        model:db.User,
        as:'Followings',
        attributes:['id']
      },
      {
        model:db.User,
        as:'Followers',
        attributes:['id']
      }
    ],
      attributes:['id','nickname']
    })
    const jsonUser = user.get({plain:true})
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    return res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  } finally {

  }
});
router.post('/logout',(req, res)=>{
  req.logout();
  req.session.destroy();
  res.send('logout success');
});
router.post('/login', (req, res, next)=>{
          //LocalStrategy 시작됩니다.
  passport.authenticate('local', (err, user, info) => {
    if(err){
      console.error(err);
      return next(err);
    }
    if(info){
      console.log(info);
      return res.status(401).send(info.reason);
    }
          //req.login => serialzeUser 가 실행됩니다.
    return req.login(user, async (loginErr)=>{
      if(loginErr){
        return next(loginErr);
      }
      const fullUser = await db.User.findOne({
        where:{id : user.id},
        include:[{
          model:db.Post,
          as:'Posts',
        },{
          model:db.User,
          as:'Followers',
          attributes:['id']
        },{
          model:db.User,
          as:'Followings',
          attributes:['id']
        }],
        attributes:['id','nickname','userId'],
      });
      return res.json(fullUser);
    });
  })(req, res, next);
});
router.get('/:id/follow', (req, res)=>{

});
router.post('/:id/follow', (req, res)=>{

});
router.delete('/:id/follow', (req, res)=>{

});
router.delete('/:id/follower', (req, res)=>{

});
router.get('/:id/posts', async (req, res, next)=>{
  try {
    const posts = await db.Post.findAll({
      where:{
        UserId:parseInt(req.params.id),
        RetweetId:null,
      },
      include:[{
        model:db.User,
        attributes:['id','nickname']
      }]
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});


module.exports = router;
