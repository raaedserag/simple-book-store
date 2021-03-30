import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, CardTitle } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { Add, Edit, GetItemById } from "./services/customer";

class CustomerForm extends Component {
  state = {
    newItem: {
      city: "",
      country: "",
      customerNumber: 1,
      name: "",
      state: "",
      street: "",
    }
  }
  async componentDidMount() {

    if (this.props.location.state) {

      const data = await GetItemById(this.props.location.state.id)
      this.setState({ newItem: data[0] })
    }
  }
  handleCancel = (e) => {
    this.props.history.push('/customer');
  }
  handleChange = (e) => {
    const newItem = { ...this.state.newItem };
    newItem[e.target.name] = e.target.value
    this.setState({ newItem })

  }
  handleAdd = async () => {
    if (this.props.location.state) {
      await Edit(this.state.newItem, this.props.location.state.id)
      this.props.history.push('/customer');
    } else {
      await Add(this.state.newItem)
      this.props.history.push('/customer');

    }

  }


  render() {

    return (
      <React.Fragment>


        <Form style={{ margin: '50px 150px 50px 150px' }}>
          <CardTitle tag="h5">Customer Form</CardTitle>

          <FormGroup>
            <Label for="exampleEmail"> Name *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="text" value={this.state.newItem.name} name='name' placeholder=" name.." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">ٍStreet</Label>
            <Input onChange={(e) => this.handleChange(e)} value={this.state.newItem.street} name='street' type="text" placeholder="pages number.." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">City</Label>
            <Input onChange={(e) => this.handleChange(e)} value={this.state.newItem.city} name='city' type="text" placeholder="pages number.." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">State</Label>
            <Input onChange={(e) => this.handleChange(e)} value={this.state.newItem.state} name='state' type="text" placeholder="publisher name.." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Country</Label>
            <Input onChange={(e) => this.handleChange(e)} value={this.state.newItem.country} name='country' type="text" placeholder="publisher name.." />
          </FormGroup>



          <Button style={{ margin: '10px' }} onClick={() => { this.handleAdd() }} color='primary'>Add</Button>
          <Button style={{ margin: '10px' }} onClick={() => { this.handleCancel() }} color='secondry'>Cancel</Button>
        </Form>
      </React.Fragment>
    );
  }

}

export default CustomerForm;