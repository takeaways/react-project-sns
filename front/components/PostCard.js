import React,{useState, useEffect, useCallback} from 'react';
import {Input, Form, Button, Card, Icon, Avatar,List,Comment} from 'antd'
import Link from 'next/link'
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST} from '../reducers/post';


const PostCard = ({post}) => {

  const {me} = useSelector(state => state.user);
  const {commentAdded,isAddingComment} = useSelector(state => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState('');
  //const {me} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
    if(!commentFormOpened){
      dispatch({
        type:LOAD_COMMENTS_REQUEST,
        data:post.id
      })
    }
  },[commentFormOpened]);

  const onChangeCommentText = useCallback((e)=>{
    setCommentText(e.target.value);
  },[commentText]);

  const onSubmitComment = useCallback((e)=>{
    e.preventDefault();
    if(!me){
      return alert("로그인하세요")
    }
    dispatch({
      type:ADD_COMMENT_REQUEST,
      data:{
        postId:post.id,
        comment:commentText
      }
    })
  },[me && me.id, commentText])
  

  useEffect(()=>{
    setCommentText('');
  },[commentAdded === true])


  return (
    <div>
      <Card
        cover={post.img && <img alt="example" src={post.img}/>}
        actions={[
          <Icon type="retweet" key="retweet"/>,
          <Icon type="heart" key="heart"/>,
          <Icon type="message" key="message" onClick={onToggleComment}/>,
          <Icon type="ellipsis" key="ellipsis"/>
        ]}
        extra={<Button>Follow</Button>}
      >
        <Card.Meta
          avatar={<Link as={`/user/${post.User.id}`} href={ {pathname:'/user', query:{id:post.User.id}} }><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
          title={post.User.nickname}
          description={<div>{post.content.split(/(#[^\s]+)/g).map(h=>{
            if(h.match(/#[^\s]+/g)) return (
              <Link as={`/hashtag/${h.slice(1)}`} href={{pathname:'/hashtag', query:{tag:h.slice(1)}}} key={h}><a>{h}</a></Link>
            )
            return h
          })}</div>}
        />
      </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea row={4} value={commentText} onChange={onChangeCommentText}/>
            </Form.Item>
            <Button loading={isAddingComment} type="primary" htmlType="submit">comment</Button>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Link as={`/user/${item.User.id}`} href={ {pathname:'/user', query:{id: item.User.id} } }><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  )
}

PostCard.propTypes = {
  post:PropTypes.shape({
    User:PropTypes.object,
    content:PropTypes.string,
    img:PropTypes.string,
    createdAt:PropTypes.string
  })
}

export default PostCard;
