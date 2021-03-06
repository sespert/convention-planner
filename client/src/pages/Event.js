import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import "../../src/components/FormLogin/formLogin.css";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { List, ListItem } from "../components/List";
import EventBodyInfo from "../components/EventBodyInfo";
import '../components/Nav/nav.css';
import { setInStorage, getFromStorage } from "../utils/storage";
import axios from 'axios';

class Event extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			token: '',
			referrer: null,
			signInError: '',
			signInPassword: '',
			signInEmail: '',
			events: []
		};
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setTokenToZero = this.setTokenToZero.bind(this);

	}
	onChangeEmail(e) {
		this.setState({ signInEmail: e.target.value });
	}
	onChangePassword(e) {
		this.setState({ signInPassword: e.target.value });
	}
	handleSubmit(e) {
		e.preventDefault();
		//Grab State
		console.log("handlesubmit");
		const {
			signInEmail,
			signInPassword
		} = this.state;

		this.setState({
			isLoading: true
		})

		// post requires to backend
		API.signin({
			email: signInEmail,
			password: signInPassword
		}).then(data => {
			console.log(data);
			const response = data.data;
			if (response.success) {
				setInStorage('the_main_app', { token: response.token });
				this.setState({
					signInError: response.message,
					isLoading: false,
					signInEmail: '',
					signInPassword: '',
					token: response.token
				});
			} else {
				this.setState({
					signInError: response.message,
					isLoading: false
				});
			}
		})
	}

	setTokenToZero() {
		this.setState({ token: "0" });
	}

	componentDidMount() {
		console.log("starting token" + this.state.token);
		const obj = getFromStorage('the_main_app');
		console.log(obj);
		if (obj && obj.token) {

			//Verify token
			const { token } = obj;
			axios.get('api/user/verify?token=' + token).then(data => {

				const response = data.data;
				console.log(response);
				console.log(token);
				if (response.success) {
					console.log("this state " + this.state.token);

					this.setState({
						token: token,
						isLoading: false
					});
					console.log("this state 2 " + this.state);
				} else {
					this.setState({
						isLoading: false
					});
				}
			})
		} else {
			this.setState({
				isLoading: false
			});

		}
		this.loadEvents();
	}



	loadEvents = () => {
		API.getEvents()
			.then(res => {
				this.setState({ events: res.data });
			}
			)
			.catch(err => console.log(err));
	};

	toSingleEvent = (id) => {
		// e.preventDefault();
		this.setState({
			referrer: '/events/' + id,
			token: "0"
		});
	}

	render() {
		const {
			referrer,
			token,
			signInError,
			signInEmail,
			signInPassword
		} = this.state;

		if (referrer) return <Redirect to={{ pathname: referrer, state: { token: this.state.token } }} />;

		if (!token) {
			return (

				// <Container>
				<div className="container" id="mainContainer">
					<ul className="navbar-nav flex-row ml-md-auto link-cont">
						<li className="nav-item">
							<a className="nav-link guide-link mr-3" onClick={this.setTokenToZero} href="/events">Events Guide</a>
						</li>
						<li className="nav-item">
						</li>
					</ul>

					<div className="row justify-content-start">
						<div className="col-12 col-sm-7" id="conferenceInfo">
							<Jumbotron>
								<blockquote id="blockquote">
									<strong>Event</strong> <br></br> <em>information</em>
								</blockquote>
								<br />

								<List>
									<div id="listOne">
										{this.state.events.slice(0, 4).map((eve, i) => {
											return (
												<ListItem
													key={i}
													name={eve.name}
													id={eve._id}
													toSingleEvent={this.toSingleEvent}
												/>
											)
										})}
									</div>
								</List>

							</Jumbotron>
						</div>
						<div className="col-12 col-sm-5">
							<form id="form1">
								{
									(signInError) ? (
										<p>{signInError}</p>
									) : (null)
								}
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">Login</label>
									<input type="email" className="form-control" aria-describedby="emailHelp" name="email" placeholder="Enter email" value={signInEmail} onChange={this.onChangeEmail} />
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">Password</label>
									<input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" value={signInPassword} onChange={this.onChangePassword} />
								</div>

								<button type="submit" id="buttom" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
								<br></br>
								<br></br>
								<a className="link" id="registerLink" href="/register">Click to Register</a>
							</form>
						</div>
					</div>
					<EventBodyInfo />
				</div>
			);
		}
		// redirect to /events
		return <Redirect to={{ pathname: "/events", state: { token: this.state.token } }} />;
	}
}

export default Event;
