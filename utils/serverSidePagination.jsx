
// This component can be used for client side pagination
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const HgPaginationComp = React.createClass({
mixins:[PureRenderMixin],
  
    propTypes : {
        itemCountPerPage:PropTypes.number,
        totalItemCount:PropTypes.number,
        onClick:PropTypes.func,
        displayList:PropTypes.arrayOf(PropTypes.object)
    },    
    getInitialState: function(){
    return {
            currentPage:1
        };
    }, 

    componentDidMount: function(){
        this.render();
    },
     nextPage:function(e){
         var increaseNumber = true;
      if (this.state.currentPage == this.totalPage())
         {
             increaseNumber = false;
            var node =ReactDOM.findDOMNode(this).offsetTop - 75;
            if(window && node > 0)
            {
                window.scrollTo(0,node);
            }
         }
      if (increaseNumber && this.state.currentPage !== this.totalPage()){
          this.setState({currentPage: this.state.currentPage +1})
           if (typeof this.props.onClick === 'function') {
            this.props.onClick(this.state.currentPage+1);
        } 
      }
    },

    previousPage(){
        if (this.state.currentPage !==1){
            this.state.currentPage = this.state.currentPage-1;
            this.setState.currentPage = this.state.currentPage;
        }
         if (typeof this.props.onClick === 'function') {
            this.props.onClick(this.state.currentPage);
        }
    },

    totalPage(){
        if (this.props.totalItemCount > this.props.itemCountPerPage){
            if(this.props.totalItemCount%this.props.itemCountPerPage==0)
            {
                return parseInt(this.props.totalItemCount/this.props.itemCountPerPage);
            }
            else{
                return parseInt(this.props.totalItemCount/this.props.itemCountPerPage)+1;
            }
        }
  },

render (){

var renderPreviousPageBtn = function(){
    if (this.state.currentPage === 1)
    {
        return <a role="button" className={'pager-btn prev btn disabled'} onClick={this.previousPage}>
                    <span className={'hg3-i hg3-i-chevron-circle-left'}></span>
               </a>
    }
    else{
        return <a role="button" className={'pager-btn prev btn'} onClick={this.previousPage} data-id="previousPaginatoinBtn">
                    <span className={'hg3-i hg3-i-chevron-circle-left'}></span>
               </a>
    }
}.bind(this);

var renderNextPageBtn = function(){
    if (this.state.currentPage === this.totalPage())
    {
        return <a role="button" className={'pager-btn next disabled'} onClick={this.nextPage}>
                    <span className={'hg3-i hg3-i-chevron-circle-right'}></span>
               </a>
    }
    else{
        return <a role="button" className={'pager-btn next'} onClick={this.nextPage} data-id="nextPaginatoinBtn">
                    <span className={'hg3-i hg3-i-chevron-circle-right'}></span>
               </a>
    }
}.bind(this);

   var renderPagination=function(){
    return <div className="pagination">
                {renderPreviousPageBtn()} 
                <span className="pager-label" data-id="currentPage"> Page {this.state.currentPage} of {this.totalPage()} </span> 
                {renderNextPageBtn()}
            </div>
     }.bind(this);

        return(
            <div ref="elem" style={{top: '0px'}} data-id="displayedItemInPagination">
            {this.props.displayList}
                <div>{this.props.totalItemCount > this.props.itemCountPerPage && renderPagination()}</div>
            </div>
        )
    }
});

export default HgPaginationComp;