import React,{Component} from 'react';
import { Link } from 'react-router-dom';;
import _ from 'lodash';

class ItemList extends Component{
    
    constructor(props) {
        super(props);   
    }    

    generateStars = ratings => {
        let stars = [];
        let i=0,maxRating=5;
        while(i<ratings)
            stars.push(
                <span 
                    key={"glyp"+ratings+(i++)} 
                    className="fas fa-star"
                >
                </span>
            );
        while(i<maxRating)
            stars.push(
                <span 
                    key={"glyp"+ratings+(i++)} 
                    className="far fa-star"
                >
                </span>
            );

        return stars;        
    }
    
    displayItems = (books,flag) => {
        
        let itemsRows=[];
        
        itemsRows.push(
            <thead key="theading" className="thead-dark">
                <tr key="headingRow">
                    <th key="title">Title</th>
                    <th key="rating">Ratings</th>
                    <th key="rateit">Rate</th>
                </tr>
            </thead>
        );

        let items=[];
        if(!_.isEmpty(books)){
            let i=1;
            books = _.orderBy(books,['ratings'],['desc']);
            
            books.forEach(book => {
                items.push(
                    <tr key={i}>
                        <td key={book.title}>{book.title}</td>
                        <td key={i+'-ratings'}>{this.generateStars(book.ratings)}</td>
                        <td key={i+'-rateit'}>
                            <Link to={flag?'#':`/rater/${book.title}`}>
                                <button className="btn btn-primary" disabled={flag}>
                                    Rate It!
                                </button>
                            </Link>
                        </td> 
                    </tr>
                );  
                i++;  
            });

            itemsRows.push(<tbody key="tbody">{items}</tbody>);
            return itemsRows;
        }
        else{
            return (
                <tbody><tr><td>List of Books is Empty!</td></tr></tbody>
            );
        }
        
    }
    
    render(){
        const {books, randomRaterList } = this.props;
        return(
            <div>
                <table className="table table-hover table-responsive">
                    {this.displayItems(books,randomRaterList)}
                </table>
            </div>
        );
    }
}

export default ItemList;