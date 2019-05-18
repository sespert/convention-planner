import React , { Component } from "react";
import { Container } from "../components/Grid";
// import { List, ListItem } from "../components/ListEvent";
import { ConferenceList, ConferenceListItem } from "../components/ListConferences";
import API from "../utils/API";
import moment from 'moment';


class UserEvent extends Component {
    state = {
        conferences : [],
        userId: null
    }
    
    componentDidMount() {
        // this.loadEventInfo(this.state.eId);
        this.loadConferences(userId);
    }

    loadConferences = id => {
        const list = [];
        API.getConferencesbyUserId(id) 
        .then(res=> {
            this.setState({ conferences: res.data.conferences })
            console.log(this.state.conferences)
            this.state.conferences.map((elem,i) => {
                API.getEventsbyId(elem.eventId).then(
                    res => {
                        list.push(res.data.name);

                    }
                    
                    // // this.state.eventName.concat(res.data.name)
                    // })
            )
            // this.state.conferences.map((elem,i) => {
                // elem.eventName = "java"
               
            })
            this.setState({eventName: list})
            console.log(list);
            console.log(this.state.eventName)
           

        })
        // .then(
        //     // API.getEventsbyId()
        // )
        .catch(err => console.log(err));
    }
    handleDelBtn = e => {
        e.preventDefault();
        alert("deleted");
         API.deleteConfFromUser({
            confId: e.target.id,
            userId: this.state.userId
        })
        .then(res => {
            console.log(res)
        })            
        .catch(err => console.log(err))
    }
     
    render() {
        return (
            <Container > 
                    <h1>See your agenda</h1>
                <a href={"events/" + this.state._id}>
                        <strong>
                          {this.state.name}
                        </strong>
                      </a>       
                <ConferenceList> 
                    {this.state.conferences.map(elem => {
                        return(
                        <ConferenceListItem 
                        key = {elem.title}
                        eventName = {elem.eventName}
                        title = {elem.title}
                        speakers = {elem.speakers}
                        description = {elem.description}
                        room = {elem.room}
                        date = {elem.day}
                        time = {elem.time}
                        duration = {elem.duration} 
                        id = {elem._id} 
                        delVal={"a"}   
                        handleDelBtn = {this.handleDelBtn} 
                        /> 
                        )
                       
                        } )}
                        
               </ConferenceList>
            </Container> 

        )
    }
}

export default UserEvent;