import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {LOG_IN_REQUEST} from '../reducers/user';
import {LOAD_MAIN_POSTS_REQUEST} from '../reducers/post';


const Home = () => {
  const dispatch = useDispatch();

  const {user ,me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  useEffect(()=>{
    dispatch({
      type:LOAD_MAIN_POSTS_REQUEST,
    })
  },[]);

  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map((c,i)=>{
          return (
            <PostCard key={i} post={c}/>
          )
      })}
    </div>
  )
}

export default Home;
