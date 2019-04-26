import React, { Component } from 'react';
import { Formik } from 'formik';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import moment from "moment";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

export default class userAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateAttend: new Date(),
      teachers: [],
      teacherId: '',
      selectedTeacher: null,
      // absent: 0,
      // vacation: 0,
      selectedAttendance: '',
      redirect: false
    };
    this.onChangeDateAttend = this.onChangeDateAttend.bind(this);
    this.onChangeTeachers = this.onChangeTeachers.bind(this);
    // this.onChangeAbsent = this.onChangeAbsent.bind(this);
    // this.onChangeVacation = this.onChangeVacation.bind(this);
    this.onChangeAttendance = this.onChangeAttendance.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeDateAttend = dateAttend => {
    this.setState({
      dateAttend: dateAttend
    });
  }

  onChangeTeachers = (selectedTeacher) =>  {
    this.setState({ selectedTeacher });
    this.setState({ teacherId: selectedTeacher.value})
  }
  onChangeAttendance = changeEvent => {
    this.setState({selectedAttendance: changeEvent.target.value})  
  }
  // onChangeAbsent = changeEvent => {
  //   this.setState({absent: changeEvent.target.value})  
  // }
  // onChangeVacation = changeEvent => {
  //   this.setState({vacation: changeEvent.target.value})  
  // }
  // onChangeAttend = changeEvent => {
  //   this.setState({attend: changeEvent.target.value})  
  // }

  componentDidMount = () => {
    // ajax call
    this.fetchTeachers()
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

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      teacherId: this.state.teacherId,
      dateAttend: moment(this.state.dateAttend).format("YYYY-MM-DD hh:mm:ss"),
      status: this.state.selectedAttendance,
      // vacation: this.state.vacation,
      // attend: this.state.attend,
    };
    axios.post('http://localhost:8000/api/teacherAttend', obj)
      .then(res => console.log(res.data))
      .then(() => this.setState({ redirect: true }))
      .catch(error => {
        console.log(error.message);
      })
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/teacher-attendance' />;
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
                  <div className="form-inline mb-2">
                    <label for="date" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Date
                    </label>
                    <label>: &nbsp;</label>
                    <DatePicker
                        selected={this.state.dateAttend}
                        onChange={this.onChangeDateAttend}
                        dateFormat="d-MM-yyyy"
                        peekNextMonth
                        dropdownMode="select"
                        className="form-control"
                      />
                  </div>
                  <div className="form-inline mb-2">
                    <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Teacher Name
                  </label>
                    <label>: &nbsp;</label>
                    <div style={{ display: 'inline-block', width: 223.2 }}>
                      <Select
                        value={this.state.selectedTeacher}
                        onChange={this.onChangeTeachers}
                        options={this.dataTeachers(this.state.teachers)}
                      />
                    </div>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="absent" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Attendance
                  </label>
                    <label>: &nbsp;</label>
                    <label class="radio-inline mr-2">
                      <input type="radio" name="optattandance" value="1"
                        checked={this.state.selectedAttendance === "1"}
                        onChange={this.onChangeAttendance} />Absent
                    </label>
                    <label class="radio-inline mr-2"><input type="radio" name="optattandance" value="2"
                      checked={this.state.selectedAttendance === "2"}
                      onChange={this.onChangeAttendance} />With Permission
                    </label>
                    <label class="radio-inline"><input type="radio" name="optattandance" value="3"
                      checked={this.state.selectedAttendance === "3"}
                      onChange={this.onChangeAttendance} />Attend
                    </label>
                  </div>
                  {/* <div className="form-inline mb-2">
                    <label for="permission" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Is Vacation
                  </label>
                    <label>: &nbsp;</label>
                    <label>
                      <input type="checkbox" name="vacation" value="1" class="checkbox"
                        checked={this.state.vacation === "1"}
                        onChange={this.onChangeVacation} />
                    </label>
                  </div>
                  <div className="form-inline mb-2">
                    <label for="permission" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Is Attend
                  </label>
                    <label>: &nbsp;</label>
                    <label>
                      <input type="checkbox" name="attend" value="1" class="checkbox"
                        checked={this.state.attend === "1"}
                        onChange={this.onChangeAttend} />
                    </label>
                  </div> */}
                  
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

