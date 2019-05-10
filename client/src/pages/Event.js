import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
import FormLogin from "../components/FormLogin";

class Event extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = () => {
    API.getEvents()
      .then(res =>{
        this.setState({ events: res.data});
      }
      )
      .catch(err => console.log(err));
  };


  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };



  render() {
    return (
      <Container>
        <article className="container">
          <Jumbotron>
            <blockquote>
              <strong>Conference</strong>  <em>information</em>
            </blockquote>
            <br></br>
            <List>
              {this.state.events.map((eve,i) => {
                return (
                  <ListItem 
                    key = {i}
                    name = {eve.name}
                    id = {eve._id} 
                  />
                )
              })}

            </List>
          </Jumbotron>

        </article>
        <FormLogin />

      </Container>
    );
  }
}

export default Event;