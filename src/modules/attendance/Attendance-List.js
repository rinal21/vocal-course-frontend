import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import update from 'react-addons-update';
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from 'axios';
import Loader from 'react-loader-spinner'

import "react-datepicker/dist/react-datepicker.css";

export default class attendancesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      attendances: [],
      filterDate: new Date(),
      deleteConfirm: false,
      classes: [],
      classSelected: [],
      students: [],
      studentSelected: [],
      teachers: [],
      teacherSelected: [],
      studentStatus: [],
      teacherStatus: [],
      tables: [],
      isLoaded: false,
      isFilterDate: false,
      isChangeClass: false,
      loading: false,
      deleteId : ''
    }
    this.delete = this.delete.bind(this);
    this.onChangeStudentStatus = this.onChangeStudentStatus.bind(this);
    this.onChangeTeacherStatus = this.onChangeTeacherStatus.bind(this);
    this.onChangeStudent = this.onChangeStudent.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onChangeClass = this.onChangeClass.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async onChangeStudentStatus(e, id){
    const obj = {
      student_status: e.target.value
    };
    console.log('ler', e.target.value)
    axios.patch('http://localhost:8000/api/attendance/' + id, obj)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error.message);
      })

      await this.promisedSetState({
        studentStatus: update(this.state.studentStatus, {[id]: {$set: e.target.value}})
      });
      this.tableAttendancesGroup()
  }

  promisedSetState = (newState) => {
    return new Promise((resolve) => {
        this.setState(newState, () => {
            resolve()
        });
    });
}

  async onChangeTeacherStatus(e, id) {
    const obj = {
      teacher_status: e.target.value
    };
    axios.patch('http://localhost:8000/api/attendance/' + id, obj)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error.message);
      })
    await this.promisedSetState({
      teacherStatus: update(this.state.teacherStatus, { [id]: { $set: e.target.value } })
    });

    this.tableAttendancesGroup()
  }

  onChangeClass = async (e, id) => {
    const obj = {
      class_id: e.target.value
    };
    console.log(obj, id)
    await axios.patch('http://localhost:8000/api/attendance/' + id, obj)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error.message);
      })
    await this.promisedSetState({
      isChangeClass: true,
      isLoaded: false
    });

    this.tableAttendancesGroup()
  }

  async onChangeStudent(e, id) {
    const obj = {
      student_id: e.target.value
    };
    console.log(obj, id)
    axios.patch('http://localhost:8000/api/attendance/' + id, obj)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error.message);
      })
    await this.promisedSetState({
      studentSelected: update(this.state.studentSelected, { [id]: { $set: e.target.value } })
    });

    this.tableAttendancesGroup()
  }

  async onChangeTeacher(e, id) {
    const obj = {
      teacher_id: e.target.value
    };
    axios.patch('http://localhost:8000/api/attendance/' + id, obj)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error.message);
      })
    await this.promisedSetState({
      teacherSelected: update(this.state.teacherSelected, { [id]: { $set: e.target.value } })
    });

    this.tableAttendancesGroup()
  }

  onChangeFilterDate = filterDate => {
    this.setState({
      filterDate: filterDate
    });
    this.filterData(filterDate, false)
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/teacher_attendance/' + id)
      .then(console.log('Deleted'))
      .then(() => this.setState({deleteConfirm: !this.state.deleteConfirm}))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  toggleDeleteConfirmation = (id) => {
    this.setState({
      deleteConfirm: !this.state.deleteConfirm,
      deleteId: id
    });
  }

  componentDidMount = () => {
    // ajax call
    this.tableAttendancesGroup()
  }

  createStudentPicker = (students) => {
    let opt = []
    students.map((student, index) => {
      if(index == 0){
        opt.push(<option key='' value=''></option>)
        opt.push(<option key={student.id} value={student.id}>{student.first_name + ' ' + student.middle_name + ' ' + student.last_name}</option>)
      }
      else{
        opt.push(<option key={student.id} value={student.id}>{student.first_name + ' ' + student.middle_name + ' ' + student.last_name}</option>)
      }
    })

    return (
        opt
    )
  }

  createTeacherPicker = (teachers) => {
    let opt = []

    teachers.map((data, index) => {
      if(index == 0){
        opt.push(<option key='' value=''></option>)
        opt.push(<option value={data.id}>{data.name}</option>)
      }
      else{
        opt.push(<option value={data.id}>{data.name}</option>)
      }
    })

    return (
        opt
    )
  }

  createClassPicker = (classes) => {
    let opt = []

    classes.map((data) => {
      opt.push(<option value={data.id}>{data.name}</option>)
    })

    return (
        opt
    )
  }

  fetchData = () => {
    return new Promise(async(resolve, reject) => {
      await fetch('http://localhost:8000/api/attendances')
      .then(response => response.json())
      .then( (json) => {
         this.setState({
          attendances: json,
        })
        json.map((subarray) => {
          subarray.map((data) => {
            this.promisedSetState({
              classSelected: update(this.state.classSelected, {[data.attendances_id]: {$set: data.class_id}}),
              studentStatus: update(this.state.studentStatus, {[data.attendances_id]: {$set: data.student_status}}),
              teacherStatus: update(this.state.teacherStatus, {[data.attendances_id]: {$set: data.teacher_status}}),
              studentSelected: update(this.state.studentSelected, {[data.attendances_id]: {$set: data.student_id}}),
              teacherSelected: update(this.state.teacherSelected, {[data.attendances_id]: {$set: data.teacher_id}})
            })
          })
        })
        
      })
      resolve()
    })
  }

  fetchStudentsByClass = (name) => {
    return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/students/filterClass?class=' + name)
      .then(response => response.json())
      .then((json) => {
        this.setState(prevState => ({
          students: [...prevState.students, json]
        }))
        resolve()
      })
    })
  }

  fetchTeachers = () => {
    return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/teachers')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          teachers: json.data,
        })
        resolve()
      })
    })
  }

  fetchClasses = () => {
    return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/classes')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          classes: json.data,
        })
        resolve()
      })
    })
  }

  filterData = (filterDate, isChangeClass) => {
    return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/attendances/filter?date='+moment(filterDate).format("YYYY-MM-DD"))
      .then(response => response.json())
      .then(async(json) => {
        await this.promisedSetState({
          attendances: json
        })
        json.map((subarray) => {
          subarray.map((data) => {
            this.setState({
              classSelected: update(this.state.classSelected, {[data.attendances_id]: {$set: data.class_id}}),
              studentStatus: update(this.state.studentStatus, {[data.attendances_id]: {$set: data.student_status}}),
              teacherStatus: update(this.state.teacherStatus, {[data.attendances_id]: {$set: data.teacher_status}}),
              studentSelected: update(this.state.studentSelected, {[data.attendances_id]: {$set: data.student_id}}),
              teacherSelected: update(this.state.teacherSelected, {[data.attendances_id]: {$set: data.teacher_id}}),
              isLoaded: false,
              isFilterDate: true,
              isChangeClass: false
            })
          })
        })
        if(!isChangeClass) {
          this.tableAttendancesGroup()
        }
      })
      resolve()
    })

  }

  data = (attendances, i) => {
    const {studentStatus, teachers, teacherStatus, teacherSelected, students, studentSelected, classes, classSelected} = this.state
    const onChangeStudentStatus = this.onChangeStudentStatus
    const onChangeTeacherStatus = this.onChangeTeacherStatus
    const onChangeStudent = this.onChangeStudent
    const onChangeTeacher = this.onChangeTeacher
    const onChangeClass = this.onChangeClass
    const createStudentPicker = this.createStudentPicker
    const createTeacherPicker = this.createTeacherPicker
    const createClassPicker = this.createClassPicker

    return ({
      columns: [
        {
          label: 'Day',
          field: 'day',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Time',
          field: 'time',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Class',
          field: 'class',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Student\'s Name',
          field: 'student',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Status Student',
          field: 'status_student',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Teacher\'s Name',
          field: 'teacher',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Status Teacher',
          field: 'status_teacher',
          sort: 'asc',
          width: 150
        },
      ],
      rows: ( function () {
        let rowData = []
        // console.log('bang', students)
        for (const attendance of attendances) {
          
          let data = attendance

        // attendances.map((data, index) => {
          console.log('bang', students)
          // console.log('coba1 studentID:',data.student_id,'isi:', studentSelected[data.student_id], 'class', data.class_name)
          rowData.push({
            day: data.day,
            time: data.time,
            class: <select class="form-control" onChange={(e) => onChangeClass(e, data.attendances_id)} value={classSelected[data.attendances_id]}>
              { createClassPicker(classes)}
            </select>,
            student: <select class="form-control" onChange={(e) => onChangeStudent(e, data.attendances_id)} value={studentSelected[data.attendances_id]}>
              { createStudentPicker(students[i])}
            </select>,
            status_student: <select class="form-control" onChange={(e) => onChangeStudentStatus(e, data.attendances_id)} value={studentStatus[data.attendances_id]}>
              <option value="0"></option>
              <option value="1">Absent</option>
              <option value="2">With Permission</option>  
              <option value="3">Attend</option>
            </select>,
            teacher: <select class="form-control" onChange={(e) => onChangeTeacher(e, data.attendances_id)} value={teacherSelected[data.attendances_id]}>
            {createTeacherPicker(teachers)}
          </select>,
            teacher_student: <select class="form-control" onChange={(e) => onChangeTeacherStatus(e, data.attendances_id)} value={teacherStatus[data.attendances_id]}>
              <option value="0"></option>
              <option value="1">Absent</option>
              <option value="2">With Permission</option>
              <option value="3">Attend</option>
            </select>
          })
        }
        // console.log('ajg',rowData)
        return rowData
      }())
    })
    
  };

  tableAttendancesGroup = async () => {
    this.setState({loading: false})
    if(!this.state.isLoaded) {
      console.log('dor', this.state.isLoaded)
      if (!this.state.isFilterDate) {
        // console.log('bang1')
        await this.fetchData()
      }

      if(this.state.isChangeClass){
        // console.log('dor3')
        if (this.state.isFilterDate) {
          console.log('dor1', this.state.isFilterDate)
          // console.log('dor', this.state.filterDate)
          await this.filterData(this.state.filterDate, this.state.isChangeClass)
        }
      }
      
      await this.fetchClasses()
      await this.fetchTeachers()

      this.setState({students: []})

      for (const attendance of this.state.attendances) { 
        console.log('isi', attendance[0].class_id)
        await this.fetchStudentsByClass(attendance[0].class_id)
      }
      await this.promisedSetState({
        isLoaded: true
      })
    }

    const { attendances } = this.state
    let table = []
    var i = 0

      for (const attendance of attendances) {

      table.push(
        <section className="content-header">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="content">
                  <b><h4>Attendance</h4></b>
                  <h5>Class : {attendance[0].class_name}</h5>
                <div class="box-header">
                    <div class="float-right">
                      {i < 1 && (
                        <>
                          <DatePicker
                            selected={this.state.filterDate}
                            onChange={this.onChangeFilterDate}
                            dateFormat="d-MM-yyyy"
                            peekNextMonth
                            dropdownMode="select"
                            className="form-control"
                          />
                        </>
                      )}
                  </div>
                </div>
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={await this.data(attendance, i)}
                  btn
                />
                <MDBContainer>
                  <MDBModal isOpen={this.state.deleteConfirm} toggle={this.toggleDeleteConfirmation} size="sm" centered>
                    <MDBModalHeader toggle={this.toggleDeleteConfirmation}>Delete</MDBModalHeader>
                    <MDBModalBody>
                      Are you sure you want to delete it ?
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={this.toggleDeleteConfirmation}>Cancel</MDBBtn>
                      <MDBBtn color="danger" onClick={() => this.delete(this.state.deleteId)}>Delete</MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </MDBContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
      )
      i++
    }
    console.log('table', table)
    this.setState({
      tables: table,
      loading: true
    })
  }

  render() {
    // console.log('coba3',this.state.studentSelected[6])
    const { loading, tables } = this.state
    // console.log('studentOK', attendances)
    // console.log('status', classSelected)
    // console.log('loaded', isLoaded)
    return (
      
      <>
      {loading ? tables : <center><Loader
         type="Oval"
         color="#00BFFF"
         height="500"	
         width="100"
      /></center> }
      </>
    )
  }
}

