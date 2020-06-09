import React, { Component } from 'react'
import BookCard from './BookCard'
import { connect } from 'react-redux'
import { getBooks, deleteBook } from '../actions/bookActions'
import { getCartByStatus, addBookToCart } from '../actions/cartActions'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
 
class BooksSection extends Component {
    state = {

        pages: null,
        niza: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        page: 0,
        number: 0
    }
    componentDidMount() {

        axios.get("http://localhost:8080/api/books?page=0&size=3")
            .then(res => {
                const number = res.data.page.number;
                const pages = res.data.page.totalPages;
                this.setState({
                    number,
                    pages
                })
            })
        this.props.getBooks()
        this.props.getCartByStatus(this.props.userInfo)

         
    }

    setPage = (i) => {
        this.state.page = i

        this.props.getBooks(i)

    }
    onDelete = (bookId) => {
        if (window.confirm("Are you sure") == true) {
            this.props.deleteBook(bookId)
        }

    }



    render() {
     
        const { books } = this.props
        if (this.props.userInfo == "") {

            return (
                <Redirect to="/signIn" />
            )

        }

        return (
            <div style={{ backgroundColor: 'white', boxShadow: '0px 0px 5px -3px #000000bf' }} id="book-section" className="container  p-4    mt-4 ">

                <div className="row">
                    <div className="col">

                        <div className="pagination-buttons p-2 mt-3 d-flex justify-content-center ">
                            <ul className="pagination pagination-sm">
                                <li className={this.state.page <= 0 ? "page-item disabled" : "page-item "}>
                                    <a style={{ color: '#0d47a1', borderRadius: '0px' }} className="page-link" href="#" onClick={() => { this.props.getBooks(this.state.page -= 1) }} >Previous</a>
                                </li>

                                {
                                    this.state.niza.slice(0, this.state.pages).map((book, i) => {


                                        return (
                                            <li key={i} className="page-item  "><a className="page-link"
                                                style={this.state.page == i ? { backgroundColor: '#0d47a1', color: 'white' } : { backgroundColor: 'white', color: '#0d47a1' }}
                                                href="#" onClick={() => { this.setPage(i) }}>{i + 1}</a></li>
                                        )
                                    })
                                }

                                <li className={this.state.page < this.state.pages - 1 ? "page-item" : "page-item disabled"}>
                                    <a style={{ color: '#0d47a1', borderRadius: '0px' }} className="page-link" href="#" onClick={() => { this.props.getBooks(this.state.page += 1) }} >Next</a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="row">

                    {
                        books.map((book, i) => {
                            return (
                                <div key={book.id} className="col-lg-12 mt-2">

                                    <hr />

                                    <BookCard book={book} />
                                      
                                    <div className="d-flex justify-content-end">

                                        <Link to={"updateBook/" + book.id} className="btn">
                                            <svg style={{ fontSize: '2rem', color: "#0d47a1" }} className="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                                                <path d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" />
                                            </svg>
                                        </Link>

                                        <button className="btn " onClick={() => { this.onDelete(book.id) }}>
                                            <svg style={{ fontSize: '2rem' }} className="bi bi-trash-fill text-danger" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" />
                                            </svg>
                                        </button>


                                        {
                                            this.props.shoppingCart ? (
                                                <Link to="/" className={book.booksLeft <= 0 ? "btn disabled" : "btn"} onClick={(e) => { this.props.addBookToCart(book) }} >
                                                    <svg style={{ fontSize: '2rem' }} class="bi bi-plus-square-fill text-dark" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clip-rule="evenodd" />
                                                    </svg>
                                                </Link>
                                            ) : null
                                        }


                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        books: state.books.booksList,
        userInfo: state.user.userInfo,
        shoppingCart: state.cart.cart
    }

}

const mapDispathToProps = (dispatch, state) => {
    return {
        getBooks: (i) => dispatch(getBooks(i)),
        deleteBook: (bookId) => dispatch(deleteBook(bookId)),
        getCartByStatus: (user) => { dispatch(getCartByStatus(user)) },
        addBookToCart: (book) => { dispatch(addBookToCart(book)) }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(BooksSection);