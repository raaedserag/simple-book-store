import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, CardTitle } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { GetAll } from "./services/book";
import { Add, Edit, GetItemById } from "./services/sales";
import { GetAllCstomer } from "./services/customer";

class SaleForm extends Component {
  state = {
    customerList: [{ customerNumber: 0 }],
    bookList: [{ bookNumber: 0 }],
    newItem: {
      bookNumber: "",
      customerNumber: "",
      date: new Date(),
      price: "",
      quantity: ""
    }
  }
  async componentDidMount() {
    const customerList = await GetAllCstomer();
    this.setState({ customerList })
    const bookList = await GetAll()
    this.setState({ bookList })

    if (this.props.location.state) {
      debugger
      const data = await GetItemById(this.props.location.state.id)
      this.setState({ newItem: data[0] }, () => {
        console.log(data, this.state.newItem)
      })
    }
  }
  handleCancel = (e) => {
    this.props.history.push('/sale');
  }
  handleChange = (e) => {
    const newItem = { ...this.state.newItem };
    newItem[e.target.name] = e.target.value
    this.setState({ newItem })

  }
  handleAdd = async () => {
    if (this.props.location.state) {
      await Edit(this.state.newItem, this.props.location.state.id)
      this.props.history.push('/sale');
    } else {
      await Add(this.state.newItem)
      this.props.history.push('/sale');

    }

  }

  render() {

    return (
      <React.Fragment>


        <Form style={{ margin: '50px 150px 50px 150px' }}>
          <CardTitle tag="h5">Sale Form</CardTitle>
          <FormGroup>
            <Label for="exampleSelect">Book Number *</Label>
            <Input onChange={(e) => this.handleChange(e)} value={this.state.newItem.bookNumber} type="select" name="bookNumber" id="exampleSelect">
              <option disabled></option>

              {this.state.bookList.map(d => {
                return (

                  <option>{d.bookNumber}</option>
                )

              })}
            </Input>

          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Customer Number *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="text" value={this.state.newItem.customerNumber} name="customerNumber" type="select" id="exampleSelect">
              <option disabled></option>

              {this.state.customerList.map(d => {
                return (

                  <option>{d.customerNumber}</option>
                )

              })}
            </Input>

          </FormGroup>

          <FormGroup>

            <Label for="exampleEmail">Date *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="text" value={this.state.newItem.date} name='date' type="date" />
          </FormGroup>



          <FormGroup>
            <Label for="exampleEmail">Price *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="text" value={this.state.newItem.price} name='price' type="text" placeholder="price.." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Quantity</Label>
            <Input type="number" onChange={(e) => this.handleChange(e)} value={this.state.newItem.quantity} name='quantity' placeholder="Quantity.." />
          </FormGroup>
          <Button style={{ margin: '10px' }} onClick={() => { this.handleAdd() }} color='primary'>Add</Button>
          <Button style={{ margin: '10px' }} onClick={() => { this.handleCancel() }} color='secondry'>Cancel</Button>
        </Form>
      </React.Fragment>
    );
  }

}

export default SaleForm;