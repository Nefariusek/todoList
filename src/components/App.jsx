import React, { Component } from 'react';
import TodoList from "./TodoList"
import TodoInput from "./TodoInput"
import "./App.css"
import logo from "../img/polsource.png"
class App extends Component {
  state={
    added:false,
    data:[]
  }
  myCallbackOfAddition = async () => {
    await this.setState({ added:!this.state.added });
  };

  render() {
    return (
      <div>
      <div className="logo">
       <img src={logo} alt="logo-polsource" width="100%" height="100%"></img>
          </div>
              <div className="container">         
                <TodoList added={this.state.added} />            
              </div>
      <TodoInput callbackFromParent={this.myCallbackOfAddition}/>
   </div>
    );
  }
}

export default App;
