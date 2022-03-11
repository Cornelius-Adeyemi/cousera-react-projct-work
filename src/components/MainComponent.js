import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import higherOrderFunction from './HOC';

import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Routes, Route,  Navigate,useParams } from 'react-router-dom';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import About from "./AboutComponent"
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';



const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (firstname,lastname,agree,contactType,message,telnum) => dispatch(postFeedback(firstname,lastname,agree,contactType,message,telnum))
});



class Main extends Component {

  constructor(props) {
    super(props);
  
  }
 
 
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {
    const HomePage = () => {
      return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess = {this.props.leaders.errMess}
    />
      );
    }


    const DishWithId = ({match}) => {
      const {dishId} = useParams();
    
      return(
          <Dishdetail  dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(dishId))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess} 
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(dishId))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          dishId={parseInt(dishId)} />
      );
    };
    console.log("we are",this.props.location)
    return (
      <div>
        <Header/>
        <TransitionGroup>
            <CSSTransition key={this.props.location.key}  classNames="page" timeout={300}>
        <Routes location={this.props.location}>
              <Route path='/home' element={<HomePage/>} />
              <Route exact path='/menu' element={ <Menu dishes={this.props.dishes} />} />
              <Route path="*" element={<Navigate to="/home" />} />
              <Route exact path="/contactus" element={<Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
              <Route path='/menu/:dishId' element={<DishWithId/>} />
              <Route path ='/aboutus' element={<About leaders={this.props.leaders}/>} />
          </Routes>
          </CSSTransition>
          </TransitionGroup>
        <Footer/>

      </div>
    );
  }
}



export default higherOrderFunction(connect(mapStateToProps,mapDispatchToProps)(Main));