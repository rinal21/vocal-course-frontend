import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Select from 'react-select';

export default class userAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      branches: [],
      branchId: '',
      selectedBranch: null,
      note: ''
    };
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
  }

  onChangeBranch = (selectedBranch) =>  {
    this.setState({ selectedBranch });
    this.setState({ 
      branchId: selectedBranch.value
    })
  }

  onChangeNote(e) {
    this.setState({note: e.target.value})  
  }

  componentDidMount = () => {
    // ajax call
    this.fetchBranches()
  }

  fetchBranches = () => {
    fetch('http://103.30.247.147:8000/api/branches')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          branches: json.data
        })
      })
  }

  dataBranches = (classes) => {
    return (
      function () {
        let rowData = []

        classes.map((data, index) => {
          rowData.push({
            value: data.id,
            label: data.name,
          })
        })
        return rowData
      }()
    )
  };

  render() {
    const { redirect, selectedBranch, note } = this.state;
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
              group: this.props.group,
              branch: selectedBranch,
              note: note
            };
            axios.post('http://103.30.247.147:8000/api/user', obj)
              .then(res => console.log(res.data))
              .then(() => this.setState({ redirect: true }));
          }}>
          {({
            errors,
            touched
          }) => (
              <div>
                <Form>
                  <div className="form-inline mb-2">
                    <label for="username" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Username
                    </label>
                    <label>: &nbsp;</label>
                    <Field type="text" class="form-control mr-sm-2 w-25" name="username" />
                    {errors.username && touched.username ? (
                      <div style={{ color: 'red' }}>{errors.username}</div>
                    ) : null}
                  </div>
                  <div className="form-inline mb-2">
                    <label for="email" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Email
                    </label>
                    <label>: &nbsp;</label>
                    <Field type="text" class="form-control mr-sm-2 w-25" name="email" />
                    {errors.email && touched.email ? (
                      <div style={{ color: 'red' }}>{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-inline mb-2">
                    <label for="password" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Password
                    </label>
                    <label>: &nbsp;</label>
                    <Field type="password" class="form-control mr-sm-2 w-25" name="password" />
                    {errors.password && touched.password ? (
                      <div style={{ color: 'red' }}>{errors.password}</div>
                    ) : null}
                  </div>

                  

                  <div className="form-inline mb-2">
                    <label for="note" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Branch
                    </label>
                    <label>: &nbsp;</label>
                    <div style={{ display: 'inline-block', width: 223.2 }}>
                      <Select
                        value={this.state.selectedBranch}
                        onChange={this.onChangeBranch}
                        options={this.dataBranches(this.state.branches)}
                        isMulti={true}
                      />
                    </div>
                  </div>

                  <div className="form-inline mb-2">
                    <label for="note" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Note
                    </label>
                    <label>: &nbsp;</label>
                    <textarea rows="4" cols="50"
                      value={this.state.note}
                      onChange={this.onChangeNote} />
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

