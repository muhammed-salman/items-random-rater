import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _$ from 'jquery';

import { updateBooks } from '../actions/index';

class Rater extends Component {
    constructor(props) {
  
      super(props);
      this.fillStars = this.fillStars.bind(this);
      this.unfillStars = this.unfillStars.bind(this);
      this.rateItem = this.rateItem.bind(this);
    }

    rateItem = (e,title) => {
        let id = _$(e.target).attr('id');
        //remove all previous clicked attributes if any
        for(let i=1;i<=5;i++)
            _$(`#${i}`).removeAttr('clicked');
        //attaching clicked attribute to the stars having id 1 to the clicked star
        for(let i=1;i<=id;i++)
            _$(`#${i}`).attr('clicked',true);
        //actually updating the rating of the book    
        this.props.updateBooks({title,'ratings':Number(id)});

        _$('#rater-message').show().text('Thanks! Your rating is successfully recorded.'); 
    }

    fillStars = (e) => {
        let element = _$(e.target);
        let id = element.attr('id');
        //displaying the empty stars (which does not have clicked attribute)
        for(let i=1;i<=5;i++)
            _$(`#${i}`).not('[clicked]').removeClass('fas').addClass('far');
        //displaying filled stars for all the stars from id 1 to the hovered star
        for(let i=1;i<=id;i++)
            _$(`#${i}`).removeClass('far').addClass('fas');
    }

    unfillStars = (e) => {
        let element = _$(e.target);
        let id = element.attr('id');
        //unfill the stars which does not have clicked a clicked attribute
        for(let i=1;i<=5;i++)
            _$(`#${i}`).not('[clicked]').removeClass('fas').addClass('far');  
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