import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemList from '../components/ItemList';
import _ from 'lodash';
import $ from 'jquery';

import { updateBooks } from '../actions/index';


class RandomRater extends Component {
  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.randomRateItem = this.randomRateItem.bind(this);
    this.state = { rate: false };
  }

  randomRateItem = () =>{
      if(this.state.rate){ 
        const { updateBooks, books } = this.props;  
        //selecting item (book) randomly from 0 to 8
        let randomItem = Math.floor(Math.random() * _.size(this.props.books));    
        //generating random time interval from 100ms to 2000ms
        let randomTime = Math.floor(Math.random() * 1900 + 100);
        //genrating random rating from 1 to 5
        let randomRating = Math.floor(Math.random() * 5 + 1);
        //updating the book with random values of rating
        updateBooks({ 'title': books[randomItem].title,'ratings': randomRating });
        $('#rater-message').show()
        .html(`Just rated <em>${books[randomItem].title}</em> to <em>${randomRating} stars</em>. ( Next Rating in ${randomTime}ms )`);
        //callback again at random time
        setTimeout(this.randomRateItem,randomTime);
      }
      else{
        $('#rater-message').text('Random Rating Stopped.');  
      }
  }

  handleClick = (e) => {
    //disable/enable the back button depending upon state
    $('#app-link').attr('href',!this.state.rate?'#':'/');
    $('#app-link > button').attr('disabled',!this.state.rate);
    //display appropraite message to start/stop random rating
    $('#btn-random-rate').text(!this.state.rate?'Stop Random Rating':'Start Random Rating');
    this.setState({rate:!this.state.rate});
    //initaite the random rating process
    setTimeout(this.randomRateItem,100);
  }
 
  render(){
      const {books} = this.props;
      if(!books.error)
        return (
          <div>
            <button
                id="btn-random-rate" 
                className="btn btn-primary mb-3"
                onClick={this.handleClick}
            >
                Start Random Rating
            </button> 
            <Link to="/" id="app-link" className="ml-3">
              <button className="btn btn-primary mb-3">Back</button>
            </Link> 
            <div id="rater-message" className="alert alert-success"></div>
            <ItemList books={books} randomRaterList={true} />
          </div>
        );
      else
        return(
          <div className="alert alert-danger">{books.error}</div>
        );
    }
}

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ updateBooks },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(RandomRater);