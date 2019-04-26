import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Select from 'react-select';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class userAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentDate: new Date(),
      teachers: [],
      teacherId: '',
      selectedTeacher: '',
      students: [],
      studentId: '',
      selectedStudent: '',
      level: ''
    };
    this.onChangePaymentDate = this.onChangePaymentDate.bind(this);
    this.onChangeStudents = this.onChangeStudents.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onChangeLevel = this.onChangeLevel.bind(this);
  }

  onChangePaymentDate(date) {
    this.setState({
      paymentDate: date
    });
  }

  onChangeStudents = (selectedStudent) =>  {
    this.setState({ selectedStudent });
    this.setState({ studentId: selectedStudent.value})
  }
  onChangeTeacher = (selectedTeacher) =>  {
    this.setState({ selectedTeacher });
    this.setState({ teacherId: selectedTeacher.value})
  }
  onChangeLevel(e) {
    this.setState({level: e.target.value})  
  }

  componentDidMount = () => {
    // ajax call
    this.fetchTeachers()
    this.fetchStudents()
  }

  fetchTeachers = () => {
    fetch('http://localhost:8000/api/teachers')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          teachers: json.data
        })
      })
  }
  
  fetchStudents = () => {
    fetch('http://localhost:8000/api/students')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json.data
        })
      })
  }

  dataStudents = (students) => {
    return (
      function () {
        let rowData = []
        students.map((data) => {
          rowData.push({
            value: data.id,
            label: data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
          })
        })
        return rowData
      }()
    )
  }

  dataTeachers = (teachers) => {
    return (
      function () {
        let rowData = []
        teachers.map((data) => {
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
                <form action="/action_page.php">
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Teacher Name
                  </label>
                    <label>: &nbsp;</label>
                    <div style={{ display: 'inline-block', width: 223.2 }}>
                      <Select
                        value={this.state.selectedTeacher}
                        onChange={this.onChangeTeacher}
                        options={this.dataTeachers(this.state.teachers)}
                      />
                    </div>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Student Name
                  </label>
                    <label>: &nbsp;</label>
                    <div style={{ display: 'inline-block', width: 223.2 }}>
                      <Select
                        value={this.state.selectedStudent}
                        onChange={this.onChangeStudents}
                        options={this.dataStudents(this.state.students)}
                      />
                    </div>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="level" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Level
                    </label>
                    <label>: &nbsp;</label>
                    <select class="form-control" onChange={this.onChangeLevel} style={{width: 223.2}}>
                      <option value="">Choose One ..</option>
                      <option value="Basic 1">Basic 1</option>
                      <option value="Basic 2">Basic 2</option>
                      <option value="Middle 1">Middle 1</option>
                      <option value="Middle 2">Middle 2</option>
                      <option value="Pre Advance">Pre Advance</option>
                      <option value="Advance 1">Advance 1</option>
                      <option value="Advance 2">Advance 2</option>
                      <option value="Executive">Executive</option>
                      <option value="Group">Group</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="date" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Payment Date
                    </label>
                    <label>: &nbsp;</label>
                    <DatePicker
                        selected={this.state.paymentDate}
                        onChange={this.onChangePaymentDate}
                        dateFormat="d-MM-yyyy"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className="form-control"
                      />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="receipt" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Receipt Number
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="receipt" />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="cost" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Cost
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="cost" value="2.500.000" disabled />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="royalty" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Royalty
                    </label>
                    <label>: &nbsp;</label>
                    <input type="text" class="form-control mr-sm-2" id="royalty" value="2.500.000" disabled />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="note" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Note
                    </label>
                    <label>: &nbsp;</label>
                    <textarea class="form-control mr-sm-2" id="note" />
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

