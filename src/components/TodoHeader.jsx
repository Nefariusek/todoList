import React, { Component } from 'react';
import { IoIosArrowDown ,IoIosArrowUp} from "react-icons/io";

class TodoHeader extends Component {
    state={
        text:true,
        priority:true,
        done:true,
        sorted:""
    }
    handleChange = (e) => {
        
        const { name } = e.target;
        if(name === "text") {
            this.setState({text:!this.state.text})
            this.props.callbackFromParent(["text",this.state.text]);
            this.setState({sorted:"text"});
        }
        if(name === "priority") {
            this.setState({priority:!this.state.priority});
            this.props.callbackFromParent(["priority",this.state.priority]);
            this.setState({sorted:"priority"});
        }
        if(name === "done") {
            this.setState({done:!this.state.done});
            this.props.callbackFromParent(["done",this.state.done]);
            this.setState({sorted:"done"});
            
        }
    
      };
    
    render() {
        return (
            <div className="header">
          <div className="header-name"> <button onClick={this.handleChange} name="text" className="header-name-button">Task name</button> 

           {this.state.sorted==="text" 
           ? this.state.text === true  ? <div className="header-icon"><IoIosArrowDown /></div>: <div className="header-icon"><IoIosArrowUp /></div>  
           : <></>
          }
           
           </div>

          <div className="header-priority">   <button onClick={this.handleChange} name="priority" className="header-priority-button">Priority</button>
          {this.state.sorted==="priority" ? this.state.priority === true  ? <div className="header-icon"><IoIosArrowDown /></div>: <div className="header-icon"><IoIosArrowUp /></div>  
           : <></>
          }
           </div>

          <div className="header-done">  <button onClick={this.handleChange} name="done" className="header-done-button">Done</button>
          {this.state.sorted==="done"? this.state.done === true  ? <div className="header-icon"><IoIosArrowDown /></div>: <div className="header-icon"><IoIosArrowUp /></div>  
           : <></>
          }
           </div>
            </div>
        );
    }
}

export default TodoHeader;
