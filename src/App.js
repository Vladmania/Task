import './App.css';
import React from 'react';
import {v4} from "uuid"
import styled from 'styled-components'



const Styledh1 = styled.h1`
  width: 100%;
  font-size: 60px;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  text-rendering: optimizelegibility;
`
const Header = styled.header`
  text-align: center;
  position: relative; 
`
const DivApp = styled.div`
text-align: center;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px 0px, rgba(0, 0, 0, 0.1) 0px 25px 50px 0px;
`
const InputTodo = styled.input`
    padding: 16px 16px 16px 60px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    background: rgba(0, 0, 0, 0.004);
    position: relative;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    color: inherit;   
    box-sizing: border-box;    
    margin: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(153, 153, 153);
    border-image: initial;
`
const Ullist = styled.ul`
 padding: 0;
`
const Todolist = styled.li`
  display: flex;
  justify-content: space-between;
  list-style: none;
  font-size: 24px;
  padding: 10px 10px 15px 10px;
  border-bottom: rgba(53, 50, 50, 0.39) ridge 1px ;
`
const Todobutton = styled.button`
    background: none;
    border: none;
    color: red;
    cursor: pointer;`
    
const Footer = styled.footer`
   box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px, rgb(246, 246, 246) 0px 8px 0px -3px,
   rgba(0, 0, 0, 0.2) 0px 9px 1px -3px, rgb(246, 246, 246) 0px 16px 0px -6px, 
   rgba(0, 0, 0, 0.2) 0px 17px 2px -6px;`

const ItemLeft = styled.p`
   color: rgba(65, 62, 62, 0.726);
   display: flex;
   justify-content: start;
   margin: 0 0 -40px 10px;`
const Btn = styled.a`

  color: rgba(65, 62, 62, 0.726);
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
    &:hover{
      border: rgba(175, 47, 47, 0.1) ridge 1px;
    }`
const CollectionBtn = styled.div`
  text-align: center;
  margin: 20px 0 0 0;
  padding: 0 0 10px;
  @media(max-width: 430px){
    margin: 50px 0 0 0;
  }`
const ClearCompleted =styled.p`
  color: rgba(65, 62, 62, 0.726);
  display: flex;
  justify-content: end;
  padding: 0 10px 10px 0;
  margin: -28px 0 0 0;
  @media(max-width: 430px){
    margin: -58px 0 0 0;
    padding: 0 10px 50px 0;
  }`


class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      newItem: '',
      list:[],
      filter: 'all',
    }
  }

  updateInput(key, value){
      this.setState({
        [key]: value
      })
  }

  
  addItem(){
    const newItem = {
      id: v4(),
      value: this.state.newItem,
      status: false,  
    };
    const list = [...this.state.list];
    list.push(newItem);
    this.setState({
      list,
      newItem: "",
    })
  }
   
  doneTodo(id){
    const todoIndex = this.state.list.findIndex(item => item.id === id);
    const todo = this.state.list;
    todo[todoIndex].status = !todo[todoIndex].status;
    this.setState({
      todos: [...this.state.list]
    });
  }
  
  deleteItem(id){
    const list = [...this.state.list]
    const updatedList = list.filter(item => item.id !== id);

    this.setState({list: updatedList});
  }

  itemLeft(){
    const item = this.state.list.filter(item => item.status === false);
    return item.length
  }
  checkItem(){
    const item = this.state.list.filter(item => item.value === item.value);
    return item.length
  }
  checkСompleted(){
    const item = this.state.list.filter(item => item.status === true);
    return item.length
  }
  clearCompleted(){
       const list = [...this.state.list];
       const filtersActive = list.filter(item => item.status === false); 
       this.setState({list: filtersActive}) 
  }
  activeItem(){
    const list = [...this.state.list];
    const filtersActive = list.every(item => item.status === true); 
    return filtersActive
  }

  filter(filter){
  this.setState({filter})
}

  filterItem(item){
    switch(this.state.filter){
      case 'completed':
       return item.status
      case 'all':
        return true;
      case 'active':
        return !item.status;  
    }    
  }

  render() {
    return(
      
      <><Header >
        <Styledh1>Todos</Styledh1>
      </Header>
      <DivApp className="App">
      <InputTodo
            placeholder="What needs to be done?"
            value= {this.state.newItem}
            onChange={(e) => this.updateInput("newItem" ,e.target.value)}
            onKeyDown={(e) => e.key === "Enter" ? this.addItem(): ''} 
            />
                     
          <Ullist>
          {this.state.list.map(item => {
            
             return (
                
                <> {this.filterItem(item) ? <Todolist key={item.id}>
                  <div><input onChange={() => this.doneTodo(item.id)} className="checkboxTodo" type="checkbox"></input>
                  <label className={item.status ? "done" : ""}>{item.value}</label></div>
                  <Todobutton onClick={() => this.deleteItem(item.id)}>X</Todobutton>
                </Todolist>: ''}</>
              );
            })}
            </Ullist>
              {this.checkItem() > 0 ? <Footer className = "footer">
                <ItemLeft >{this.itemLeft() + " item left"}</ItemLeft>
                <CollectionBtn className ='collectionBtn'>
                <Btn href="#"  onClick={() =>this.filter('all')}>All</Btn>
                <Btn href="#"  onClick ={()=>this.filter('active')}>Active</Btn>
                <Btn href="#"  onClick={()=> this.filter('completed')}>Completed</Btn>
                </CollectionBtn>
               
                 {this.checkСompleted() > 0 ? 
                 <ClearCompleted onClick ={()=> this.clearCompleted()}>{'Clear completed'+ "[" + this.checkСompleted() + "]"}</ClearCompleted>: ""}
                
              </Footer>: ""}
        </DivApp></>    
    );
  }
}

  
export default App;