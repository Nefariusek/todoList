import React, { Component } from 'react'
import TodoItem from './TodoItem'
import TodoHeader from "./TodoHeader"
import TodoFooter from "./TodoFooter"
import _ from 'underscore'
export default class TodoList extends Component {
    state={
        data:[],
        added:this.props.added,
        deleted:this.props.deleted,
        dataFromChild:[],
        currentRows:5,
        currentPage:1,
        sor:["text", true],    
    }
    myCallback = async (data) => {
        await this.setState({ dataFromChild:data});
        await  this.getDataFromStorage();
        if(this.state.dataFromChild[1]==="delete"){
         
           var i = this.state.dataFromChild[0];
            var tempData = this.state.data;
           await tempData.splice((this.state.currentPage-1)*(this.state.currentRows)+i,1)
          await localStorage.clear();
          for(var j = 0 ; j < tempData.length ; j++ ){
             localStorage.setItem(j, JSON.stringify(tempData[j]));
            
          }
          await    this.setState({});
          await this.setState({deleted:!this.state.deleted})
          await  this.getDataFromStorage();
        }

        if(this.state.dataFromChild[1]==="done"){            
            i = this.state.dataFromChild[0];
            i= (this.state.currentPage-1)*(this.state.currentRows)+i;
            tempData = this.state.data;
            if(this.state.data[i].text!==""){
            var todoObject = {
                text:this.state.data[i].text,
                priority:this.state.data[i].priority,
                done:!this.state.data[i].done,
                index:i,
               
            }
            
           await localStorage.setItem(i, JSON.stringify(todoObject));}
          await    this.setState({});
          await this.setState({deleted:!this.state.deleted})
          await  this.getDataFromStorage();  
        }
      };
      footerCallback = async (data) => {
        await this.setState({ currentRows:data[0]});
        await this.setState({ currentPage:data[1]});
        await    this.setState({data:[]});
        await  this.getDataFromStorage();
        await this.setState({data:this.state.data.slice((this.state.currentPage-1)*this.state.currentRows,(this.state.currentRows*this.state.currentPage))})
      };
      headerCallback = async (data) => {
        await  this.getDataFromStorage();
       await this.setState({sor:data})
     if(this.state.sor[0]==="text"){

         if(this.state.sor[1]===false)
         {var sortedObjs = await _.sortBy( this.state.data, this.state.sor[0] );
            await this.setState({data:sortedObjs})
        }else
        { sortedObjs = await _.sortBy( this.state.data, this.state.sor[0] ).reverse();
            await this.setState({data:sortedObjs})
        }}

        if(this.state.sor[0]==="priority"){
            if(this.state.sor[1]===false)
            { sortedObjs = await _.sortBy( this.state.data, this.state.sor[0] );
               await this.setState({data:sortedObjs})
           }else
           { sortedObjs = await _.sortBy( this.state.data, this.state.sor[0] ).reverse();
               await this.setState({data:sortedObjs})
           }}

           if(this.state.sor[0]==="done"){
            if(this.state.sor[1]===false)
            { sortedObjs = await _.sortBy( this.state.data, this.state.sor[0] ===true ).reverse();
               await this.setState({data:sortedObjs})
           }else
           { sortedObjs = await _.sortBy( this.state.data, this.state.sor[0] === false ).reverse();
               await this.setState({data:sortedObjs})
           }
      
    }
            var tempData = this.state.data;
          await localStorage.clear();
          for(var j = 0 ; j < tempData.length ; j++ ){
             localStorage.setItem(j, JSON.stringify(tempData[j])); 
          }
          await    this.setState({});
          await  this.getDataFromStorage();
          await this.setState({data:this.state.data.slice((this.state.currentPage-1)*5,(this.state.currentRows*this.state.currentPage))})
      };
    getDataFromStorage = async() =>{
        await    this.setState({data:[]});
        for (let i = 0; i < localStorage.length; i++) {
            var value=JSON.parse(localStorage.getItem(i))
            if(value!==null){
            this.state.data.push({
              key: value.index,
              text: value.text,
              priority: value.priority,
              done: value.done,
            });
        }
        }
    this.setState({});
    }
    componentDidUpdate=async(prevProps, prevState)=>{
     
        if(prevProps.added!==this.props.added){
        await    this.setState({data:[],added:!this.state.added});
      await  this.getDataFromStorage();
     await this.setState({});
    }     
    }
    componentDidMount=async()=>{
     await  this.getDataFromStorage();
     await this.setState({data:this.state.data.slice((this.state.currentPage-1)*5,(this.state.currentRows*this.state.currentPage))})
       this.setState({});
      }
    render() {
    
        return (<>
        <TodoHeader callbackFromParent={this.headerCallback} sorted={this.state.sor[0]}/>
          {this.state.data.length !== 0 ?<TodoItem value={this.state.data} callbackFromParent={this.myCallback}/> :
          <div className="empty-list">ADD SOME TASKS BELOW</div> }
                  <TodoFooter data={this.state.added} deleted={this.state.deleted} callbackFromParent={this.footerCallback} added={this.state.added}/>
           </>
        )
    }
}
