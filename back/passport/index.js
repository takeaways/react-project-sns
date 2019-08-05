const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {

  //[1]로그인 할 때 서버쪽에 [{id:3, cookie:'ss1-@()'}]
  //그래서 어떤 user 인지 찾아 낸다
  passport.serializeUser((user, done)=>{
    return done(null, user.id);
  });

  //[2] 아이디를 토대로 디비에서 유저 정보를 불러온다
  //프론트에서 해당 쿠키가 넘어 오면!! 요기가 실행됩니다.
  passport.deserializeUser(async (id, done)=>{
    try {
      const user = await db.User.findOne({
        where:{
          id
        }
      });
      return done(null, user); // req.user에 정보가 저장된다
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();


}

//프론트에서 서버로는 쿠키만 보내주고
// 서버가 쿠키파서, 익스프레스 세션을 쿠키 검사후 id 발견
// id가 디시리얼라이유저로 들어감 (요청 보냉때마다 실행된다 : 실무에서는 캐싱한다)
// req.user 로 사용자 정보가 들어감
