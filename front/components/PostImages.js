import React , {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom'
import {Input, Form, Button, Card, Icon, Avatar,List,Comment} from 'antd'


const PostImages = ({images}) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  },[]);
  const onClose = useCallback(()=>{
    setShowImagesZoom(false);
  },[])


  if(images.length === 1){
    return(
      <>
        <img src={`http://localhost:3065/${images[0].src}`} alt="" onClick={onZoom}/>
        {showImagesZoom && <ImagesZoom key={1} images={images} onClose={onClose}/>}
      </>
    );
  }else if(images.length === 2){
    return(
      <>
        <div>
          <img src={`http://localhost:3065/${images[0].src}`} width="50%" onClick={onZoom} alt=""/>
          <img src={`http://localhost:3065/${images[1].src}`} width="50%" onClick={onZoom} alt=""/>
        </div>
      {showImagesZoom && <ImagesZoom key={2} images={images} onClose={onClose}/>}
      </>
    )
  }else{
    return(
      <>
        <div>
          <img src={`http://localhost:3065/${images[0].src}`} width="50%" onClick={onZoom} alt=""/>
          <div style={{display:'inline-block',width:"50%", textAlign:'center', verticalAlign:'middle'}}>
            <Icon onClick={onZoom} type="plus"/>
            <br/>
            {images.length - 1}
            개의 사진 더보기
          </div>
        </div>
        {showImagesZoom && <ImagesZoom key={3} images={images} onClose={onClose}/>}
      </>
    );
  }
}

PostImages.propTypes ={
  images:PropTypes.arrayOf(PropTypes.object).isRequired
}


export default PostImages;
