import {all, fork, put, takeLatest, takeEvery, call, take, delay} from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE
} from '../reducers/user';
import axios from 'axios';

const dummy = {
  nickname:"GEONIL",
  Post:[],
  Followings:[],
  Followers:[],
  signUpData:{},
  id:1
}

axios.defaults.baseURL ="http://localhost:3065/api";
//이벤트 리스너
function* watchLogin(){
  yield takeLatest(LOG_IN_REQUEST, login);
}

function loginAPI(loginData){
  //서버에 요청을 보내는 부분
  return axios.post('/user/login', loginData, {
    withCredentials:true,
  });
}

//핸들러
function* login(action){
  try{
    const result = yield call(loginAPI, action.data);
    yield put({// dispatch
      type:LOG_IN_SUCCESS,
      data:result.data
    })
  }catch(e){
    console.error(e);
    yield put({
      type:LOG_IN_FAILURE,
      data:"로그인실패"
    });
  }
}



function* watchSignUp(){
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function signUpAPI(signUpData){
  return axios.post('/user/', signUpData);
}

function* signUp(action){
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type:SIGN_UP_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:SIGN_UP_FAILURE,
      data:'가입실패'
    })
  }
}

function* watchLogOut(){
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function logOutAPI(){
  return axios.post('/user/logout',{},{
    withCredentials:true,
  });
}

function* logout(){
  try{
    yield call(logOutAPI);
    yield put({
      type:LOG_OUT_SUCCESS,
    })
  }catch(e){
    yield put({
      type:LOG_OUT_REQUEST,
      error:e
    })
  }
}

function* watchLoadUser(){
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function loadUserAPI(userId){
  return axios.get(userId ? `/user/${userId}` : `/user/`, {
    withCredentials:true,
  });
}

function* loadUser(action){
  try{
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type:LOAD_USER_SUCCESS,
      data:result.data,
      me:!action.data,
    })
  }catch(e){
    yield put({
      type:LOAD_USER_FAILURE,
      error:e
    })
  }
}

//이벤트 등록
export default function* userSaga(){
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadUser),
  ])
}
