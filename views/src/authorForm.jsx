import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, CardTitle } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { Add, Edit, GetItemById } from "./services/author";

class AuthorForm extends Component {
  state = {
    newItem: {
      authorName: "",

      yearBorn: "",
      yearDied: "",
    }
  }
  async componentDidMount() {
    if (this.props.location.state) {

      const data = await GetItemById(this.props.location.state.id)
      this.setState({ newItem: data[0] })
    }
  }
  handleCancel = (e) => {
    this.props.history.push('/author');
  }
  handleChange = (e) => {
    const newItem = { ...this.state.newItem };
    newItem[e.target.name] = e.target.value
    this.setState({ newItem })

  }
  handleAdd = async () => {
    if (this.props.location.state) {
      await Edit(this.state.newItem, this.props.location.state.id)
      this.props.history.push('/author');
    } else {
      await Add(this.state.newItem)
      this.props.history.push('/author');

    }

  }
  render() {

    return (
      <React.Fragment>


        <Form style={{ margin: '50px 150px 50px 150px' }}>
          <CardTitle tag="h5">Author Form</CardTitle>
          <FormGroup>
            <Label for="exampleEmail">Name *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="text" name='authorName' value={this.state.newItem.authorName} placeholder="author name.." />
          </FormGroup>

          <FormGroup>

            <Label for="exampleEmail"> Year born *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="text" value={this.state.newItem.yearBorn} name='yearBorn' />
          </FormGroup>
          <FormGroup>

            <Label for="exampleEmail"> Year dead *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="text" value={this.state.newItem.yearDied} name='yearDied' />
          </FormGroup>





          <Button style={{ margin: '10px' }} onClick={() => { this.handleAdd() }} color='primary'>Add</Button>
          <Button style={{ margin: '10px' }} onClick={() => { this.handleCancel() }} color='secondry'>Cancel</Button>
        </Form>
      </React.Fragment>
    );
  }

}

export default AuthorForm;