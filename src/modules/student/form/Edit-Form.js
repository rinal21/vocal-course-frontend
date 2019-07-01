import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import moment from "moment";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

export default class studentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBirthDate: new Date(),
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
      birthDate: '',
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
      redirect: false,
      imgPreviewUrl: '',
      isLoaded: false
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
    this.onChangeSignature = this.onChangeSignature.bind(this);
  }

  onChangeSignature(e) {
    let reader = new FileReader()

    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      this.setState({ imgPreviewUrl: reader.result})
    }

    this.setState({ signature: e.target.files[0] });
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
    const formatBirthDate = moment(selectedBirthDate).format("DD-MM-YYYY");
    this.setState({
      birthDate: formatBirthDate,
      selectedBirthDate: selectedBirthDate
    });
    
  }

  componentDidMount = () => {
    // ajax call
    this.fetchClasses()
    this.fetchTeachers()
    this.fetchDatas()
  }

  fetchDatas = () => {
    const { studentId } = this.props
    fetch('http://localhost:8000/api/student/' + studentId)
      .then(response => response.json())
      .then((json) => {
        json.map((data, index) => {
          this.setState({
            selectedClass: [{
              value: data.class_id,
              label: data.class_name
            }],
            selectedTeacher: [{
              value: data.teacher_id,
              label: data.teacher_name
            }],
            classId: data.class_id,
            teacherId: data.teacher_id,
            firstName: data.first_name,
            middleName: data.middle_name,
            lastName: data.last_name,
            address: data.street_address,
            school: data.school,
            email: data.email,
            selectedBirthDate: data.birth_date,
            age: data.age,
            selectedSex: data.sex,
            cellPhone: data.cell_phone,
            homePhone: data.home_phone_no,
            responsible: data.person_responsible_for_bill,
            selectedReason: data.reason_choose_us,
            instructorAudition: data.instructor_audition,
            result: data.audition_results,
            days: data.result_days,
            hours: data.result_hours,
            imgPreviewUrl: 'http://localhost:8000/signature/'+data.signature_img_url
          })
        })
        this.setState({isLoaded: true})
      })
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

  dataTeachers = (classes) => {
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
      birthDate: this.state.selectedBirthDate,
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
    axios.patch('http://localhost:8000/api/student/'+this.props.studentId, obj)
        .then(res => console.log(res.data))
        .then(() => this.setState({ redirect: true }));
  }

  render() {
    const { status } = this.props;
    const { redirect, isLoaded, imgPreviewUrl } = this.state;
    let $imagePreview = null;
    if (redirect) {
      if (status == 2)
        return <Redirect to='/student-unpaid' />;
      else if (status == 3)
        return <Redirect to='/student-paid' />;
      else if (status == 4)
        return <Redirect to='/student-paid' />;
    }

    if (imgPreviewUrl) {
      $imagePreview = (<img src={imgPreviewUrl} style={{height: 200}}/>);
    }

    const StudentSchema = Yup.object().shape({
      firstName: Yup.string()
        .min(3, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
      middleName: Yup.string()
        .min(3, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
      lastName: Yup.string()
        .min(3, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
      address: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      school: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      age: Yup.number()
        .min(8, 'Too Young!')
        .max(60, 'Too Old!')
        .required('Required'),
      cellPhone: Yup.string()
        .min(4, 'Too Short!')
        .max(13, 'Too Long!')
        .required('Required'),
      homePhone: Yup.string()
        .min(4, 'Too Short!')
        .max(13, 'Too Long!')
        .required('Required'),
      responsible: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      // instructor: Yup.string()
      //   .min(3, 'Too Short!')
      //   .max(50, 'Too Long!')
      //   .required('Required'),
      // days: Yup.number()
      //   .min(2, 'Too Short!')
      //   .max(360, 'Too Long!')
      //   .required('Required'),
      // hours: Yup.number()
      //   .min(2, 'Too Short!')
      //   .max(365, 'Too Long!')
      //   .required('Required'),
    });
    return (
      <div>
        {isLoaded && (
        <Formik
        initialValues={{
          firstName: this.state.firstName,
          middleName: this.state.middleName,
          lastName: this.state.lastName,
          address: this.state.address,
          school: this.state.school,
          email: this.state.email,
          age: this.state.age,
          cellPhone: this.state.cellPhone,
          homePhone: this.state.homePhone,
          responsible: this.state.responsible,
          instructor: this.state.instructorAudition,
          days: this.state.days,
          hours: this.state.hours,
         }}
        validationSchema={StudentSchema}
            onSubmit={values => {
              if (this.props.status == 4 || this.props.status == 2) {
                const obj = {
                  class: this.state.classId,
                  teacher: this.state.teacherId,
                  firstName: values.firstName,
                  middleName: values.middleName,
                  lastName: values.lastName,
                  address: values.address,
                  school: values.school,
                  email: values.email,
                  birthDate: moment(this.state.selectedBirthDate).format("YYYY-MM-DD hh:mm:ss"),
                  age: values.age,
                  sex: this.state.selectedSex,
                  cellPhone: values.cellPhone,
                  homePhone: values.homePhone,
                  responsible: values.responsible,
                  reason: this.state.selectedReason,
                  instructor: values.instructor,
                  result: this.state.result,
                  days: values.days,
                  hours: values.hours,
                  status: this.props.status,
                };
                const formData = new FormData();
                formData.append('signature', this.state.signature);
                formData.append('picName', values.firstName + this.state.classId + '.png');
                const config = {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                };
                console.log(obj)
                axios.patch('http://localhost:8000/api/student/' + this.props.studentId, obj)
                  .then(res => console.log(res.data))
                  .then(axios.post("http://localhost:8000/api/student/upload", formData, config)
                    .then(() => {
                      alert("The file is successfully uploaded");
                    }))
                  .then(() => this.setState({ redirect: true }));
              } else {
                const obj = {
                  status: this.props.status,
                };
                console.log(obj)
                axios.patch('http://localhost:8000/api/student_status/' + this.props.studentId, obj)
                  .then(res => console.log(res.data))
                  .then(() => this.setState({ redirect: true }));
              }
            }
          }
      >
        {({
          errors,
          touched,
          values,
        }) => (
                <div>
                  <h5>Student Information</h5>
                  <hr />
                  <Form>
                    <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                      <div class="row">
                        <div class="col-sm">
                          <div className="form-group">
                            <label for="first" class="mr-sm-2">
                              First Name <label style={{color: 'red'}}>*</label>
                        </label>
                            {/* <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="first"
                          value={this.state.firstName}
                          onChange={this.onChangeFirstName}
                        /> */}
                            <Field type="text" class="form-control mb-2 mr-sm-2" name="firstName" />
                            {errors.firstName && touched.firstName ? (
                              <div style={{ color: 'red' }}>{errors.firstName}</div>
                            ) : null}
                          </div>
                        </div>
                        <div class="col-sm">
                          <div className="form-group">
                            <label for="middle" class="mr-sm-2">
                              Middle <label style={{color: 'red'}}>*</label>
                      </label>
                            {/* <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="middle"
                          value={this.state.middleName}
                          onChange={this.onChangeMiddleName}
                        /> */}
                            <Field type="text" class="form-control mb-2 mr-sm-2" name="middleName" />
                            {errors.middleName && touched.middleName ? (
                              <div style={{ color: 'red' }}>{errors.middleName}</div>
                            ) : null}
                          </div>
                        </div>
                        <div class="col-sm">
                          <div className="form-group">
                            <label for="last" class="mr-sm-2">
                              Last <label style={{color: 'red'}}>*</label>
                        </label>
                            {/* <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="last"
                          value={this.state.lastName}
                          onChange={this.onChangeLastName}
                        /> */}
                            <Field type="text" class="form-control mb-2 mr-sm-2" name="lastName" />
                            {errors.lastName && touched.lastName ? (
                              <div style={{ color: 'red' }}>{errors.lastName}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="address" class="mr-sm-2">
                          Street Address <label style={{color: 'red'}}>*</label>
                    </label>
                        {/* <input type="text" class="form-control mb-2 mr-sm-2" id="address" 
                    value={this.state.address}
                    onChange={this.onChangeAddress}/> */}
                        <Field type="text" class="form-control mb-2 mr-sm-2" name="address" />
                        {errors.address && touched.address ? (
                          <div style={{ color: 'red' }}>{errors.address}</div>
                        ) : null}
                      </div>
                      <div class="row">
                        <div class="col-sm">
                          <div className="form-group">
                            <label for="school" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                              School <label style={{color: 'red'}}>*</label>
                        </label>
                            {/* <input type="text" class="form-control mb-2 mr-sm-2" id="school"
                          value={this.state.school}
                          onChange={this.onChangeSchool} /> */}
                            <Field type="text" class="form-control mb-2 mr-sm-2" name="school" />
                            {errors.school && touched.school ? (
                              <div style={{ color: 'red' }}>{errors.school}</div>
                            ) : null}
                          </div>
                        </div>
                        <div class="col-sm">
                          <div className="form-group">
                            <label for="email" class="mr-sm-2 text-left d-block" style={{ width: 140 }}>
                              Email <label style={{color: 'red'}}>*</label>
                        </label>
                            {/* <input type="email" class="form-control mb-2 mr-sm-2" id="email" 
                          value={this.state.email}
                          onChange={this.onChangeEmail}/> */}
                            <Field type="text" class="form-control mb-2 mr-sm-2" name="email" />
                            {errors.email && touched.email ? (
                              <div style={{ color: 'red' }}>{errors.email}</div>
                            ) : null}
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
                              Age <label style={{color: 'red'}}>*</label>
                    </label>
                            {/* <input type="text" class="form-control mt-2 mb-2 mr-sm-2" id="age" 
                          value={this.state.age}
                          onChange={this.onChangeAge}/> */}
                            <Field type="text" class="form-control mt-2 mb-2 mr-sm-2" name="age" value={(/^\d+$/.test(values.age) || values.age == '') ? values.age : ''} />
                            {errors.age && touched.age ? (
                              <div style={{ color: 'red' }}>{errors.age}</div>
                            ) : null}
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
                              Cell Phone <label style={{color: 'red'}}>*</label>
                        </label>
                            {/* <input type="text" class="form-control mb-2 mr-sm-2" id="cellphone" 
                          value={this.state.cellPhone}
                          onChange={this.onChangeCellPhone}/> */}
                            <Field type="text" class="form-control mb-2 mr-sm-2" name="cellPhone" value={(/^\d+$/.test(values.cellPhone) || values.cellPhone == '') ? values.cellPhone : ''} />
                            {errors.cellPhone && touched.cellPhone ? (
                              <div style={{ color: 'red' }}>{errors.cellPhone}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="form-group">
                            <label for="homephone" class="mr-sm-2 text-left d-block">
                              Home Phone No <label style={{color: 'red'}}>*</label>
                        </label>
                            {/* <input type="text" class="form-control mb-2 mr-sm-2" id="homephone"
                          value={this.state.homePhone}
                          onChange={this.onChangeHomePhone} /> */}
                            <Field type="text" class="form-control mt-2 mb-2 mr-sm-2" name="homePhone" value={(/^\d+$/.test(values.homePhone) || values.homePhone == '') ? values.homePhone : ''} />
                            {errors.homePhone && touched.homePhone ? (
                              <div style={{ color: 'red' }}>{errors.homePhone}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <h5 class="mt-4">Parents Information</h5>
                    <hr />
                    <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                      <div className="form-group">
                        <label for="school" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
                          Person responsible for bill <label style={{color: 'red'}}>*</label>
                  </label>
                        {/* <input type="text" class="form-control mb-2 mr-sm-2" id="school"
                          value={this.state.responsible}
                          onChange={this.onChangeResponsible} /> */}
                        <Field type="text" class="form-control mb-2 mr-sm-2" name="responsible" />
                        {errors.responsible && touched.responsible ? (
                          <div style={{ color: 'red' }}>{errors.responsible}</div>
                        ) : null}
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
                        {/* <input type="text" class="form-control mb-2 mr-sm-2" id="homephone" 
                          value={this.state.instructorAudition}
                          onChange={this.onChangeInstructorAudition}/> */}
                        <Field type="text" class="form-control mb-2 mr-sm-2" name="instructor" />
                        {errors.instructor && touched.instructor ? (
                          <div style={{ color: 'red' }}>{errors.instructor}</div>
                        ) : null}
                      </div>

                      <div className="form-group mb-2">
                        <label for="homephone" class="mr-sm-2 text-left d-block" onChange={this.onChangeResult} style={{ width: 182 }}>
                          Indicate audition results
                    </label>
                        <select class="form-control" onChange={this.onChangeResult} value={this.state.result}>
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
                            {/* <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="middle"
                          value={this.state.days}
                          onChange={this.onChangeDays}
                        /> */}
                            <Field type="text" class="form-control mb-2 mr-sm-2" name="days" />
                            {errors.days && touched.days ? (
                              <div style={{ color: 'red' }}>{errors.days}</div>
                            ) : null}
                          </div>
                        </div>
                        <div class="col-sm">
                          <div className="form-group">
                            <label for="last" class="mr-sm-2">
                              Hours
                      </label>
                            {/* <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="last"
                          value={this.state.hours}
                          onChange={this.onChangeHours}
                        /> */}
                            <Field type="text" class="form-control mb-2 mr-sm-2" name="hours" />
                            {errors.hours && touched.hours ? (
                              <div style={{ color: 'red' }}>{errors.hours}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="container" style={{ marginLeft: 0, paddingLeft: 0 }}>
                      <div class="row">
                        <div class="col-sm mb-3">
                          <div className="form-group">
                            <label for="middle" class="mr-sm-2 text-left d-block">
                              Student / Parent Signature
                        </label>
                          </div>
                          <div className="form-group">
                            <input type="file" name="signature" onChange={this.onChangeSignature} />
                          </div>
                          {$imagePreview}
                        </div>
                      </div>
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
        )}

      </div>
    )
  }
}

