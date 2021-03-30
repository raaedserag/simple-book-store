import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, CardTitle } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { GetAllAuthor } from "./services/author";
import { GetAll } from "./services/book";
import { Add, Edit, GetItemById } from "./services/wrotes";


class WroteForm extends Component {
  state = {
    authorList: [{ authorNumber: 0 }],
    bookList: [{ bookNumber: 0 }],
    newItem: {
      bookNumber: "",
      authorNumber: ""
    }
  }
  async componentDidMount() {
    const authorList = await GetAllAuthor();
    this.setState({ authorList })
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
    this.props.history.push('/wrote');
  }
  handleChange = (e) => {
    const newItem = { ...this.state.newItem };
    newItem[e.target.name] = e.target.value
    this.setState({ newItem })

  }
  handleAdd = async () => {
    if (this.props.location.state) {
      await Edit(this.state.newItem, this.props.location.state.id)
      this.props.history.push('/wrote');
    } else {
      await Add(this.state.newItem)
      this.props.history.push('/wrote');

    }

  }

  render() {

    return (
      <React.Fragment>


        <Form style={{ margin: '50px 150px 50px 150px' }}>
          <CardTitle tag="h5">Wrote Form</CardTitle>
          <FormGroup>
            <Label for="exampleSelect">Book Number *</Label>
            <Input onChange={(e) => this.handleChange(e)} value={this.state.newItem.bookNumber} name="bookNumber" type="select" id="exampleSelect">
              <option disabled></option>

              {this.state.bookList.map(d => {
                return (

                  <option>{d.bookNumber}</option>
                )

              })}
            </Input>

          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Author Number *</Label>
            <Input onChange={(e) => this.handleChange(e)} value={this.state.newItem.authorNumber} name="authorNumber" type="select" id="exampleSelect">
              <option disabled></option>

              {this.state.authorList.map(d => {
                return (

                  <option>{d.authorNumber}</option>
                )

              })}
            </Input>

          </FormGroup>






          <Button style={{ margin: '10px' }} onClick={() => { this.handleAdd() }} color='primary'>Add</Button>
          <Button style={{ margin: '10px' }} onClick={() => { this.handleCancel() }} color='secondry'>Cancel</Button>
        </Form>
      </React.Fragment>
    );
  }

}

export default WroteForm;