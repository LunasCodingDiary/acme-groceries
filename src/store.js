import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const initialState = {
  groceries: [],
  view: ''
};

//version 1
// onst store = createStore((state = initialState, action)=> {
//   if(action.type === 'LOAD'){
//     state = {...state, groceries: action.groceries };
//   }
//   if(action.type === 'UPDATE'){
//     state = {...state, groceries: state.groceries.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery )};
//   }
//   if(action.type === 'CREATE'){
//     state = {...state, groceries: [...state.groceries, action.grocery ]}
//   }
//   if(action.type === 'SET_VIEW'){
//     state = {...state, view: action.view};
//   }
//   return state;
// });




//Task 1 
//using combine reducers

const view = (state = '' , action)=> {
  if(action.type === 'SET_VIEW'){
    state = action.view;
  }
  return state;
};
//or
//return action.view;
//return state

const groceries =  (state = [], action)=> {
  if(action.type === 'LOAD'){
    state = action.groceries;
  }
  if(action.type === 'UPDATE'){
    state = state.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery );
  }
  if(action.type === 'CREATE'){
    state= [...state, action.grocery];
  }
    
  return state;
};

//Task 2
const reducer = combineReducers(
  {
    groceries, 
    view
  }
);

const store = createStore(reducer, applyMiddleware(thunk, logger));
// use thunk to transform each action to a function

export const fetchGroceries = () =>{
  return async(dispatch)=> {
    const groceries = (await axios.get('/api/groceries')).data;
    dispatch({
          type: 'LOAD',
          groceries
    })
  }
} 

export const updateGroceries = ()=> {
  return async(dispatch)=>{
    const updated = (await axios.put(`/api/groceries/${grocery.id}`, {purchased: !grocery.purchased})).data;
    dispatch({type:'UPDATE', grocery: updated});
  };
};

export const createGroceries = (name)=> {
  return async(dispatch)=>{
    const grocery = (await axios.post(`/api/groceries/${ name?'':'random'}`, name ? {name} : null)).data;
    dispatch({type:'CREATE', grocery});
  };
};

export default store;