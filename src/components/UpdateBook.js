import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBook, updateBook } from '../actions/bookActions'
import axios from 'axios'
import { Redirect,Route } from 'react-router-dom'
class UpdateBook extends Component {
    state = {
        aBook: {
            id: null,
            bookName: "",
            description: "",
            booksLeft: 0,
            created_At: "",
            categories: []
        },
        categoriesList: [],
        existingCategories: [],
        errors:{}
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            errors:nextProps.errors
        })
    }
    componentDidMount() {

        axios.get("http://localhost:8080/categories")
            .then(res => {
                const categoriesList = res.data
                this.setState({
                    categoriesList
                })


            })
        axios.get("http://localhost:8080/books/" + this.props.match.params.id)
            .then(res => {
                const book = res.data

                this.setState({
                    aBook: {
                        ...this.state.aBook,
                        id: book.id,
                        bookName: book.bookName,
                        description: book.description,
                        booksLeft: book.booksLeft,
                        created_At: book.created_At,

                    }

                })

                this.setState({
                    existingCategories: book.categories
                })

            })



    }
     


    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.errors)
        this.state.aBook.categories = [...this.state.aBook.categories, ...this.state.existingCategories]
        this.props.updateBook(this.state.aBook, this.props.history)

        
    }

    bookChange = (e) => {
        this.setState({
            aBook: {
                ...this.state.aBook,
                bookName: e.target.value
            }
        })
    }
    descriptionChange = (e) => {
        this.setState({
            aBook: {
                ...this.state.aBook,
                description: e.target.value
            }

        })
    }
    samplesChange = (e) => {
        this.setState({
            aBook: {
                ...this.state.aBook,
                booksLeft: e.target.value
            }

        })
    }
    createdAtChange = (e) => {
        this.setState({
            aBook: {
                ...this.state.aBook,
                created_At: e.target.value
            }
        })
    }
    categoriesChange = (e) => {
        this.setState({
            aBook: {
                ...this.state.aBook,
                categories: [...this.state.aBook.categories, { id: parseInt(e.target.value) }]
            }

        })

        console.log(this.state.aBook)

    }

    setCategoryNull = () => {
        this.setState({

            existingCategories: []
        })


    }
    render() {
        if(this.props.userInfo==""){
            
          return(
            <Redirect to="/signIn" />
          )
        
        }
        return (
            <div style={{ backgroundColor: 'white', borderRadius: '5px' }} className="container  shadow-sm mt-5  p-5">

                <form className="needs-validation" onSubmit={this.onSubmit} >
                
                    <div className="form-group">
                        <label>Name</label>
                        <input onChange={this.bookChange} type="text" className="form-control" name="bookName" value={this.state.aBook.bookName} placeholder="Name of the book" />
                        {
                            this.state.errors.bookName ? (
                            <p className="validation">
                                <i class="fa fa-exclamation-circle"></i>
                                {this.state.errors.bookName}</p>):null
                        }
                    </div>

                    <div className="form-group">
                        <label  >Description</label>
                        <input onChange={this.descriptionChange} type="textarea" className="form-control" id="exampleInputPassword1" value={this.state.aBook.description} placeholder="Description of the book" />
                        {this.state.errors.description ? (
                            <p className="validation">
                                <i class="fa fa-exclamation-circle"></i>
                                {this.state.errors.description}</p>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label  >Samples</label>
                        <input onChange={this.samplesChange} type="number" className="form-control" id="exampleInputPassword1" value={this.state.aBook.booksLeft} placeholder="Book samples left" />
                        {this.state.errors.booksLeft ? (
                            <p className="validation">
                                <i className="fa fa-exclamation-circle"></i>
                                {this.state.errors.booksLeft}</p>) : null}
                    </div>

                    <div className="form-group">
                        <label>Book created</label>
                        <input onChange={this.createdAtChange} type="date" className="form-control" id="exampleInputPassword1" value={this.state.aBook.created_At} placeholder="Book samples left" />

                    </div>

                    <div>
                        {
                            this.state.aBook.categories != null ? (<span>Categories: </span>) : null
                        }

                        {
                            this.state.existingCategories.map((category) => {

                                return (<span key={category.id}>{category.categoryName} </span>)
                            })
                        }

                        {
                            this.state.existingCategories ? (
                                <a onClick={this.setCategoryNull}
                                    style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }} className="">
                                    Clear categories</a>) : null
                        }

                    </div>

                    <div className="form-check">

                        {
                            this.state.categoriesList.map((category) => {

                                let flag = 0;

                                for (let i = 0; i < this.state.existingCategories.length; i++) {
                                    if (parseInt(category.id) == parseInt(this.state.existingCategories[i].id)) {
                                        flag = 1;
                                        break
                                    }
                                }
                                if (flag == 0) {
                                    return (

                                        <label key={category.id} className="ml-2">
                                            <input onClick={this.categoriesChange} className="form-check-input position-static mr-3 ml-2 " type="checkbox" value={category.id} placeholder="adasd " />
                                            {category.categoryName}
                                        </label>

                                    )
                                }

                            })
                        }


                    </div>

                    {
                        this.state.errors.categories ? (
                        <p className="validation">
                            <i class="fa fa-exclamation-circle"></i>
                            {this.state.errors.categories}</p>) : null}

                    <div className="d-flex justify-content-end">
                        <button className="pl-3 pr-3 mr-2 btn btn-dark" onClick={() => { this.props.history.push("/")
                          }}>Cancel</button>
                        <button  style={{backgroundColor:"#0d47a1"}} className="pl-3 pr-3 btn btn-primary" >Update</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {


    return {
        errors: state.errors.errors,
        userInfo:state.user.userInfo
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        updateBook: (book, history) => { dispatch(updateBook(book, history)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBook)
