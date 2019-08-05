import React from 'react';
import {Form, Input, Button, List, Icon, Card} from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  return (
    <div>
      <NicknameEditForm/>
      <List
        style={{marginBottom:'20px'}}
        grid={{gutter:4, xs:2, md:3}}
        size="small"
        header={<div>Following List</div>}
        loadMore={<Button type="primary" style={{width:'100%'}}>More</Button>}
        bordered
        dataSource={['Geonil','Hong',"Suzy"]}
        renderItem={item => (
          <List.Item style={{marginTop:'20px'}}>
            <Card actions={[<Icon key={item} type="stop"/>]}>
              <Card.Meta
                description={item}
              />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{marginBottom:'20px'}}
        grid={{gutter:4, xs:2, md:3}}
        size="small"
        header={<div>Follower List</div>}
        loadMore={<Button type="primary" style={{width:'100%'}}>More</Button>}
        bordered
        dataSource={['Geonil','Hong',"Suzy"]}
        renderItem={item => (
          <List.Item style={{marginTop:'20px'}}>
            <Card actions={[<Icon key={item} type="stop"/>]}>
              <Card.Meta
                description={item}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Profile;
