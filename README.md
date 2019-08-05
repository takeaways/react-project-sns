# express-sns-service

1. [Front] React, Next(검색엔진 최적화/서버사이드렌더링/코드스플릿팅)[리엑트 프레임 워크], Redux, Redux-saga, StyledComponent
2. [Back] Express, MySql, ORM, Passport, Multer, Socket.io

3. npm i react react-dom next
   npm i -D nodemon webpacks eslint

4. next 라우팅 => pages 폴더에서
5. ant design 사용해봅시다 npm i antd

6. 커스텀 훅 만들어 보고 form 구조를 만들어 보아요
 useCallback 으로 이벤트 리스너 감싸주기
 : props로 넘겨주는 함수는 useCallback은 필수!

7. _app.js로 로레이아웃 분리하기 (부모가 된다)
{Component}로 전달 받아요 <Component/>로 사용
___

8. prop-types : npm i prop-types

9. 리덕스 npm i redux react-redux
<pre>
  <code>
    변경될 여지가 있는 데이터는 => State!!
    여기 저기에 있는 스테이트를 관리하기 위해서 사용!

    [중앙 통제: 리덕스 - 스테이트 역할을 한다]
    = 안정성, state통제 용이
    {
      isLoggedIn:false, -> A, C
      user:{}, -> B, C
      mainPost:[] -> C
    }------------------------------------>[ store : states ]

    Action -> state를 바꾸는 행동 ex) 로그인액션
    Dispatch -> Action을 실행 ex) 로그인 앤션 Dispatch
    Reducer -> Action의 결과로 state를 어떻게 바꿀지 정의
    ex) 로그인앤션 Dispatch -> isLoggedIn state를 true

    새로운 객체를 만들어 줘야지 스테이트가 달라 졌구나를 알 수 있다 -> 불변성 유지를 위해서 spread 문법을 많이 쓰나.. 가독성 문제가 딜 수 있다

    redux에서 제공하는 combineReducers를 사용하여 리듀서를 하나로 묵는다
  </code>
</pre>

10. redux와 react를 연결하기
<pre>
  <code>
    _app.js를 공유 하기 때문에 여기다 reducer를 연결 해준다.
    ___
    npm i next-redux-wrapper // store를 넘겨 주기위해서

    redux devtools 사용하기
  </code>
</pre>

11. react-redux 훅 npm i react-redux@next

12. 리덕스 사가 (제너레이터 사용)
<pre>
  <code>  
    리덕스는 모든게 동기로 이루어 진다!

    -> 서버쪽으로 데이터 전송
    -> 서버가 로그인 성공이라는 응답을 보내주고
    -> 그걸 다시 받아 로그인

    그렇기 때문에 리덕스 기능확장 ( 리덕스 비동기 요청이 필요 하다 )
    -> 리덕스 썽크, 사가, 옵저버블


                    -> success
    login[redux] -(비동기:saga)-|
                    -> failure

  </code>
</pre>

13. function* (){ yield} yield는 중단점. 객체 생성후 .next() 로 실행
yield* 는 뒤에 나오는 값을 iterable로 본다
<pre>
  <code>
    function* generator(){
      let i = 0;
      while(true){
        yield i++
      }
    }

    const gen = generator();
    gen.next() // +1


    call : 동기 , fork : 비동기
  </code>
</pre>

14. back 시작
<pre>
  <code>
    npm i express axios bcrypt cookie-parser express-session cors helmet hpp morgan multer passport mysql2 passport-local dotenv sequelize

    npm i -D nodemon
    npm i -g sequelize-cli
    nodemon.js
      {
        "watch":[
          "index.js"
          "routes",
          "config",
          "passport",
          "modules",
          "nodemon.json"
        ],
        "exec":"node index.js",
        "ext":"js json"
      }
  </code>
</pre>

15. HTTP 요청 주소 체계 이해하기 80/443
<pre>
  <code>
    프론트(요청)<-------------------->(응답)백엔드
    REST
      GET
      POST
      PUT : 전체수정
      PATCH: 부분수정
      DELETE
  </code>
</pre>

16. Sequelize ERD[관계도]
<pre>
  <code>
    sequelize init

    테이블 만들기!!
      models 내부에 설정 값을 확인 바랍니다.
      -> 다대다 관계에서는 중간에 테이블이 하나 더 생성됩니다. ,{through:'중간테이블'}

      User -> users 로 테이블이 생성됩니다.
  </code>
</pre>

17. API는 다른 서비스가 내 서비스의 기능을 실행할 수있게 열어둔 창구

18. 회원가입 라우터 만들어 보기
<pre>
  <code>
    Post /user -> 데이터 필요
     요청에 헤더(header)요청에 본분(body)같이 보낼 수 있음, 본문에다가 데이터를 널어서 보낸다.
    응답(response)
  </code>
</pre>

19. passport 프론트에 쿠키 / 서버에 세션 주기위해서
jwt가 무조건 좋은게 아니다.. 단점이 더 많다
<pre>
  <code>
    passport -> express session 하단에 존재 해야합니다.
  </code>
</pre>

20. next의 pages 라우터 만으로는 데이터 터리 한정정 이기 때문에 express를 연결해서 사용한다

21. 서버 사이드 렌더링과 라우팅
