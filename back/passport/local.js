const passport = require('passport');
const {Strategy:LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'userId', //req.body. 속성값을 아래 id와 password로 하겠다
    passwordField: 'password'
  }, async (userId, password, done) => {
    try{
      const user = await db.User.findOne({
        where:{userId}
      });
      if(!user){
              //서버에러, 성공,   로직에러
        return done(null, false, {reason:'존재하지 않는 사용자입니다!!'});
      }
      const result = await bcrypt.compare(password, user.password);
      if(result){
        return done(null, user);
      }
      return done(null, false, {reason:'비밀번호가 틀립니다.'});
    }catch(e){
      console.error(e);
      return done(e)
    }
  }));
}
