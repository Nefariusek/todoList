import React, { Component } from 'react'

export default class TodoInput extends Component {
    state = {
        text:'',
        priority:'',
        added:false
    }
    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
      };
      handleSubmit = async(event) => {
        var todoObject = {
            text:this.state.text,
            priority:this.state.priority,
            done:false,
            index:localStorage.length,   
        }
       await localStorage.setItem(localStorage.length, JSON.stringify(todoObject));
       await this.setState({text: '',priority:'' });
       this.props.callbackFromParent(!this.state.added);
       await event.preventDefault();
      }
    render() {
        return (
           
                <form className="form-container" onSubmit={this.handleSubmit}>                       
                <input required className="form-text" 
                placeholder=" What are your plans?" 
                name="text"
                type="text" 
                maxLength="20" 
                value={this.state.text}
                onChange={this.handleChange}
                />               
                <select  value={this.state.priority} onChange={this.handleChange} name="priority" className="form-select">
                <option value="" disabled defaultValue hidden>Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option  value="High">High</option>
                </select>
                <input  type="submit" className="form-button" value="ADD TO LIST"onChange={this.handleChange} />
                </form>
           
        )
    }
}