import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, CardTitle } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { Add, Edit, GetItemById } from "./services/book";
import { GetAll } from "./services/publisher";


class BookForm extends Component {
  state = {
    publisherNameList: [],
    newItem: {

      bookName: "",
      publicationYear: 0,
      pages: "",
      publisherName: ""
    }
  }
  async componentDidMount() {


    const publisherNameList = await GetAll();


    this.setState({ publisherNameList }, () => {
      console.log(this.state.publisherNameList)
    })
    if (this.props.location.state) {
      debugger
      const data = await GetItemById(this.props.location.state.id)
      this.setState({ newItem: data[0] })
    }
  }
  handleCancel = (e) => {
    this.props.history.push('/book');
  }
  handleChange = (e) => {
    const newItem = { ...this.state.newItem };
    newItem[e.target.name] = e.target.value
    this.setState({ newItem })

  }
  handleAdd = async () => {
    if (this.props.location.state) {
      await Edit(this.state.newItem, this.props.location.state.id)
      this.props.history.push('/book');
    } else {
      await Add(this.state.newItem)
      this.props.history.push('/book');

    }

  }

  render() {

    return (
      <React.Fragment>


        <Form style={{ margin: '50px 150px 50px 150px' }}>
          <CardTitle tag="h5">Book Form</CardTitle>
          <FormGroup>
            <Label for="exampleEmail">Book Name *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="text" name="bookName" value={this.state.newItem.bookName} placeholder="book name.." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Pages *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="text" value={this.state.newItem.pages} name='pages' placeholder="pages number.." />
          </FormGroup>


          <FormGroup>
            <Label for="exampleSelect">Publisher Name *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="select" name="publisherName" value={this.state.newItem.publisherName} id="exampleSelect">
              <option disabled></option>

              {this.state.publisherNameList.map(d => {
                return (

                  <option>{d.publisherName}</option>
                )

              })}

            </Input>

          </FormGroup>
          <FormGroup>

            <Label for="exampleEmail">Publication Year *</Label>
            <Input onChange={(e) => this.handleChange(e)} type="text" value={this.state.newItem.publicationYear} name='publicationYear' />
          </FormGroup>





          <Button style={{ margin: '10px' }} onClick={() => { this.handleAdd() }} color='primary'>Add</Button>
          <Button style={{ margin: '10px' }} onClick={() => { this.handleCancel() }} color='secondry'>Cancel</Button>
        </Form>
      </React.Fragment>
    );
  }

}

export default BookForm;