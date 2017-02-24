
// This component can be used for client side pagination
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const HgPaginationComp = React.createClass({
mixins:[PureRenderMixin],
  
    propTypes : {
        listOfItems:PropTypes.arrayOf(PropTypes.object),
        itemCount:PropTypes.number,
        onClick:PropTypes.func,
        rerenderItem:PropTypes.bool
    },   
    getInitialState: function(){
    return {
            currentPage:1,
            displayList:[]
        };
    },
    componentDidMount: function(){
        this.setState({displayList:this.renderList()});
    },

    renderList:function (){
            let displayList = [];
            
            this.props.listOfItems.map((renderElement)=>{
            displayList.push(renderElement);
            });
            
            if (this.state.currentPage === 1)
            {
            displayList.splice(((this.state.currentPage)*this.props.itemCount),this.props.listOfItems.length);
            }

            else{
            displayList.splice(((this.state.currentPage)*this.props.itemCount),this.props.listOfItems.length);
            displayList.splice(0,this.props.itemCount*(this.state.currentPage-1));
        }
    return displayList;
    },

     nextPage(){
     
      if (this.state.currentPage !== this.totalPage()){
         this.setState.currentPage = this.state.currentPage +1;
         this.state.currentPage = this.setState.currentPage;

      if (this.state.currentPage !== 1){
       this.setState({displayList:this.renderList()})
      }
      }
          if (this.state.currentPage == this.totalPage())
         {
            var node =ReactDOM.findDOMNode(this).offsetTop - 75;
            if(window && node > 0)
            {
                window.scrollTo(0,node);
            }
         }
         this.props.onClick(this.state.currentPage);
    },

    previousPage(){
        if (this.state.currentPage !==1){
            this.setState.currentPage = this.state.currentPage -1;
            this.state.currentPage = this.setState.currentPage;
            this.setState({displayList:this.renderList()})
        }
        this.props.onClick(this.state.currentPage);
    },

    totalPage(){
        if (this.props.listOfItems.length > this.props.itemCount){
            if(this.props.listOfItems.length%this.props.itemCount==0)
            {
        return parseInt(this.props.listOfItems.length/this.props.itemCount);
            }
            else{
        return parseInt(this.props.listOfItems.length/this.props.itemCount)+1;
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
            <div ref="elem" style={{top: '0px'}}>
                <div data-id="displayedItems">{this.state.displayList}</div>
                <div>{this.props.listOfItems.length > this.props.itemCount && renderPagination()}</div>
                {this.props.rerenderPagination?"":""}
            </div>
        )
    }
});

export default HgPaginationComp;