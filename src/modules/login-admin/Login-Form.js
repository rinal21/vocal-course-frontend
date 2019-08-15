import React, { Component } from "react";
import { MDBDataTable  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'

import axios from 'axios';

export default class loginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            selectedBranch: '',
            branchId: '',
            branches: [],
            user: {}
        };
        this.onChangeBranch = this.onChangeBranch.bind(this);
    }
  
    componentDidMount = () => {
        this.fetchBranches()
        document.body.classList.remove('hold-transition', 'skin-blue' ,'sidebar-mini')
        document.body.classList.add('hold-transition', 'login-page')
    }

    componentWillUnmount = () => {
        document.body.classList.remove('hold-transition', 'login-page')
        document.body.classList.add('hold-transition', 'skin-blue' ,'sidebar-mini')
    }

    fetchBranches = () => {
        fetch('http://localhost:8000/api/branches')
          .then(response => response.json())
          .then((json) => {
            this.setState({
              branches: json.data
            })
          })
      }

    onChangeBranch = (selectedBranch) =>  {
        this.setState({ selectedBranch });
        this.setState({ branchId: selectedBranch.value })
    }

    dataBranches = (branches) => {
        return (
          function () {
            let rowData = []
            branches.map((data) => {
              rowData.push({
                value: data.id,
                label: data.name,
              })
            })
            return rowData
          }()
        )
      }

    render() {
        const ClassSchema = Yup.object().shape({
            username: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required')
        });

        const { isLoggedIn } = this.state;
        if (isLoggedIn) {
            // return <Redirect to='/class' />;
            window.location.replace('/')
        }

        return (
            <div>
                <Formik
                    initialValues={{ 
                        username: "",
                        password: ""
                 }}
                    validationSchema={ClassSchema}
                    onSubmit={values => {
                        const obj = {
                            username: values.username,
                            password: values.password
                        };
                        // axios.post('http://localhost:8000/api/class', obj)
                        //     .then(res => console.log(res.data))
                        //     .then(() => this.setState({ redirect: true }));
                        axios.post("http://localhost:8000/api/user/login", obj)
                            .then(response => {
                                console.log(response);
                                return response;
                            })
                            .then(json => {
                                if (json.data.success) {
                                    let userData = {
                                        username: json.data.data.username,
                                        id: json.data.data.id,
                                        email: json.data.data.email,
                                        auth_token: json.data.data.auth_token,
                                        branchId: json.data.data.branch_id,
                                        branchName: json.data.data.branch_name,
                                        roleId: json.data.data.role_id,
                                        timestamp: new Date().toString()
                                    };
                                    let appState = {
                                        isLoggedIn: true,
                                        isLogout: false,
                                        user: userData,
                                    };
                                    // save app state with user date in local storage
                                    localStorage["appState"] = JSON.stringify(appState);
                                    this.setState({
                                        isLoggedIn: appState.isLoggedIn,
                                        user: appState.user
                                    });
                                    console.log('coba '+JSON.parse(localStorage["appState"]).isLoggedIn)
                                } else alert("Login Failed!")
                            })
                            .catch(error => {
                                alert(`An Error Occured! ${error}`);
                            });
                    }}
                >
                    {({
                        errors,
                        touched,
                    }) => (
                            <div>
                                <Form>
                                    <div className="login-box">
                                        <div className="login-logo">
                                            <a><b>Login</b>Admin</a>
                                        </div>
                                        <div className="login-box-body">
                                            <p className="login-box-msg">Sign in to start your session</p>
                                            <form action="" method="post">
                                                <div className="form-group has-feedback">
                                                    <Field type="text" class="form-control" name="username" placeholder="Username" />
                                                    {errors.username && touched.username ? (
                                                        <div style={{ color: 'red' }}>{errors.username}</div>
                                                    ) : null}
                                                    {/* <input type="text" name="username" className="form-control" placeholder="Username" required=" " /> */}
                                                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                                                </div>
                                                <div className="form-group has-feedback">
                                                    <Field type="password" class="form-control" name="password" placeholder="password" />
                                                    {errors.password && touched.password ? (
                                                        <div style={{ color: 'red' }}>{errors.password}</div>
                                                    ) : null}
                                                    {/* <input type="password" name="password" className="form-control" placeholder="Password" required=" " /> */}
                                                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                                </div>
                                                {/* <div className="form-group has-feedback">
                                                    <Select
                                                        value={this.state.selectedBranch}
                                                        onChange={this.onChangeBranch}
                                                        options={this.dataBranches(this.state.branches)}
                                                    />
                                                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                                </div> */}

                                                <div className="row" style={{ marginLeft: 0 }}>
                                                    <div className="col-xs-4">
                                                        <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        )}
                </Formik>
            </div>
        )
    }
}


