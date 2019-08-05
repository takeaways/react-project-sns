import {useCallback} from 'react';
import {Card, Avatar, Button} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {LOG_OUT_REQUEST} from '../reducers/user';


const Profile = () => {
  const dispatch = useDispatch();
  const {me} = useSelector(state => state.user);
  const onLogout = useCallback(() =>{
    dispatch({
      type:LOG_OUT_REQUEST,
    })
  },[]);


  return (
    <Card
      actions={[
        <div key="twit">팔로<br/>{me.Posts.length}</div>,
        <div key="following">Followers<br/>{me.Followers.length}</div>,
        <div key="follower">Followings<br/>{me.Followings.length}</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>LOGOUT</Button>
    </Card>

  )
}

export default Profile;
