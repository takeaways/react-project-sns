import React from 'react';
import {Form, Input, Button} from 'antd';

const NicknameEditForm = () => {
  return (
    <Form style={{marginBottom:'10px', border:'1px solid #d9d9d9', padding:'20px 20px 40px 20px'}}>
      <Input addonBefore="NICKNAME"/>
      <div style={{marginTop:'2px',float:'right'}}>
        <Button type="primary">change</Button>
      </div>
    </Form>
  )
}

export default NicknameEditForm;
