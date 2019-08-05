import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import PostCard from '../components/PostCard';
import {LOAD_HASH_POSTS_REQUEST} from '../reducers/post';

const Hashtag = ({tag}) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post)
  useEffect(() => {
    dispatch({
      type:LOAD_HASH_POSTS_REQUEST,
      data:tag,
    })
  },[]);

  return (
    <div>
      {mainPosts.map((c,i) => <PostCard key={i} post={c}/>)}
    </div>
  )
}

Hashtag.propTypes = {
  tag:PropTypes.string.isRequired,
}

Hashtag.getInitialProps = async (context) =>{
  const { tag } =  context.query
  return {tag}
};

export default Hashtag;
