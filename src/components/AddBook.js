import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBook } from '../actions/bookActions'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class AddBook extends Component {
    state = {
        aBook: {
            bookName: "",
            description: "",
            booksLeft: 0,
            created_At: "",
            categories: [

            ]
        },
        categoriesList: [],
        errors:{}
    }


    componentDidMount() {

        axios.get("http://localhost:8080/categories")
            .then(res => {
                const categoriesList = res.data
                this.setState({
                    categoriesList
                })
            })

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            errors:nextProps.errors
        })
    }
    onSubmit = (e) => {
        e.preventDefault()

        this.props.addBook(this.state.aBook, this.props)
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
                        <label  >Name</label>
                        <input onChange={this.bookChange} type="text" className="form-control" name="bookName" aria-describedby="emailHelp" placeholder="Name of the book" />
                        {this.state.errors.bookName ? (
                            <p className="validation">
                                <i class="fa fa-exclamation-circle"></i>
                                {this.state.errors.bookName}</p>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label  >Description</label>
                        <input onChange={this.descriptionChange} type="textarea" className="form-control" id="exampleInputPassword1" placeholder="Description of the book" />
                        {
                            this.state.errors.description ? (
                            <p className="validation">
                                <i class="fa fa-exclamation-circle"></i>
                                {this.state.errors.description}</p>
                            ) : null
                        }
                    </div>
                    
                    <div className="form-group">
                        <label  >Samples</label>
                        <input onChange={this.samplesChange} type="number" className="form-control" id="exampleInputPassword1" placeholder="Book samples left" />
                        {
                            this.state.errors.booksLeft ? (
                            <p className="validation">
                                <i class="fa fa-exclamation-circle"></i>
                                {this.state.errors.booksLeft}</p>
                            ) : null
                        }
                    </div>

                    <div className="form-group">
                        <label>Book created</label>
                        <input onChange={this.createdAtChange} type="date" className="form-control" id="exampleInputPassword1" placeholder="Book samples left" />

                    </div>
                    
                    <div class="form-check">

                        {
                            this.state.categoriesList.map((category) => {
                                return (
                                    <label key={category.id} className="ml-2">
                                        <input onClick={this.categoriesChange} className="form-check-input position-static mr-3 ml-2" type="checkbox" value={category.id} placeholder="adasd " />
                                        {category.categoryName}
                                    </label>

                                )
                            })
                        }

                    </div>

                    {
                        this.state.errors.categories ? (
                            <p className="validation">
                                <i class="fa fa-exclamation-circle"></i>
                                {this.state.errors.categories}</p>
                        ) : null
                    }

                    <div className="d-flex justify-content-end">
                        <button className="pl-3 pr-3 mr-2 btn btn-dark" onClick={() => { this.props.history.push("/")
                         }}>Cancel</button>
                        <button className="pl-3 pr-3 btn btn-success">Submit</button>

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
        addBook: (book, history) => { dispatch(createBook(book, history)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook)
