import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCartByStatus, createCart, setBooksZero } from '../actions/cartActions'
class CartButtons extends Component{
    state = {
        id:null,
        cartStatus: null,
        cart_created: null,
        cart_closed: null,
        username: null,
        books: [

        ]
    }

   
    onChangeCart = (e) => {
        e.preventDefault()
        this.state.id=this.props.ShoppingCart.id
        this.state.cartStatus = "canceled"
        this.state.cart_created = this.props.ShoppingCart.cart_created
        this.state.cart_closed = new Date();
        this.state.username = this.props.ShoppingCart.username
        this.state.books=this.props.booksInCart
        this.props.createCart(this.state)
        this.props.setBooksZero()
       
      
    }

    onChangeCart2 = (e) => {
        e.preventDefault()
        this.state.id=this.props.ShoppingCart.id
        this.state.cartStatus = "submited"
        this.state.cart_created = this.props.ShoppingCart.cart_created
        this.state.cart_closed = new Date();
        this.state.username = this.props.ShoppingCart.username
        this.state.books=this.props.booksInCart
        this.props.createCart(this.state)
        this.props.setBooksZero()
        
        

    }
    render(){
         
    return (
        <div>
             <button className="pl-3 pr-3 mr-2 btn btn-dark" onClick={this.onChangeCart} >Cancel</button>
                <button className="pl-3 pr-3 btn btn-success" onClick={this.onChangeCart2}>Submit</button>
        </div>
    )
    }
}

const mapStateToProps = (state) => ({
    ShoppingCart:state.cart.cart,
    booksInCart:state.cart.booksInCart
})

const mapDispatchToProps = (dispatch) => {
    return {

        createCart: (cart) => { dispatch(createCart(cart)) },
        setBooksZero:()=>{dispatch(setBooksZero())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButtons)
