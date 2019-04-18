import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class userAdd extends Component {
  constructor(props) {
    const { userId, email, username } = props
    super(props);
    
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: email,
      username: username,
      password: '',
      redirect: false
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })  
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      email: this.state.email,
      username: this.state.username,
      username: this.state.username
    };
    axios.patch('http://localhost:8000/api/user/'+this.props.userId, obj)
        .then(res => console.log(res.data))
        .then(() => this.setState({ redirect: true }));
  }

  render() {
    
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/user' />;
    }
    return (
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
              <div>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group mb-2">
                    <label for="username" class="mr-sm-2 text-left d-block" >
                      Username
                    </label>
                    <input 
                    type="text" 
                    class="form-control mr-sm-2 w-25" 
                    id="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                     />
                  </div>
                  <div className="form-group mb-2">
                    <label for="email" class="mr-sm-2 text-left d-block" >
                      Email
                    </label>
                    <input 
                    type="text" 
                    class="form-control mr-sm-2 w-25" 
                    id="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
                  </div>     
                  
                  <div className="form-group">
                    <button type="submit" class="btn btn-primary mb-2">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
        </Formik>
      </div>
    )
  }
}

