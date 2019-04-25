import React, { Component } from 'react';
import { Formik } from 'formik';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import moment from "moment";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

export default class studentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBirthDate: new Date('2000-01-01'),
      classes: [],
      teachers: [],
      classId: '',
      teacherId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      address: '',
      school: '',
      email: '',
      // birthDate: '',
      age: '',
      selectedSex: '',
      cellPhone: '',
      homePhone: '',
      responsible: '',
      selectedReason: '',
      instructorAudition: '',
      result: '',
      days: '',
      hours: '',
      selectedClass: null,
      selectedTeacher: null,
      redirect: false
    };
    this.onChangeClass = this.onChangeClass.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeMiddleName = this.onChangeMiddleName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeSchool = this.onChangeSchool.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeHomePhone = this.onChangeHomePhone.bind(this);
    this.onChangeCellPhone = this.onChangeCellPhone.bind(this);
    this.onChangeResponsible = this.onChangeResponsible.bind(this);
    this.onChangeInstructorAudition = this.onChangeInstructorAudition.bind(this);
    this.onChangeResult = this.onChangeResult.bind(this);
    this.onChangeDays = this.onChangeDays.bind(this);
    this.onChangeHours = this.onChangeHours.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeClass = (selectedClass) =>  {
    this.setState({ selectedClass });
    this.setState({ classId: selectedClass.value})
  }
  onChangeTeacher = (selectedTeacher) =>  {
    this.setState({ selectedTeacher });
    this.setState({ teacherId: selectedTeacher.value})
  }
  onChangeFirstName(e) {
    this.setState({firstName: e.target.value})  
  }
  onChangeMiddleName(e) {
    this.setState({middleName: e.target.value})  
  }
  onChangeLastName(e) {
    this.setState({lastName: e.target.value})  
  }
  onChangeAddress(e) {
    this.setState({address: e.target.value})  
  }
  onChangeSchool(e) {
    this.setState({school: e.target.value})  
  }
  onChangeEmail(e) {
    this.setState({email: e.target.value})  
  }
  onChangeAge(e) {
    this.setState({age: e.target.value})  
  }
  onChangeSex = changeEvent => {
    this.setState({selectedSex: changeEvent.target.value})  
  }
  onChangeHomePhone(e) {
    this.setState({homePhone: e.target.value})  
  }
  onChangeCellPhone(e) {
    this.setState({cellPhone: e.target.value})  
  }
  onChangeResponsible(e) {
    this.setState({responsible: e.target.value})  
  }
  onChangeReason = changeEvent => {
    this.setState({selectedReason: changeEvent.target.value})  
  }
  onChangeInstructorAudition(e) {
    this.setState({instructorAudition: e.target.value})  
  }
  onChangeResult(e) {
    this.setState({result: e.target.value})  
  }
  onChangeDays(e) {
    this.setState({days: e.target.value})  
  }
  onChangeHours(e) {
    this.setState({hours: e.target.value})  
  }

  onChangeBirthDate = selectedBirthDate => {
    // const formatBirthDate = moment(selectedBirthDate).format("DD-MM-YYYY");
    this.setState({
      selectedBirthDate: selectedBirthDate
    });
  }

  componentDidMount = () => {
    // ajax call
    this.fetchClasses()
    this.fetchTeachers()
  }

  fetchClasses = () => {
    fetch('http://localhost:8000/api/classes')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          classes: json.data
        })
      })
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

  dataClasses = (classes) => {
    return (
      function () {
        let rowData = []
        classes.map((data) => {
          rowData.push({
            value: data.id,
            label: data.name,
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

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      class: this.state.classId,
      teacher: this.state.teacherId,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      address: this.state.address,
      school: this.state.school,
      email: this.state.email,
      birthDate: moment(this.state.selectedBirthDate).format("YYYY-MM-DD hh:mm:ss"),
      age: this.state.age,
      sex: this.state.selectedSex,      
      cellPhone: this.state.cellPhone,
      homePhone: this.state.homePhone,
      responsible: this.state.responsible,
      reason: this.state.selectedReason,
      intructor: this.state.instructorAudition,
      result: this.state.result,
      days: this.state.days,
      hours: this.state.hours,
      // selectedClass: null,
      // selectedTeacher: null,
    };
    console.log(obj)
    axios.post('http://localhost:8000/api/student', obj)
        .then(res => console.log(res.data))
        .then(() => this.setState({ redirect: true }));
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/student' />;
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
              //     <form onSubmit={handleSubmit}>
              //     <div className="form-group">
              //     <label>First Name</label>
              //       <input
              //         type="email"
              //         name="email"
              //         onChange={handleChange}
              //         onBlur={handleBlur}
              //         value={values.email}
              //       />
              //       {errors.email && touched.email && errors.email}
              //     </div>
              //     <div className="form-group">
              //       <input
              //         type="password"
              //         name="password"
              //         onChange={handleChange}
              //         onBlur={handleBlur}
              //         value={values.password}
              //       />
              //       {errors.password && touched.password && errors.password}
              //     </div>
              //     <div className="form-group">
              //     <button type="submit" disabled={isSubmitting}>
              //       Submit
              //     </button>
              //     </div>

              //   </form>

              <div>
                <h5>Student Information</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                    <div class="row">
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="first" class="mr-sm-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="first"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                          />
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="middle" class="mr-sm-2">
                            Middle
                        </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="middle"
                            value={this.state.middleName}
                            onChange={this.onChangeMiddleName}
                          />
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="last" class="mr-sm-2">
                            Last
                          </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="last"
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="address" class="mr-sm-2">
                        Street Address
                      </label>
                      <input type="text" class="form-control mb-2 mr-sm-2" id="address" 
                      value={this.state.address}
                      onChange={this.onChangeAddress}/>
                    </div>
                    <div class="row">
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="school" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                            School
                          </label>
                          <input type="text" class="form-control mb-2 mr-sm-2" id="school"
                            value={this.state.school}
                            onChange={this.onChangeSchool} />
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="email" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                            Email
                          </label>
                          <input type="email" class="form-control mb-2 mr-sm-2" id="email" 
                            value={this.state.email}
                            onChange={this.onChangeEmail}/>
                        </div>
                      </div>
                    </div>                                           
                    <div class="row">
                      <div class="col-sm">
                      <div className="form-group">
                      <label for="birthdate" class="mr-sm-2 text-left d-block">
                        Birth date
                      </label>
                      <DatePicker
                        selected={this.state.selectedBirthDate}
                        onChange={this.onChangeBirthDate}
                        dateFormat="d-MM-yyyy"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className="form-control"
                      />
                      {/* <input type="text" class="form-control mb-2 mr-sm-2" id="birthdate" /> */}
                    </div>
                      </div>
                      <div class="col-sm">
                      <div className="form-group">
                      <label for="age" class="mr-sm-2 text-left d-block">
                        Age
                      </label>
                      <input type="text" class="form-control mt-2 mb-2 mr-sm-2" id="age" 
                            value={this.state.age}
                            onChange={this.onChangeAge}/>
                    </div>
                      </div>
                      <div class="col-sm">
                      <div className="form-group mb-2">
                      <label for="sex" class="mr-sm-2 text-left d-block">
                        Sex
                      </label>
                          <label class="radio-inline mr-2">
                            <input type="radio" name="optsex" value="F"
                              checked={this.state.selectedSex === "F"}
                              onChange={this.onChangeSex} />Female
                          </label>
                          <label style={{ marginRight: 10 }}>/</label>
                          <label class="radio-inline"><input type="radio" name="optsex" value="M"
                              checked={this.state.selectedSex === "M"}
                              onChange={this.onChangeSex} />Male
                          </label>
                    </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="cellphone" class="mr-sm-2 text-left d-block">
                            Cell Phone
                          </label>
                          <input type="text" class="form-control mb-2 mr-sm-2" id="cellphone" 
                            value={this.state.cellPhone}
                            onChange={this.onChangeCellPhone}/>
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group">
                          <label for="homephone" class="mr-sm-2 text-left d-block">
                            Home Phone No
                          </label>
                          <input type="text" class="form-control mb-2 mr-sm-2" id="homephone"
                            value={this.state.homePhone}
                            onChange={this.onChangeHomePhone} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 class="mt-4">Parents Information</h5>
                  <hr />
                  <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                    <div className="form-group">
                      <label for="school" class="mr-sm-2 text-left d-block" style={{ width: 180 }}>
                        Person responsible for bill
                    </label>
                      <input type="text" class="form-control mb-2 mr-sm-2" id="school"
                            value={this.state.responsible}
                            onChange={this.onChangeResponsible} />
                    </div>
                    <div className="form-group mb-2">
                      <label for="sex" class="mr-sm-2 text-left d-block" style={{ width: 180 }}>
                        Choose KBL because
                      </label>
                      <label class="radio-inline mr-3"><input type="radio" name="optreason" value="Friends"
                        checked={this.state.selectedReason === "Friends"}
                        onChange={this.onChangeReason} />Friends
                      </label>
                      <label class="radio-inline mr-3"><input type="radio" name="optreason" value="Event"
                        checked={this.state.selectedReason === "Event"}
                        onChange={this.onChangeReason} />Event
                        </label>
                      <label class="radio-inline mr-3"><input type="radio" name="optreason" value="Newspaper"
                        checked={this.state.selectedReason === "Newspaper"}
                        onChange={this.onChangeReason} />Newspaper
                      </label>
                      <label class="radio-inline mr-3"><input type="radio" name="optreason" value="Close to home/work"
                        checked={this.state.selectedReason === "Close to home/work"}
                        onChange={this.onChangeReason} />Close to home/work
                      </label>
                      <label class="radio-inline mr-3"><input type="radio" name="optreason" value="Internet"
                        checked={this.state.selectedReason === "Internet"}
                        onChange={this.onChangeReason} />Internet
                      </label>
                      <label class="radio-inline mr-3"><input type="radio" name="optreason" value="Brocures"
                        checked={this.state.selectedReason === "Brocures"}
                        onChange={this.onChangeReason} />Brocures
                      </label>
                      <label class="radio-inline mr-3"><input type="radio" name="optreason" value="Others"
                        checked={this.state.selectedReason === "Others"}
                        onChange={this.onChangeReason} />Others
                      </label>
                    </div>
                  </div>
                  <h5 class="mt-4">Audition Information</h5>
                  <hr />
                  <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                    <div className="form-group">
                      <label for="homephone" class="mr-sm-2 text-left d-block" style={{ width: 182 }}>
                        Instructor Audition
                      </label>
                      <input type="text" class="form-control mb-2 mr-sm-2" id="homephone" 
                            value={this.state.instructorAudition}
                            onChange={this.onChangeInstructorAudition}/>
                    </div>

                    <div className="form-group mb-2">
                      <label for="homephone" class="mr-sm-2 text-left d-block" onChange={this.onChangeResult} style={{ width: 182 }}>
                        Indicate audition results
                      </label>
                      <select class="form-control" onChange={this.onChangeResult}>
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

                    <div className="form-group mb-2">
                      <label for="homephone" class="mr-sm-2 text-left d-block" style={{ width: 182 }}>
                        The course will be followed
                      </label>
                      <Select
                        value={this.state.selectedClass}
                        onChange={this.onChangeClass}
                        options={this.dataClasses(this.state.classes)}
                      />
                    </div>
                  </div>

                  <h5 class="mt-4">Result</h5>
                  <hr />

                  <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                    <div class="row">
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="first" class="mr-sm-2">
                            Name of instructor
                        </label>
                          <Select
                            value={this.state.selectedTeacher}
                            onChange={this.onChangeTeacher}
                            options={this.dataTeachers(this.state.teachers)}
                          />
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="middle" class="mr-sm-2">
                            Days
                        </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="middle"
                            value={this.state.days}
                            onChange={this.onChangeDays}
                          />
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="form-group">
                          <label for="last" class="mr-sm-2">
                            Hours
                        </label>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            id="last"
                            value={this.state.hours}
                            onChange={this.onChangeHours}
                          />
                        </div>
                      </div>
                    </div>
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

