import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
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
	return bindActionCreators({ loadBooks },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);