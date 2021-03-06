import axios from "axios";
import { func } from "prop-types";

export default {
  // Gets all events (1-3)
  getEvents: function() {
    return axios.get("/api/events");
  },
  // Gets the event with the given id (6)
  getEventsbyId: function(id) {
    return axios.get("/api/events/" + id);
  },
  findEventSession: function(token) {
    return axios.get("/events/api/events/findsession" + token);
  },
  getEventsByAdmin: function(id) {
    return axios.get("/api/events/admin/" + id);
  },
  // Deletes the event with the given id
  deleteEvent: function(id) {
    return axios.delete("/api/events/" + id);
  },
  // Saves an event to the database (4)
  saveEvent: function(eventData) {
    return axios.post("/api/events", eventData);
  },
  saveConference: function(conferenceData) {
    return axios.post("/api/conferences", conferenceData);
  },
  getConferences: function() {
    return axios.get("/api/conferences");
  },
  getConferencesbyEvent: function(id) {
    return axios.get("/api/conferences/" + id);
  },
  deleteConference: function(id) {
    return axios.delete("/api/conferences/" + id)
  },
  
  //Get google maps for the venue location
  getMap: function(query) {
    //GoogleMap API
    // return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  },
  getUsers: function() {
    return axios.get("/api/user");
  },
  //For the login
  signin: function (userData) {
    console.log (userData);
    return axios.post("/api/user/signin ", userData);
  },
  findSession:  function (sessionToken) {
    return axios.get("api/user/findsession/"+ sessionToken);
  },
  findConferenceSession: function (sessionToken) {
    return axios.get("/api/user/findsession/"+ sessionToken);
  },
  //Save user info (2)
  saveUser: function(userData) {    
    return axios.post("/api/user", userData);
  },
  getExactEmail: function(email) {
    return axios.get("/api/user", email);
  }, 
  saveConfToUser: function(data) {
    return axios.put("/api/user/", data);
  },
  getConferencesbyUserId: function(id) {
    return axios.get("/api/user/" + id);
  },
  deleteConfFromUser: function(data) {
    return axios.put("/api/user/conf", data);
  }
};
