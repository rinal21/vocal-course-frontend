import React, { Component } from 'react';
import { Formik } from 'formik';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import moment from "moment";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";


export default class studentAttendances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateAttend: new Date(),
      students: [],
      studentId: '',
      selectedStudent: null,
      // absent: '',
      // permission: '',
      selectedAttendance: '',
      redirect: false
    };
    this.onChangeDateAttend = this.onChangeDateAttend.bind(this);
    this.onChangeStudents = this.onChangeStudents.bind(this);
    // this.onChangeAbsent = this.onChangeAbsent.bind(this);
    // this.onChangePermission = this.onChangePermission.bind(this);
    this.onChangeAttendance = this.onChangeAttendance.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeDateAttend = dateAttend => {
    this.setState({
      dateAttend: dateAttend
    });
    
  }

  onChangeStudents = (selectedStudent) =>  {
    this.setState({ selectedStudent });
    this.setState({ studentId: selectedStudent.value})
  }
  onChangeAttendance = changeEvent => {
    this.setState({selectedAttendance: changeEvent.target.value})  
  }
  // onChangeAbsent = changeEvent => {
  //   this.setState({absent: changeEvent.target.value})  
  // }
  // onChangePermission = changeEvent => {
  //   this.setState({permission: changeEvent.target.value})  
  // }
  // onChangeAttend = changeEvent => {
  //   this.setState({attend: changeEvent.target.value})  
  // }

  componentDidMount = () => {
    // ajax call
    this.fetchStudents()
    this.fetchDatas()
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

  fetchDatas = () => {
    const { studentId } = this.props
    fetch('http://localhost:8000/api/student_attendance/' + studentId)
      .then(response => response.json())
      .then((json) => {
        json.map((data, index) => {
          this.setState({
              selectedStudent: [{
                  value: data.student_id,
                  label: data.first_name + ' ' + data.middle_name + ' ' + data.last_name
              }],
              studentId: data.student_id,
              dateAttend: data.date,
              selectedAttendance: data.status,
              redirect: false
          })
        })
        this.setState({
          datas: json
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

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      studentId: this.state.studentId,
      dateAttend: moment(this.state.dateAttend).format("YYYY-MM-DD hh:mm:ss"),
      status: this.state.selectedAttendance,
      // permission: this.state.permission,
      // attend: this.state.attend,
    };
    axios.patch('http://localhost:8000/api/student_attendance/'+this.props.studentId, obj)
        .then(res => console.log(res.data))
        .then(() => this.setState({ redirect: true }))
        .catch(error => {
          console.log(error.message);
        })
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/student-attendance' />;
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
                    <label for="absent" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                      Attendance
                  </label>
                    <label>: &nbsp;</label>
                    <label class="radio-inline mr-2">
                      <input type="radio" name="optattandance" value="1"
                        checked={this.state.selectedAttendance == 1}
                        onChange={this.onChangeAttendance} />Absent
                    </label>
                    <label class="radio-inline mr-2"><input type="radio" name="optattandance" value="2"
                      checked={this.state.selectedAttendance == 2}
                      onChange={this.onChangeAttendance} />With Permission
                    </label>
                    <label class="radio-inline"><input type="radio" name="optattandance" value="3"
                      checked={this.state.selectedAttendance == 3}
                      onChange={this.onChangeAttendance} />Attend
                    </label>
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

