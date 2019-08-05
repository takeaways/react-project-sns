import { all, call, put, takeLatest, takeEvery, fork, delay} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_POSTS_REQUEST,
  ADD_POSTS_SUCCESS,
  ADD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_HASH_POSTS_REQUEST,
  LOAD_HASH_POSTS_SUCCESS,
  LOAD_HASH_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_SUCCESS,
  REMOVE_IMAGE
} from '../reducers/post'

function* watchAddPost(){
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addPostAPI(postData){
  return axios.post('/post', postData, {
    withCredentials:true,
  });
}

function* addPost(action){
  try {
    const result = yield call(addPostAPI, action.data)
    console.log(result);
    yield put({
      type:ADD_POST_SUCCESS,
      data:result.data,
    })
  } catch (e) {
    yield put({
      type:ADD_POST_FAILURE,
      error:e
    })
  }
}

function* watchAddComment(){
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function addCommentAPI(data){
  return axios.post(`/post/${data.postId}/comment`, {comment:data.comment}, {
    withCredentials:true,
  })
}
function* addComment(action){
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type:ADD_COMMENT_SUCCESS,
      data:{
        postId:action.data.postId,
        comment:result.data
      }
    })
  } catch (e) {
    console.error(e);
    yield put({
      type:ADD_COMMENT_FAILURE,
      error:e
    })
  }
}


function* watchLoadMainPosts(){
  yield takeEvery(LOAD_MAIN_POSTS_REQUEST, loadPosts);
}

function loadMainPostsAPI(){
  return axios.get('/posts');
}

function* loadPosts(){
  try {
    const result = yield call(loadMainPostsAPI)

    yield put({
      type:LOAD_MAIN_POSTS_SUCCESS,
      data:result.data,
    })
  } catch (e) {
    yield put({
      type:LOAD_MAIN_POSTS_FAILURE,
      error:e
    })
  }
}

function* watchLoadHashtagPosts(){
  yield takeLatest(LOAD_HASH_POSTS_REQUEST, loadHashtagPosts);
}

function loadHashtagPostsAPI(tag){
  return axios.get(`/hashtag/${tag}`);
}

function* loadHashtagPosts(action){
  try {
    const result = yield call(loadHashtagPostsAPI, action.data);
    yield put({
      type:LOAD_HASH_POSTS_SUCCESS,
      data:result.data,
    })
  } catch (e) {
    yield put({
      type:LOAD_HASH_POSTS_FAILURE,
      error:e
    })
  }
}

function* watchLoadUserPosts(){
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function loadUserPostsAPI(id){
  return axios.get(`/user/${id}/posts`);
}

function* loadUserPosts(action){
  try {
    const result = yield call(loadUserPostsAPI, action.data)
    yield put({
      type:LOAD_USER_POSTS_SUCCESS,
      data:result.data,
    })
  } catch (e) {
    yield put({
      type:LOAD_USER_POSTS_FAILURE,
      error:e
    })
  }
}

function* watchLoadComments(){
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

function loadCommentsAPI(postId){
  return axios.get(`/post/${postId}/comments`);
}

function* loadComments(action){
  try {
    const result = yield call(loadCommentsAPI, action.data);
    yield put({
      type:LOAD_COMMENTS_SUCCESS,
      data:{
        postId:action.data,
        comments:result.data,
      }
    })
  } catch (e) {
    console.error(e);
    yield put({
      type:LOAD_COMMENTS_FAILURE,
      error:e
    })
  }
}


function* watchUploadImages(){
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function uploadImagesAPI(formData){
  console.log(formData);
  return axios.post(`/post/images`, formData, {
    withCredentials:true,
  });
}

function* uploadImages(action){
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type:UPLOAD_IMAGES_SUCCESS,
      data:result.data
    })
  } catch (e) {
    console.error(e);
    yield put({
      type:UPLOAD_IMAGES_FAILURE,
      error:e
    })
  }
}

export default function* postSaga(){
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadComments),
    fork(watchLoadMainPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
    fork(watchUploadImages),
  ])
}
