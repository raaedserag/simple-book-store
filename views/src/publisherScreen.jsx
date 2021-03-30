import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Table
} from 'reactstrap';
import { Link } from "react-router-dom";
import { Delete, GetAll } from './services/publisher';

class PublisherScreen extends Component {
  state = {
    data: []
  }
  async componentDidMount() {

    const data = await GetAll();
    console.log(data)
    this.setState({ data }, () => {
      console.log(this.state.data)
    })
  }
  handleDelete = async (id) => {
    const deletedItem = await Delete(id);
    console.log(deletedItem)

    const data = await GetAll()
    this.setState({ data }, () => {
      console.log(this.state.data)
    })


    this.forceUpdate()
  }
  render() {


    return (
      <React.Fragment>

        <CardTitle tag="h5">Publishers</CardTitle>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>





          <Table>
            <thead>
              <tr>
                <th> Name</th>
                <th>City</th>
                <th>Country</th>
                <th>President</th>
                {/* <th>Publication year</th> */}
                <th>Year Founded</th>

                <th>Action</th>
                <th> <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '105px', cursor: 'pointer' }}>
                  <Link to='/publisherForm' style={{
                    width: '30px', height: '30px', display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem", backgroundColor: "#0088cc",
                    color: "white",
                    fontSize: '1rem',
                    borderRadius: "5px",
                    margin: "0 0.5rem"
                  }}  >
                    <i className="fas fa-plus"></i>
                  </Link>
                </div></th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(d => {
                return (
                  <tr>
                    <th scope="row">{d.publisherName}</th>

                    <td>{d.city}</td>
                    <td>{d.country}</td>
                    <td>{d.president}</td>
                    <td>{d.yearFounded}</td>

                    <td>
                      <div>
                        <Link to={{ pathname: '/publisherForm', state: { id: d.publisherName } }} style={{ margin: '5px' }} href="#">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <a onClick={() => this.handleDelete(d.publisherName)} style={{ margin: '5px', color: 'red' }} href="#">
                          <i className="fas fa-trash-alt"></i>
                        </a>
                      </div>
                    </td>
                  </tr>)
              })}


            </tbody>
          </Table>





        </div>
      </React.Fragment>

    );
  }
};

export default PublisherScreen;