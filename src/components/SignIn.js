import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser, setUsername,updateStatus } from '../actions/userActions'
import {Redirect} from 'react-router-dom'
class  SignIn extends Component{
    state={
     
        user:{
            username:"",
            password:"",
        },
        errors:{}
    
        
    }

    componentWillReceiveProps(nextProps){
            this.setState({
                errors:nextProps.errors
            })
    }
    setChanges1=(e)=>{
        this.setState({
          
            user:{
                ...this.state.user,
                username:e.target.value,
            }
        })
       
    }
    setChanges2=(e)=>{
        this.setState({
            
            user:{
                ...this.state.user,
                password: e.target.value,
            }
        })
       
    }

    submitChanges=(e)=>{
        e.preventDefault()
        
        this.props.getUser(this.state.user,this.props.history)

         
             this.props.updateStatus(this.state.user.username,this.props.history,"active")
         
      
        
    }
    render(){
        if(this.props.userInfo!=""){
            
            return(
                <Redirect to="/" />
              )
        
        }
        return (
            <div className="container p-5 shadow-sm mt-5">

                <div>
                    <h3>Sign In</h3>
                </div>

                <br></br>

                <form onSubmit={this.submitChanges}>

                    <div className="form-group">
                        <label  >Username</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="username"  onChange={this.setChanges1} placeholder="Username"/>
                        {this.state.errors.username ? (
                            <p className="validation">
                                <i className="fa fa-exclamation-circle"></i>
                                {this.state.errors.username}</p>
                        ) : null}
                         
                    </div>

                    <div className="form-group">
                        <label  >Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={this.setChanges2} placeholder=" Password"/>
                    </div>

                    {
                        this.state.errors.password ? (
                            <p className="validation">
                                <i className="fa fa-exclamation-circle"></i>
                                {this.state.errors.password}</p>
                        ) : null
                    }
                    
                    <div className="d-flex justify-content-end">
                            
                     <button type="submit" className="btn btn-success pl-3 pr-3 mt-2">Submit</button>
                    </div>

                    <div className="d-flex justify-content-center">
                    {this.state.errors.message ? (
                            <p className="validation">
                                <i className="fa fa-exclamation-circle"></i>
                                {this.state.errors.message}</p>
                        ) : null}
                    </div>
                    
                    </form>
            </div>
        )
    }
    }

const mapStateToProps = (state) => {
     console.log(state) 
    return{
        errors: state.errors.errors,
        userInfo:state.user.userInfo
    }
}

const mapDispatchToProps =(dispatch,state)=> {
    return{
        getUser:(user,history)=>{dispatch(getUser(user,history))},
        updateStatus:(user,history,status) => {dispatch(updateStatus(user,history,status))}
  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
