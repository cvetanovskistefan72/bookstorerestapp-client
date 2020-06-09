import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import { logOut, updateStatus } from '../actions/userActions'
import { connect } from 'react-redux'
import { createCart } from '../actions/cartActions'


class Navbar extends Component {

state={
    cartAlert:true
}



    logOut = (e) => {
        e.preventDefault()
        this.props.logOut(this.props.history)

        this.props.updateStatus(this.props.userInfo, this.props.history, "inactive")


    }


    render() {
        const userInfo = this.props.userInfo
        const cartAlert = (
            <div class="alert alert-dark shopping-cart-div-message m-1 ml-2" role="alert">
                If you want to buy a book, click on the Shopping cart logo to create a Shopping cart.
                <span>
                </span>
            </div>
        )
        setTimeout(() => {
            this.setState({
                cartAlert:false
            })
        },7000)
        return (
            <div>
                <div className="top-nav container">
                    {
                        userInfo ? (

                            <div className="shopping-cart-div">
                                <NavLink to="/cart" href="#" className="fa fa-shopping-cart"  ></NavLink>


                                {this.state.cartAlert?cartAlert:null}

                            </div>
                        ) : null
                    }
                    <div>
                        <a href="#" className="fa fa-facebook-square text-primary"></a>
                        <a style={{ color: '#00a2ff' }} href="#" className="fa fa-twitter-square"></a>
                        <a href="#" className="fa fa-google-plus-square text-danger"></a>
                        <a style={{ color: 'purple' }} href="#" className="fa fa-instagram"></a>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <NavLink to="/" className="navbar-brand bg-dark" href="#">BookStore</NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ml-auto mr-2">
                                {
                                    userInfo ? (<NavLink to="/" className="nav-item nav-link " >Home <span className="sr-only">(current)</span></NavLink>) : null
                                }
                                {
                                    userInfo ? (
                                        <div className="d-flex justify-content-center">
                                            <NavLink to="/signIn" className="nav-item nav-link " onClick={this.logOut} >Log out</NavLink>
                                        </div>

                                    ) :
                                        (
                                            <div className="d-flex justify-content-center">
                                                <NavLink to="/signUp" className="nav-item nav-link " >Sign up</NavLink>
                                                <NavLink to="/signIn" className="nav-item nav-link " >Sign in</NavLink>
                                            </div>
                                        )
                                }


                            </div>

                            {
                                userInfo ? (<button className="btn btn-success p-1"> <Link to="/addBook" className="nav-item  test"  >Add Book </Link></button>) : null
                            }
                        </div>
                    </div>

                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: (history) => { dispatch(logOut(history)) },
        updateStatus: (user, history, status) => { dispatch(updateStatus(user, history, status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)


