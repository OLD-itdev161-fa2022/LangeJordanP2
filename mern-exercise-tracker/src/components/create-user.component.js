import React, { Component } from "react";
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props); //always call super when defining sub class

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { // this is how you create variables in react this.state 
            username: '',
        }
    }

    onChangeUsername(e){ //doesn't set the state just changes it
        this.setState({
            username: e.target.value // e is the text in the text box, target tells it to target it 
        });
    }

    onSubmit(e) {
        e.preventDefault(); // prevents the default values

        const user = {
            username: this.state.username,
        }

        console.log(user) //console log so we can see our data inputted to the console.log

        axios.post('http://localhost:5000/users/add', user) //send the information to the backend
            .then(res => console.log(res.data)); //then take the result log it to the console

            this.setState({
                username:''
            })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}