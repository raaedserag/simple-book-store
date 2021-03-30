import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText,CardTitle } from 'reactstrap';
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import { Add, Edit,GetItemById } from "./services/publisher";

class PublisherForm extends Component{
  state={
    newItem:{
      city: "",
      country: "",
      president: "",
      publisherName: "",
      yearFounded: ""
    }
  }
async componentDidMount(){
  
  if(this.props.location.state){
    debugger
    const data =await GetItemById(this.props.location.state.id)
    this.setState({newItem:data[0]})
  }
}
    handleCancel=(e)=>{
        this.props.history.push('/publisherScreen');
    }
    handleChange=(e)=>{
    const newItem = { ...this.state.newItem };
    newItem[e.target.name]=e.target.value
    this.setState({newItem})

    }
    handleAdd= async()=>{
      if(this.props.location.state){
        await Edit(this.state.newItem,this.props.location.state.id)
        this.props.history.push('/publisherScreen');
      }else{
        await Add(this.state.newItem)
        this.props.history.push('/publisherScreen');

      }
      
    }
    
    render(){

  return (
    <React.Fragment>


    <Form style={{margin:'50px 150px 50px 150px'}}>
    <CardTitle tag="h5">Publisher Form</CardTitle>
      <FormGroup>
        <Label for="exampleEmail"> Name *</Label>
        <Input onChange={(e)=>this.handleChange(e)} value={this.state.newItem.publisherName} name='publisherName' type="text" placeholder="name.." />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">City</Label>
        <Input onChange={(e)=>this.handleChange(e)} value={this.state.newItem.city} name='city' type="text" placeholder="city name.." />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Country</Label>
        <Input onChange={(e)=>this.handleChange(e)} value={this.state.newItem.country} name='country' type="text" placeholder="country name.." />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">President</Label>
        <Input onChange={(e)=>this.handleChange(e)} value={this.state.newItem.president} name='president' type="text" placeholder="president .." />
      </FormGroup>
      
      <FormGroup>
        <Label for="exampleEmail">Year Founded *</Label>
        <Input onChange={(e)=>this.handleChange(e)} value={this.state.newItem.yearFounded} name='yearFounded' type="text"  placeholder="year .." />
      </FormGroup>
     
      
      
     
 
     
      <Button style={{margin:'10px'}} onClick={()=>{this.handleAdd()}} color='primary'>Add</Button>
      <Button style={{margin:'10px'}} onClick={()=>{this.handleCancel()}} color='secondry'>Cancel</Button>
    </Form>
    </React.Fragment>
  );
}

}

export default PublisherForm;