import React, { Component } from 'react'
import { FaTrash } from 'react-icons/fa';
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
export default class TodoItem extends Component {
    state={
        index:"",
        action:""
    }
      componentDidUpdate= async (prevProps, prevState) => {
        if(prevState.index!==this.state.index || prevState.action!==this.state.action ){  
            this.props.callbackFromParent([this.state.index, this.state.action]);
      }
       };
    render() {
        return (
           <>
           { this.props.value.map((val, key)=>(
                <div className='item-container'>      
                    {val.done ?  <div className="item-name-done"> {val.text} </div>: 
                        <div className="item-name-nodone"> {val.text} </div>}
                            
                        <div className="item-priority">  {val.priority}</div>
                        <div className="item-done">{val.done ?    
                       <ImCheckboxChecked className="icon-done" name={key} onClick={()=>this.setState({index:key,action:"done"})}/>:
                        <ImCheckboxUnchecked className="icon-nodone" name={key} onClick={()=>this.setState({index:key,action:"done"})}/>}  </div>
                        <div className="trash-icon"><FaTrash onClick={()=>this.setState({index:key,action:"delete"})}/></div>
                        
                        </div>
                   ))}               
              </>   
        )
    }
}
