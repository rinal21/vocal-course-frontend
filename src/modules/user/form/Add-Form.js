import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import moment from "moment";

export default class userAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      birthDate: new Date('2000-01-01'),
      groups: [],
      groupId: '',
      selectedGroup: '',
      branches: [],
      branchId: '',
      selectedBranch: null,
      selectedGender: '',
      note: ''
    };
    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
  }

  onChangeGender = changeEvent => {
    this.setState({ selectedGender: changeEvent.target.value })
  }

  onChangeBirthDate(date) {
    this.setState({
      birthDate: date
    });
  }

  onChangeGroup = (selectedGroup) =>  {
    this.setState({ selectedGroup });
    this.setState({ groupId: selectedGroup.value})
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
    this.fetchGroups()
  }

  fetchGroups = () => {
    fetch('http://localhost:8000/api/groups')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          groups: json.data
        })
      })
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

  dataGroups = (groups) => {
    return (
      function () {
        let rowData = []
        groups.map((data) => {
          rowData.push({
            value: data.id,
            label: data.name,
          })
        })
        return rowData
      }()
    )
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
    const { redirect, selectedBranch, note, groupId } = this.state;
    
    if (redirect) {
      if (groupId == 1)
        return <Redirect to={'/user-teacher'} />
      else if (groupId == 2)
        return <Redirect to={'/user-employee'} />
      else if (groupId == 3)
        return <Redirect to={'/user-admin'} />
      else if (groupId == 4)
        return <Redirect to={'/user-branch'} />
    }
    const EmployeeSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      salary: Yup.number()
        .min(100000, 'Too Few!')
        .max(1000000000, 'Too Much!'),
      address: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      noHp: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
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
            name: '',
            address: '',
            salary: "",
            noHp: '',
            email: '',
            gender: '',
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={groupId == 2 ? EmployeeSchema : UserSchema}
          onSubmit={values => {
            let obj = {}
            if(groupId != 1 && groupId != 2)
            {
              obj = {
                group: groupId,
                username: values.username,
                email: values.email,
                password: values.password,
                branch: selectedBranch,
                note: note
              }
            }

            if(groupId == 1)
            {
              obj = {
                group: groupId,
                username: values.username,
                email: values.email,
                password: values.password,
                name: values.name,
                salary: values.salary,
                branch: selectedBranch,
                note: note,
              };
            }

            if(groupId == 2)
            {
              obj = {
                group: groupId,
                username: values.username,
                email: values.email,
                password: values.password,
                branch: selectedBranch,
                note: note,
                name: values.name,
                gender: this.state.selectedGender,
                email: values.email,
                noHp: values.noHp,
                address: values.address,
                birthdate: moment(this.state.birthDate).format("YYYY-MM-DD")
              };
            }

            axios.post('http://localhost:8000/api/user', obj)
              .then(res => console.log(res.data))
              .then(() => this.setState({ redirect: true }));
          }}>
          {({
            errors,
            touched,
            values
          }) => (
              <div>
                <Form>
                  <div className="form-inline mb-2">
                      <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                        Group
                    </label>
                      <label>: &nbsp;</label>
                      <div style={{ display: 'inline-block', width: 290 }}>
                        <Select
                          value={this.state.selectedGroup}
                          onChange={this.onChangeGroup}
                          options={this.dataGroups(this.state.groups)}
                        />
                      </div>
                  </div>

                  {(groupId == 1 || groupId == 2) && (
                    <>
                      <div className="form-inline mb-2">
                        <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                          Name
                        </label>
                        <label>: &nbsp;</label>
                        <Field type="text" class="form-control mr-sm-2 w-25" name="name" />
                        {errors.name && touched.name ? (
                          <div style={{ color: 'red' }}>{errors.name}</div>
                        ) : null}
                      </div>
                    </>
                  )}

                  {groupId == 1 && (
                    <>
                      <div className="form-inline mb-2">
                        <label for="salary" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                          Salary
                        </label>
                        <label>: &nbsp;</label>
                        <Field type="text" class="form-control mr-sm-2 w-25" name="salary" value={(/^\d+$/.test(values.salary) || values.salary == '') ? values.salary : ''} />
                        {errors.salary && touched.salary ? (
                          <div style={{ color: 'red' }}>{errors.salary}</div>
                        ) : null}
                      </div>
                    </>
                  )}

                  {groupId == 2 && (
                    <>
                      <div className="form-inline mb-2">
                        <label for="gender" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                          Gender
                        </label>
                        <label>: &nbsp;</label>
                        <label class="radio-inline mr-2">
                          <input type="radio" name="optgender" value="F"
                            checked={this.state.selectedGender === "F"}
                            onChange={this.onChangeGender} />Female
                        </label>
                        <label style={{ marginRight: 10 }}>/</label>
                        <label class="radio-inline"><input type="radio" name="optgender" value="M"
                          checked={this.state.selectedGender === "M"}
                          onChange={this.onChangeGender} />Male
                        </label>
                      </div>

                      <div className="form-inline mb-2">
                        <label for="address" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                          Address
                        </label>
                        <label>: &nbsp;</label>
                        <Field type="text" class="form-control mr-sm-2 w-25" name="address" value={values.address} />
                        {errors.address && touched.address ? (
                          <div style={{ color: 'red' }}>{errors.address}</div>
                        ) : null}
                      </div>
                      <div className="form-inline mb-2">
                        <label for="noHp" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                          No HP
                        </label>
                        <label>: &nbsp;</label>
                        <Field type="text" class="form-control mr-sm-2 w-25" name="noHp" value={values.noHp} />
                        {errors.noHp && touched.noHp ? (
                          <div style={{ color: 'red' }}>{errors.noHp}</div>
                        ) : null}
                      </div>
                      <div className="form-inline mb-2">
                        <label for="birthdate" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                          Birth date
                        </label>
                        <label>: &nbsp;</label>
                        <DatePicker
                          selected={this.state.birthDate}
                          onChange={this.onChangeBirthDate}
                          dateFormat="d-MM-yyyy"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          className="form-control"
                        />
                      </div>
                    </>
                  )}

                  <br/>
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

