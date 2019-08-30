import React,{Component} from 'react';
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
        let randomItem = Math.floor(Math.random() * _.size(this.props.books));    
        let randomTime = Math.floor(Math.random() * 1900 + 100);
        let randomRating = Math.floor(Math.random() * 5 + 1);
        updateBooks({ 'title': books[randomItem].title,'ratings': randomRating });
        $('#rater-message').show()
        .html(`Just rated <em>${books[randomItem].title}</em> to <em>${randomRating} stars</em>. ( Next Rating in ${randomTime}ms )`);
        $('#btn-random-rate').text('Stop Random Rating');
        setTimeout(this.randomRateItem,randomTime);
      }
      else{
        $('#rater-message').text('Random Rating Stopped.');
        $('#btn-random-rate').text('Start Random Rating');  
      }
  }

  handleClick = (e) => {
      this.setState({rate:!this.state.rate});
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
            <div id="rater-message" className="alert alert-success"></div>
            <ItemList books={books} />
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