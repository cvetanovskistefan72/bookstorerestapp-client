import React, { Component } from 'react'
import axios from 'axios'
class BookCard extends Component {
    state = {
        categories: []
      }
    componentDidMount() {
        axios.get("http://localhost:8080/api/books/"+this.props.book.id+"/categories")
          .then(res => {
            const categories = res.data._embedded.categories;
            this.setState({
                categories
            })
          })
      }
     
    render() {
        return (
            <div className="book-card  p-3  ">

                <div className="row">
                    <div className="col bookName-title  ">
                        <h3>{this.props.book.bookName}</h3>
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col">
                    
                        <p>{this.props.book.description}</p>
                    </div>
                </div>

                <div className="row">
                   <div className="col">
                    <p>Published: {this.props.book.created_At}</p>
                   </div>
                </div>
                
                <div className="row">
                
                   <div className="col-md-11">
                 
                   {
                       this.state.categories.map((category,i)=>{
                           const color =category.categoryColor ? category.categoryColor:"dark"
                        return(   <span key={i} className={"badge badge-"+color +" p-2 m-1"}> {category.categoryName} </span> )
                       })
                   }
                 
                   
                   </div>
                   <div className="col-md-1  ">
                   <span className="samples-left badge p-2 m-1  ">{this.props.book.booksLeft} left</span> 
                   
                   </div>
                </div>

            </div>
        )
    }
}

 

export default  BookCard;
