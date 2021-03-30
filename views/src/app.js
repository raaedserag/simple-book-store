import React, { Component } from "react";
import { Route, Switch, Redirect, Link, BrowserRouter } from "react-router-dom";
import Forms from "./publisherForm";
import NavBar from "./navBar";
import PublisherScreen from "./publisherScreen";
import Book from "./books";
import BookForm from "./bookForm";
import PublisherForm from "./publisherForm";
import Customer from "./customers";
import CustomerForm from "./customerForm";
import Author from "./author";
import AuthorForm from "./authorForm";
import Wrote from "./wrotes";
import WroteForm from "./wrotesForm";
import Sale from "./sales";
import SaleForm from "./saleForm";

class App extends Component {
  state = {};

  //   handleEdit = (itm) => {
  //     debugger;
  //     if (localStorage.getItem("userId") != itm.userId) {
  //       alert("You not authorized");
  //     } else {
  //       console.log(itm.id);
  //       const item = { ...this.state.item };
  //       item._id = itm._id;
  //       item.data.name = itm.data.name;
  //       item.data.description = itm.data.description;
  //       item.price = itm.price;
  //       item.discount = itm.discount;
  //       item.userId = itm.userId;

  //       item.categoryTpe = itm.categoryTpe;

  //       this.setState({ item });
  //       console.log(this.state.item);
  //     }
  //   };

  render() {
    return (
      // <div className="container">
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route from="/" exact to="/customer" component={Customer} />
            <Route path="/publisherScreen" component={PublisherScreen} />
            <Route path="/publisherForm" component={PublisherForm} />
            <Route path="/book" component={Book} />
            <Route path="/bookForm" component={BookForm} />
            <Route path="/customer" component={Customer} />
            <Route path="/customerForm" component={CustomerForm} />
            <Route path="/author" component={Author} />
            <Route path="/authorForm" component={AuthorForm} />
            <Route path="/wrote" component={Wrote} />
            <Route path="/wroteForm" component={WroteForm} />
            <Route path="/sale" component={Sale} />
            <Route path="/saleForm" component={SaleForm} />

            {/* <Route
              path="/editProduct"
              render={(props) => (
                <EditProduct {...props} item={this.state.item} />
              )}
            />
            <Route path="/login" component={Login} />

            <Route path="/addProduct" component={AddProduct} />
            <Route
              path="/details/:id"
              render={(props) => <Details {...props} />}
            />
            <Redirect from="/" exact to="/list" /> */}
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
