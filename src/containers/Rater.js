import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import { updateBooks } from '../actions/index';

class Rater extends Component {
    constructor(props) {
  
      super(props);
      this.fillStars = this.fillStars.bind(this);
      this.unfillStars = this.unfillStars.bind(this);
      this.rateItem = this.rateItem.bind(this);
    }

    rateItem = (e,title) => {
        let id = $(e.target).attr('id');
        for(let i=1;i<=5;i++)
            $(`#${i}`).removeAttr('clicked');

        for(let i=1;i<=id;i++)
            $(`#${i}`).attr('clicked',true);
        this.props.updateBooks({title,'ratings':Number(id)});

        $('#rater-message').show().text('Thanks! Your rating is successfully recorded.'); 
    }

    fillStars = (e) => {
        let element = $(e.target);
        let id = element.attr('id');
        
        for(let i=1;i<=5;i++)
            $(`#${i}`).not('[clicked]').removeClass('fas').addClass('far');

        for(let i=1;i<=id;i++)
            $(`#${i}`).removeClass('far').addClass('fas');
    }

    unfillStars = (e) => {
        let element = $(e.target);
        let id = element.attr('id');
        for(let i=1;i<=5;i++)
            $(`#${i}`).not('[clicked]').removeClass('fas').addClass('far');  
    }

    generateStars = (title) => {
        let stars = [];
        let i=0,maxRating=5;
        while(i<maxRating)
            stars.push(
                <span 
                    key={"glyp"+(i++)}
                    id={i} 
                    className="far fa-star"
                    onMouseEnter={this.fillStars}
                    onMouseLeave={this.unfillStars}
                    onClick={(e)=>this.rateItem(e,title)}
                >
                </span>
            );

        return stars;        
    }
    
    render(){
        const {title} = this.props.match.params;   
        return (
                <div>
                    <div className="alert alert-info">
                        Kindly rate this book. 
                    </div>    
                    <h3>{title}</h3>
                    <div id="book-rating" className="mb-3">{this.generateStars(title)}</div>
                    <div id="rater-message" className="alert alert-success"></div>
                    <div><Link to="/">Back</Link></div>
                </div>
            );
    }
  }
  
  function mapStateToProps(state){
      return state;
  }
  
  function mapDispatchToProps(dispatch){
      return bindActionCreators({updateBooks},dispatch);
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Rater);