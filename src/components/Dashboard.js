import React, { Component } from 'react'
import { connect } from 'react-redux'
import BooksSection from './BooksSection'
import { Footer } from './Footer'
import { Redirect } from 'react-router-dom'
import { getCartByStatus } from '../actions/cartActions'
import Modal from './Modal'

export class Dashboard extends Component {


    render() {

        if (this.props.userInfo == "") {

            return (
                <Redirect to="/signIn" />
            )

        }

        return (

            <div className="  dashboard">

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 ">
                            <BooksSection />
                        </div>
                    </div>

                </div>
                
                <div className="row">
                    <div className="col">
                        <Footer />
                    </div>
                </div>

            </div>


        )
    }
}

const mapStateToProps = (state) => {

    return {
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
