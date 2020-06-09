import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCartByStatus, createCart, deleteBookFromCart } from '../actions/cartActions'
import { Redirect, Link } from 'react-router-dom'
import CartButtons from './CartButtons'

class ShoppingCart extends Component {

    state = {
        cartStatus: null,
        cart_created: null,
        cart_closed: null,
        username: null,
        books: [

        ]
    }

   
    createCart = (e) => {
        e.preventDefault()

        this.state.cartStatus = "active"
        this.state.cart_created = new Date()
        this.state.cart_closed = null
        this.state.username = this.props.userInfo

        this.props.createCart(this.state)
        this.props.history.push("/")

    }

     


    render() {
        if (this.props.userInfo == "") {

            return (
                <Redirect to="/signIn" />
            )

        }
        const shoppingCart = this.props.shoppingCart
        return (
            <div className="container">
            
           {
               shoppingCart?null:(<button className="btn btn-dark m-2" onClick={this.createCart}>Create Shopping Cart</button>)
           }
                 {
                     this.props.booksInCart.map((book)=>{
                        return(
                            <div key={book.id} className="d-flex cart-books shadow-sm m-2 p-3">
                                 <h1>{book.bookName}</h1>
                                  <a className="">
                                <svg onClick={(e)=>{e.preventDefault();this.props.deleteBookFromCart(book.id)}} style={{ fontSize: '2rem', cursor: 'pointer' }} class="bi bi-x-circle-fill text-danger mt-3 shadow-sm" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                     <path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd" />
                                  </svg></a>
                              </div>
                        )
                     })
                 }

                 {
                     shoppingCart?(
                         !this.props.booksInCart.length?(
                            <div class="alert alert-warning mt-5" role="alert">
                                Cart is empty
                            </div>
                         ):null
                     ):(<div class="alert alert-danger" role="alert">
                                Please Create a Shopping Cart.
                            </div>)
                 }
                 {
                    shoppingCart?(
                        this.props.booksInCart.length?(<div className="d-flex justify-content-end"><CartButtons props1={this.props.history}/></div>):null
                    ):null
                }
                

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        userInfo: state.user.userInfo,
        shoppingCart: state.cart.cart,
        booksInCart:state.cart.booksInCart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        createCart: (cart) => { dispatch(createCart(cart)) },
        deleteBookFromCart:(bookId)=>{dispatch(deleteBookFromCart(bookId))}
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
