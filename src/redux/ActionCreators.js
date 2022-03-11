import * as ActionTypes from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';
import { actionTypes } from 'react-redux-form';


// export const addComment = (dishId, rating, author, comment) => ({
//     type: ActionTypes.ADD_COMMENT,
//     payload: {
//         dishId: dishId,
//         rating: rating,
//         author: author,
//         comment: comment
//     }
// });



export const postFeedback=(firstname,lastname,agree,contactType,message,telnum,email)=>()=>{
  const feedback = {
    firstname:firstname,
    lastname:lastname,
    agree:agree,
    contactType:contactType,
    message:message,
    telnum:telnum,
    email:email
  };

  fetch(baseUrl + "feedback",{
    method:"POST",
    body:JSON.stringify(feedback),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"

  }).then((response)=>{
    if(response.ok)
     return response;
     else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      //error.response = response;
      throw error;
    
     }
  },
  err =>{
    let error = new Error(err.message);
    throw error;
  }
  )
  .then ((response)=> response.json())
  .then(response=> alert(JSON.stringify(response)))
  .catch(err => alert(err.message))
}





export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});


export const postComment = (dishId, rating, author, comment) => (dispatch) => {

  const newComment = {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment
  };
  newComment.date = new Date().toISOString();
  
  return fetch(baseUrl + 'comments', {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response =>{ return dispatch(addComment(response))})
  .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
         // error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

export const fetchComments = () => (dispatch) => {  
  
    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          //error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};
// leaders thunk action creator
export  const fetchLeaders = ()=>(dispatch)=>{
      dispatch(leadersLoading());
   return fetch(baseUrl + "leaders").then((response)=>{
     if(response.ok)
     return response;
     else{
        let err = new Error(`Error`+ response.status + ":" + response.statusText);
        throw err
     } },
     err =>{
        let er = new Error(err.message);
        throw er;
     }
     ).then(response => response.json())
     .then(leaders=>{return dispatch(addleader(leaders))})
     .catch(err =>{ return dispatch(leadersFailed(err.message))});
};    

const leadersLoading = ()=>{
  return {type:ActionTypes.LEADERS_LOADING, payload:true};
}

const leadersFailed = (er)=>{
  return {type:ActionTypes.LEADERS_FAILED, payload:er}
}

const addleader = (leaders)=>{
  return {type:ActionTypes.ADD_LEADERS, payload: leaders}
}

// it ends here

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          //error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});


export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});