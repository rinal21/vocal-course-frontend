import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class userEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    axios.patch('http://103.30.247.147:8000/api/user/'+this.props.userId, obj)
        .then(res => console.log(res.data))
        .then(() => this.setState({ redirect: true }));
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/user' />;
    }
    const UserSchema = Yup.object().shape({
      username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    });
    
    const { email, username, userId } = this.props
    return (
      <div>
        <Formik
          initialValues={{
            username: username,
            email: email,
            password: "",
          }}
          validationSchema={UserSchema}
          onSubmit={values => {
            const obj = {
              username: values.username,
              email: values.email,
              password: values.password,
            };
            axios.patch('http://103.30.247.147:8000/api/user/'+userId, obj)
              .then(res => console.log(res.data))
              .then(() => this.setState({ redirect: true }));
          }}>
          {({
            errors,
            touched,
          }) => (
              <div>
                <Form>
                  <div className="form-group mb-2">
                    <label for="username" class="mr-sm-2 text-left d-block" >
                      Username
                    </label>
                    <Field type="text" class="form-control mr-sm-2 w-25" name="username" />
                    {errors.username && touched.username ? (
                      <div style={{ color: 'red' }}>{errors.username}</div>
                    ) : null}
                  </div>
                  <div className="form-group mb-2">
                    <label for="email" class="mr-sm-2 text-left d-block" >
                      Email
                    </label>
                    <Field type="text" class="form-control mr-sm-2 w-25" name="email" />
                    {errors.email && touched.email ? (
                      <div style={{ color: 'red' }}>{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-group mb-2">
                    <label for="password" class="mr-sm-2 text-left d-block" >
                      Password
                    </label>
                    <Field type="password" class="form-control mr-sm-2 w-25" name="password" />
                    {errors.password && touched.password ? (
                      <div style={{ color: 'red' }}>{errors.password}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <button type="submit" class="btn btn-primary mb-2">
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            )}
        </Formik>
      </div>
    )
  }
}