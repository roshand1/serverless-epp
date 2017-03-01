import './_testimonial.less';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import {getTestimonialModel} from '../../../redux/action';
import * as actions from '../../../redux/action';

const Testimonial = React.createClass({

  mixins: [PureRenderMixin],  

  propTypes : {
    url:PropTypes.string
  },

   componentDidMount: function(){
         const { getTestimonialModel} = this.props;
      getTestimonialModel(this.props.url);
    },

 renderTestimonial () {
   let renderTestimonies = [];
                  this.props.testimonies.map((testimony,index)=>{
               renderTestimonies.push(<div key={index}>
                  <p className="posterName">{testimony.PosterName}</p>
                  <div className="full-quote quote">{testimony.Testimonial}</div>
                </div>);
            });
            return renderTestimonies; 
  },
  
  render () {
          return (this.props.testimonies && this.props.testimonies.length>0 ? 
               <div className="hg3-testimonial margin-lg-bottom">
                  <div className="hg3-testimonial-content">
                    <h2>Patient Testimonials</h2>
                    {this.renderTestimonial()}
                  </div>
              </div> :<div></div>
    );
  }
});

const mapStateToProps = (state) => {
  if (state && state.testimonialModel){
  return {
         testimonies: state.testimonialModel.Testimonies,
    }
  }else{
    return {};
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTestimonialModel: () => dispatch(getTestimonialModel()),
  };
};
export default connect(mapStateToProps, actions)(Testimonial);