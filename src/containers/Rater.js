import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { loadBooks } from '../actions/index';

class Rater extends Component {
  
    constructor(props) {
      super(props);
    //   this.props.loadBooks();
    }
    
    render(){
        console.log('rater--',this.props);   
        return <div>Hey I am under construction.</div>;
    }
  }
  
  function mapStateToProps(state){
      return state;
  }
  
  function mapDispatchToProps(dispatch){
      return bindActionCreators({},dispatch);
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Rater);