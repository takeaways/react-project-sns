export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; // 액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'; // 액션의 이름
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'; // 액션의 이름
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';
export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';
export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';
export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';


export const initialState = {
  isLoggingOut:false,
  isLoggingIn:false,
  logInErrorReason:'',
  signedUp:false,
  isSigningUp:false,
  signUpErrorReason:'',
  logOutErrorReason:'',
  me:null,
  followingList:[],
  followerList:[],
  userInfo:null,
}


export const loginRequestAction = {
  type:LOG_IN_REQUEST,
  data:{
    nickname:'GeonilJang'
  }
};

export const logoutRequestAction = {
  type:LOG_OUT_REQUEST,
}

export const signUpRequestAction = (data) =>  {
  return {
    type:SIGN_UP_REQUEST,
    data:data,
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case LOG_IN_REQUEST:{
      return {
        ...state,
        isLoggingIn:true,
        logInErrorReason:'',
      }
    }
    case LOG_IN_SUCCESS:{
      return {
        ...state,
        isLoggingIn:false,
        me:action.data,
      }
    }
    case LOG_IN_FAILURE:{
      return {
         ...state,
       isLoggingIn:false,
       logInErrorReason:'실패야 일단은',
       me:null
      }
    }
    case LOG_OUT_REQUEST:{
      return {
        ...state,
        logOutErrorReason:'',
        isLoggingOut:true,
      }
    }
    case LOG_OUT_SUCCESS:{
      return {
        ...state,
        isLoggingOut:false,
        me:null,
      }
    }
    case LOG_OUT_FAILURE:{
      return {
        ...state,
        isLoggingOut:false,
        logOutErrorReason:action.error
      }
    }
    case SIGN_UP_REQUEST:{
      return {
        ...state,
        isSigningUp:true,
      }
    }
    case SIGN_UP_SUCCESS:{
      return {
        ...state,
        isSigningUp:false,
        signedUp:true,
      }
    }
    case SIGN_UP_FAILURE:{
      return {
        ...state,
        isSigningUp:false,
        signedUp:true,
        signUpErrorReason:action.data,
      }
    }
    case LOAD_USER_REQUEST:{
      return {
        ...state,
        signedUp:false,
      }
    }
    case LOAD_USER_SUCCESS:{
      if(action.me){
        return {
          ...state,
          me:action.data,
        }
      }
      return{
        ...state,
        userInfo:action.data,
      }
    }
    case LOAD_USER_FAILURE:{
      return {
        ...state,
      }
    }
    default:{
      return {...state}
    }
  }
};
