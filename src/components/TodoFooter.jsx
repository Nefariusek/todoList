import React, { Component } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
class TodoFooter extends Component {
    state={
        rows:5,
        currentPage:1,
        length:0,
        added:this.props.added,
        deleted:this.props.deleted
    }
    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
      };
      componentDidUpdate = async (prevProps, prevState) =>{
          if(prevState.rows !== this.state.rows || prevState.currentPage !== this.state.currentPage){
        await this.props.callbackFromParent([this.state.rows,this.state.currentPage]);
        await this.setState({length:localStorage.length})
          }

          if(prevProps.added !== this.props.added || prevProps.deleted !== this.props.deleted){
            this.setState({length:localStorage.length})
            await this.props.callbackFromParent([this.state.rows,this.state.currentPage]);
          }
          
      }
       componentDidMount = async () =>{   
        await this.setState({length:localStorage.length}) 
      }
    render() {
        return (
            <div className="footer">
            <div className="footer-rows"> Rows per page:
            
            <select  value={this.state.rows} onChange={this.handleChange} name="rows" className="rows-select">
               
                 <option value="5">5</option>
                 <option value="10">10</option>
                 <option  value="15">15</option>
                 </select>
                 {this.state.length===0 ? 0:1+(this.state.rows*(this.state.currentPage-1))} -  {(this.state.rows*(this.state.currentPage))>this.state.length 
                 ?this.state.length :
                 (this.state.rows*(this.state.currentPage))} of {this.state.length}
            </div>
            <div className="pagination">
            {this.state.currentPage >1 ?
             <IoIosArrowBack  onClick={() => {this.setState({currentPage:this.state.currentPage-1})}}/> :
             <IoIosArrowBack />}
             {this.state.currentPage < this.state.length/this.state.rows ? <IoIosArrowForward  onClick={() => {this.setState({currentPage:this.state.currentPage+1})}}/>:
            <IoIosArrowForward /> }
        </div> </div>
        );
    }
}

export default TodoFooter;
