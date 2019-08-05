import React from 'react';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../reducers';
import rootSaga from '../sagas';

//공통 적으로 들어가는!!
const Main = ({Component, store, pageProps}) => {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps}/>
      </AppLayout>
    </Provider>
  );
}

Main.propTypes = {
  Component: PropTypes.elementType,
  store:PropTypes.object,
  pageProps:PropTypes.object,
}

Main.getInitialProps = async (context) => {
  const {ctx, Component} = context;
  let pageProps = {};
  if(context.Component.getInitialProps){
    pageProps = await context.Component.getInitialProps(ctx);
  }
  return {pageProps};
};


const configureStore = (initialState, options)=>{

  const sagaMiddleware = createSagaMiddleware();

  //여기 부터는 기능 추가
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production '
  ? compose(applyMiddleware(...middlewares))
  : compose(
      applyMiddleware(...middlewares),
      !options.isServer &&
      window.__REDUX_DEVETOOLS_EXTENSION__
      !== 'undefined' ?
      window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    ) //compose 미들웨어 합성
  //
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}

export default withRedux(configureStore)(Main);
