import './_testimonial.less';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const Testimonial = React.createClass({

  mixins: [PureRenderMixin],  

  propTypes : {
    testimonies:PropTypes.object
  },

 renderTestimonial () {
   debugger; 
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
          return (this.props.testimonies.length>0 && 
               <div className="hg3-testimonial margin-lg-bottom">
                  <div className="hg3-testimonial-content">
                    <h2>Patient Testimonials</h2>
                    {this.renderTestimonial()}
                  </div>
              </div>
    );
  }
});

export default Testimonial;