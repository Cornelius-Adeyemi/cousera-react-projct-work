import React, {useState} from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';

    import {Button ,
        Modal, ModalHeader, ModalBody, Label  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


function Dishdetail(props) {

    const [toggleBool, setToggle] = useState(false);

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    const handleSubmit = (values)=> {
        handleToggle();
        props.postComment(props.dishId, values.rating, values.author, values.comment);
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
      //  event.preventDefault();
    }
   console.log(props.comments);
    const handleToggle = ()=>{
        setToggle(!toggleBool);
    }
   
        const dish = props.dish;

              
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        return(<div className='container'>
            <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
            <div className="row">
            <div  className="col-12 col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
            </div>
            <div  className="col-12 col-md-5 m-1">
                         <h4>Comments</h4>
                         <ul className="list-unstyled">
                         <Stagger in>
                {props.comments.map((comment)=>{
                    
                    return (
                        
                        <Fade in>
                        <li class="media">
                        <div class="media-body">
                        <p>{comment.comment}</p>
                        <p>-- { comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                         </div>    
                         </li>
                         </Fade>
                    
                    )   
                })}
                </Stagger>
            </ul>
               <button onClick={handleToggle} className="comment-btn"> <i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment</button>
            </div>

            </div>
            <Modal isOpen={toggleBool} toggle={handleToggle}>
                     <Col md={{size: 10, offset: 1}}>
                    <ModalHeader toggle={handleToggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                         
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                    

                                <Row className="form-group">
                                <Col md={{size: 12}}>
                                <Label htmlFor="rating">Rating</Label> 
                            
                                {// eslint-disable-next-line
                                    } <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>

                                    </Control.select>
                                    </Col>
                                </Row>
                             <Row className="form-group">
                              <Col md={{size: 12}}>
                                <Label htmlFor="author" >Your Name</Label>
                                
                                    {// eslint-disable-next-line
                                    } <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                              </Col>
                            </Row>
                             <Row className="form-group">
                             <Col md={{size: 12}}>
                                <Label htmlFor="comment">Comment</Label>
                                
                                    {// eslint-disable-next-line
                                    } <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="5"
                                        className="form-control" />
                                      </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:12}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                    </Col>
                </Modal>

            </div>);
       else
        return(
            <div><p>I love you</p></div>
        );

    
}


export default Dishdetail;