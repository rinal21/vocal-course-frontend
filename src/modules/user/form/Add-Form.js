import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class userAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
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

    return (
      <div>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={UserSchema}
          onSubmit={values => {
            const obj = {
              username: values.username,
              email: values.email,
              password: values.password,
              group: this.props.group
            };
            axios.post('http://localhost:8000/api/user', obj)
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

