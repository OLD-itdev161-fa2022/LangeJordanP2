import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercise extends Component {
    constructor(props) {
        super(props); //always call super when defining sub class

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { // this is how you create variables in react this.state 
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() { //react component runs before anything loads
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length > 0) { //if there is more then 1 user
                this.setState({
                    users: response.data.map(user => user.username),
                })
            } // checks if theres is more then 1 users in the database
        })

        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            }) 
            .catch(function (error) {
                console.log(error);
            })


    }

    onChangeUsername(e){ //doesn't set the state just changes it
        this.setState({
            username: e.target.value // e is the text in the text box, target tells it to target it 
        });
    }

    onChangeDescription(e){ //doesn't set the state just changes it
        this.setState({
            description: e.target.value // e is the text in the text box, target tells it to target it 
        });
    }

    onChangeDuration(e){ //doesn't set the state just changes it
        this.setState({
            duration: e.target.value // e is the text in the text box, target tells it to target it 
        });
    }

    onChangeDate(date){ //doesn't set the state just changes it
        this.setState({
            date: date // e is the text in the text box, target tells it to target it 
        });
    }

    onSubmit(e) {
        e.preventDefault(); // prevents the default values

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise) //send the information to the backend
                .then(res => console.log(res.data)); //then take the result log it to the console

        window.location = '/' // takes the person back to the homepage after creating an exercise
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                                })
                            }    
                        </select>
                    </div>
                    <div className ="form-group">
                        <label>Description: </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />    
                    </div>
                    <div className="form-group">
                        <label>Duration: (in minutes) </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value=" Edit Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}