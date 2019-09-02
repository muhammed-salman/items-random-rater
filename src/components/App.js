import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadBooks } from '../actions/index';
import ItemList from './ItemList';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.props.loadBooks();
  }
 
  render(){
      const {books} = this.props;
      if(!books.error)
        return (
          <div>
            <Link id="random-rater-link" to='/randomrater'>
              <button className="btn btn-primary mb-3">Go to Random Rater</button>
            </Link>
            <ItemList books={books} randomRaterList={false} />
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
	return bindActionCreators({ loadBooks },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);