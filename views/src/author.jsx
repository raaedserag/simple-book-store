import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Table
} from 'reactstrap';
import { Link } from "react-router-dom";
import { Delete, GetAllAuthor } from './services/author';

class Author extends Component {
  state = {
    authors: []
  }
  async componentDidMount() {

    const authors = await GetAllAuthor();
    console.log(authors)
    this.setState({ authors }, () => {
      console.log(this.state.authors)
    })
  }
  handleDelete = async (id) => {
    const deletedItem = await Delete(id);
    console.log(deletedItem)
    // const authors = [...this.state.authors]
    // const newAuthores = authors.filter((i) => i.authorNumber !== deletedItem.authorNumber)
    const authors = await GetAllAuthor()
    this.setState({ authors }, () => {
      console.log(this.state.authors)
    })
    this.forceUpdate()
  }

  render() {


    return (
      <React.Fragment>


        <CardTitle tag="h5">Authors</CardTitle>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>





          <Table>
            <thead>
              <tr>
                <th> Number</th>
                <th> Name</th>
                <th>Year born</th>
                <th>Year died</th>


                <th>Action</th>
                <th> <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '105px', cursor: 'pointer' }}>
                  <Link to='/authorForm' style={{
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
              {this.state.authors.map(auth => {
                return (

                  <tr>
                    <th scope="row">{auth.authorNumber}</th>
                    <td>{auth.authorName}</td>
                    <td>{auth.yearBorn}</td>
                    <td>{auth.yearDied}</td>


                    <td>
                      <div>
                        <Link to={{ pathname: '/authorForm', state: { id: auth.authorNumber } }} style={{ margin: '5px' }} href="#">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <a onClick={() => { this.handleDelete(auth.authorNumber) }} style={{ margin: '5px', color: "red" }} href="#">
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

export default Author;