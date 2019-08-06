import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import update from 'react-addons-update';
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from 'axios';
import Loader from 'react-loader-spinner'
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

export default class attendancesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      attendances: [],
      filterDate: new Date(),
      deleteConfirm: false,
      startAt: [],
      endAt: [],
      rooms: [],
      roomSelected: [],
      classId: '',
      selectedClass: null, //Filter by Class
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
    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.onChangeStudentStatus = this.onChangeStudentStatus.bind(this);
    this.onChangeTeacherStatus = this.onChangeTeacherStatus.bind(this);
    this.onChangeEndAt = this.onChangeEndAt.bind(this);
    this.onChangeStartAt = this.onChangeStartAt.bind(this);
    this.onChangeStudent = this.onChangeStudent.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onChangeClass = this.onChangeClass.bind(this);
    this.onChangeFilterClass = this.onChangeFilterClass.bind(this);
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

async onChangeStartAt(e, id) {
  this.setState({
    startAt: e.target.value
  });

  const obj = {
    start_at: e.target.value
  };
  console.log(obj, id)
  axios.patch('http://localhost:8000/api/attendance/' + id, obj)
    .then(res => console.log(res.data))
    .catch(error => {
      console.log(error.message);
    })
    await this.promisedSetState({
      startAt: update(this.state.startAt, { [id]: { $set: e.target.value } })
    });

  this.tableAttendancesGroup()
}

async onChangeEndAt(e, id) {
  this.setState({
    endAt: e.target.value
  });

  const obj = {
    end_at: e.target.value
  };
  console.log(obj, id)
  axios.patch('http://localhost:8000/api/attendance/' + id, obj)
    .then(res => console.log(res.data))
    .catch(error => {
      console.log(error.message);
    })
  await this.promisedSetState({
    endAt: update(this.state.endAt, { [id]: { $set: e.target.value } })
  });

  this.tableAttendancesGroup()
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

  onChangeFilterClass = (selectedClass) =>  {
    this.setState({ selectedClass });
    this.setState({ 
      classId: selectedClass.value
    })
    // this.fetchStudentsByClass(selectedClass.value)
    this.filterData(this.state.filterDate, false, selectedClass.value)
  }

  fetchStudentsByClass = (id) => {
    fetch('http://localhost:8000/api/students/filterClass?status=3&classId=' + id)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  onChangeRoom = async (e, id) => {
    this.setState({
      roomSelected: e.target.value
    });

    const obj = {
      room_id: e.target.value
    };
    console.log(obj, id)
    axios.patch('http://localhost:8000/api/attendance/' + id, obj)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error.message);
      })
    await this.promisedSetState({
      roomSelected: update(this.state.roomSelected, { [id]: { $set: e.target.value } })
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

  async onChangeStudent(studentSelected, id) {
    const obj = {
      student_id: studentSelected.value
    };
    axios.patch('http://localhost:8000/api/attendance/' + id, obj)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error.message);
      })
    await this.promisedSetState({
      studentSelected: update(this.state.studentSelected, { [id]: { $set: studentSelected } })
    });

    this.tableAttendancesGroup()
  }

  async onChangeTeacher(teacherSelected, id) {
    const obj = {
      teacher_id: teacherSelected.value
    };
    axios.patch('http://localhost:8000/api/attendance/' + id, obj)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error.message);
      })
    await this.promisedSetState({
      teacherSelected: update(this.state.teacherSelected, { [id]: { $set: teacherSelected } })
    });

    this.tableAttendancesGroup()
  }

  onChangeFilterDate = filterDate => {
    this.setState({
      filterDate: filterDate
    });
    this.filterData(filterDate, false, '')
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
    students[0].map((student, index) => {
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

  dataStudents = (students) => {
    return (
      function () {
        let rowData = []
        students[0].map((student) => {
            rowData.push({
              value: student.id,
              label: student.first_name + ' ' + student.middle_name + ' ' + student.last_name,
            })
        })
        return rowData
      }()
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

  dataTeachers = (teachers) => {
    return (
      function () {
        let rowData = []
        teachers.map((teacher) => {
            rowData.push({
              value: teacher.id,
              label: teacher.name,
            })
        })
        return rowData
      }()
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

  createRoomPicker = (rooms) => {
    let opt = []

    rooms[0].map((data, index) => {
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

  fetchData = () => {
    return new Promise(async(resolve, reject) => {
      await fetch('http://localhost:8000/api/attendances')
      .then(response => response.json())
      .then( (json) => {
        console.log('cobaRoom', json)
         this.setState({
          attendances: json,
        })
        json.map((data) => {
          this.promisedSetState({
            roomSelected: update(this.state.roomSelected, { [data.attendances_id]: { $set: data.room_id ? data.room_id : '' } }),
            startAt: update(this.state.startAt, { [data.attendances_id]: { $set: data.start_at ? data.start_at : '' } }),
            endAt: update(this.state.endAt, { [data.attendances_id]: { $set: data.end_at ? data.end_at : '' } }),
            classSelected: update(this.state.classSelected, { [data.attendances_id]: { $set: data.class_id } }),
            studentStatus: update(this.state.studentStatus, { [data.attendances_id]: { $set: data.student_status } }),
            teacherStatus: update(this.state.teacherStatus, { [data.attendances_id]: { $set: data.teacher_status } }),
            studentSelected: update(this.state.studentSelected, { [data.attendances_id]: { $set: {value:data.student_id, label:data.first_name + ' ' + data.middle_name + ' ' + data.last_name} } }),
            teacherSelected: update(this.state.teacherSelected, { [data.attendances_id]: { $set: {value:data.teacher_id, label:data.teacher_name} } })
          })
        })

        // json.map((subarray) => {
        //   subarray.map((data) => {
        //     this.promisedSetState({
        //       classSelected: update(this.state.classSelected, {[data.attendances_id]: {$set: data.class_id}}),
        //       studentStatus: update(this.state.studentStatus, {[data.attendances_id]: {$set: data.student_status}}),
        //       teacherStatus: update(this.state.teacherStatus, {[data.attendances_id]: {$set: data.teacher_status}}),
        //       studentSelected: update(this.state.studentSelected, {[data.attendances_id]: {$set: data.student_id}}),
        //       teacherSelected: update(this.state.teacherSelected, {[data.attendances_id]: {$set: data.teacher_id}})
        //     })
        //   })
        // })
        
      })
      resolve()
    })
  }

  fetchStudents = () => {
    return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/students?status=3')
      .then(response => response.json())
      .then((json) => {
        this.setState(prevState => ({
          students: [...prevState.students, json]
        }))
        resolve()
      })
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

  fetchRooms = () => {
    return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/rooms')
      .then(response => response.json())
      .then((json) => {
        console.log('roomx', json.data)
        this.setState(prevState => ({
          rooms: [...prevState.rooms, json.data]
        }))
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

  dataClasses = (classes) => {
    return (
      function () {
        let rowData = []

        classes.map((data, index) => {
          if (index == 0) {
            rowData.push({
              value: 0,
              label: 'All',
            })
          }
          rowData.push({
            value: data.id,
            label: data.name,
          })
        })
        return rowData
      }()
    )
  };

  filterData = (filterDate, isChangeClass, classId) => {
    let url = classId ? 'http://localhost:8000/api/attendances/filter?classId='+ classId +'&date='+moment(filterDate).format("YYYY-MM-DD") : 'http://localhost:8000/api/attendances/filter?date='+moment(filterDate).format("YYYY-MM-DD")
    return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(async(json) => {
        await this.promisedSetState({
          attendances: json
        })
        json.map((data) => {
            this.setState({
              roomSelected: update(this.state.roomSelected, { [data.attendances_id]: { $set: data.room_id ? data.room_id : '' } }),
              startAt: update(this.state.startAt, { [data.attendances_id]: { $set: data.start_at ? data.start_at : '' } }),
              endAt: update(this.state.endAt, { [data.attendances_id]: { $set: data.end_at ? data.end_at : '' } }),
              classSelected: update(this.state.classSelected, {[data.attendances_id]: {$set: data.class_id}}),
              studentStatus: update(this.state.studentStatus, {[data.attendances_id]: {$set: data.student_status}}),
              teacherStatus: update(this.state.teacherStatus, {[data.attendances_id]: {$set: data.teacher_status}}),
              studentSelected: update(this.state.studentSelected, { [data.attendances_id]: { $set: {value:data.student_id, label:data.first_name + ' ' + data.middle_name + ' ' + data.last_name} } }),
              teacherSelected: update(this.state.teacherSelected, { [data.attendances_id]: { $set: {value:data.teacher_id, label:data.teacher_name} } }),
              isLoaded: false,
              isFilterDate: true,
              isChangeClass: false
            })
        })
        if(!isChangeClass) {
          this.tableAttendancesGroup()
        }
      })
      resolve()
    })

  }

  dataHeader = () => {
    return ({
      columns: [
        {
          label: 'Room',
          field: 'room',
          sort: 'disabled',
          width: 150
        },
        {
          label: 'Start',
          field: 'start',
          sort: 'disabled',
          width: 270
        },
        {
          label: 'End',
          field: 'end',
          sort: 'disabled',
          width: 270
        },
        {
          label: 'Class',
          field: 'class',
          sort: 'disabled',
          width: 200
        },
        {
          label: 'Student Name',
          field: 'student',
          sort: 'disabled',
          width: 200
        },
        {
          label: 'Status Student',
          field: 'status_student',
          sort: 'disabled',
          width: 150
        },
        {
          label: 'Teacher Name',
          field: 'teacher',
          sort: 'disabled',
          width: 100
        },
        {
          label: 'Status Teacher',
          field: 'status_teacher',
          sort: 'disabled',
          width: 150
        },
      ],
    })
  }

  data = (attendances, i) => {
    const {rooms, roomSelected, studentStatus, teachers, teacherStatus, teacherSelected, students, studentSelected, classes, classSelected, startAt, endAt} = this.state
    const onChangeStartAt = this.onChangeStartAt
    const onChangeEndAt = this.onChangeEndAt
    const onChangeStudentStatus = this.onChangeStudentStatus
    const onChangeTeacherStatus = this.onChangeTeacherStatus
    const onChangeRoom = this.onChangeRoom
    const onChangeStudent = this.onChangeStudent
    const onChangeTeacher = this.onChangeTeacher
    const onChangeClass = this.onChangeClass
    const createClassPicker = this.createClassPicker
    const createRoomPicker = this.createRoomPicker

    return ({
      columns: [
        {
          label: 'Room',
          field: 'room',
          sort: 'disabled',
          width: 150
        },
        {
          label: 'Start',
          field: 'start',
          sort: 'disabled',
          width: 270
        },
        {
          label: 'End',
          field: 'end',
          sort: 'disabled',
          width: 270
        },
        {
          label: 'Class',
          field: 'class',
          sort: 'disabled',
          width: 200
        },
        {
          label: 'Student Name',
          field: 'student',
          sort: 'disabled',
          width: 200
        },
        {
          label: 'Status Student',
          field: 'status_student',
          sort: 'disabled',
          width: 150
        },
        {
          label: 'Teacher Name',
          field: 'teacher',
          sort: 'disabled',
          width: 100
        },
        {
          label: 'Status Teacher',
          field: 'status_teacher',
          sort: 'disabled',
          width: 150
        },
      ],
      rows: ( () => {
        let rowData = []
        // console.log('bang', students)
          
          // let data = attendances

        attendances.map((data, index) => {
          console.log('bang', students)
          // console.log('coba1 studentID:',data.student_id,'isi:', studentSelected[data.student_id], 'class', data.class_name)
          rowData.push({
            room: <select class="form-control" onChange={(e) => onChangeRoom(e, data.attendances_id)} value={roomSelected[data.attendances_id]}>
            {createRoomPicker(rooms)}
          </select>,
            start: <select class="form-control" style={{ width: 85 }} id="year-picker" onChange={(e) => onChangeStartAt(e, data.attendances_id)} value={startAt[data.attendances_id]}>              
            <option value={''}></option>
            <option value={'08:20'}>08:20</option>
            <option value={'08:40'}>08:40</option>
            <option value={'09:00'}>09:00</option>
            <option value={'09:20'}>09:20</option>
            <option value={'09:40'}>09:40</option>
            <option value={'10:00'}>10:00</option>
            <option value={'10:20'}>10:20</option>
            <option value={'10:40'}>10:40</option>
            <option value={'11:00'}>11:00</option>
            <option value={'11:20'}>11:20</option>
            <option value={'11:40'}>11:40</option>
            <option value={'12:00'}>12:00</option>
            <option value={'12:20'}>12:20</option>
            <option value={'12:40'}>12:40</option>
            <option value={'13:00'}>13:00</option>
            <option value={'13:20'}>13:20</option>
            <option value={'13:40'}>13:40</option>
            <option value={'14:00'}>14:00</option>
            <option value={'14:20'}>14:20</option>
            <option value={'14:40'}>14:40</option>
            <option value={'15:00'}>15:00</option>
            <option value={'15:20'}>15:20</option>
            <option value={'15:40'}>15:40</option>
            <option value={'16:00'}>16:00</option>
            <option value={'16:20'}>16:20</option>
            <option value={'16:40'}>16:40</option>
            <option value={'17:00'}>17:00</option>
            <option value={'17:20'}>17:20</option>
            <option value={'17:40'}>17:40</option>
            <option value={'18:00'}>18:00</option>
            <option value={'18:20'}>18:20</option>
            <option value={'18:40'}>18:40</option>
            <option value={'19:00'}>19:00</option>
            <option value={'19:20'}>19:20</option>
            <option value={'19:40'}>19:40</option>
            <option value={'20:00'}>20:00</option>

          </select>,
            end: <select class="form-control" style={{ width: 85 }} id="year-picker" onChange={(e) => onChangeEndAt(e, data.attendances_id)} value={endAt[data.attendances_id]}>
            <option value={''}></option>
            <option value={'08:20'}>08:20</option>
            <option value={'08:40'}>08:40</option>
            <option value={'09:00'}>09:00</option>
            <option value={'09:20'}>09:20</option>
            <option value={'09:40'}>09:40</option>
            <option value={'10:00'}>10:00</option>
            <option value={'10:20'}>10:20</option>
            <option value={'10:40'}>10:40</option>
            <option value={'11:00'}>11:00</option>
            <option value={'11:20'}>11:20</option>
            <option value={'11:40'}>11:40</option>
            <option value={'12:00'}>12:00</option>
            <option value={'12:20'}>12:20</option>
            <option value={'12:40'}>12:40</option>
            <option value={'13:00'}>13:00</option>
            <option value={'13:20'}>13:20</option>
            <option value={'13:40'}>13:40</option>
            <option value={'14:00'}>14:00</option>
            <option value={'14:20'}>14:20</option>
            <option value={'14:40'}>14:40</option>
            <option value={'15:00'}>15:00</option>
            <option value={'15:20'}>15:20</option>
            <option value={'15:40'}>15:40</option>
            <option value={'16:00'}>16:00</option>
            <option value={'16:20'}>16:20</option>
            <option value={'16:40'}>16:40</option>
            <option value={'17:00'}>17:00</option>
            <option value={'17:20'}>17:20</option>
            <option value={'17:40'}>17:40</option>
            <option value={'18:00'}>18:00</option>
            <option value={'18:20'}>18:20</option>
            <option value={'18:40'}>18:40</option>
            <option value={'19:00'}>19:00</option>
            <option value={'19:20'}>19:20</option>
            <option value={'19:40'}>19:40</option>
            <option value={'20:00'}>20:00</option>
          </select>,
            class: <select class="form-control" onChange={(e) => onChangeClass(e, data.attendances_id)} value={classSelected[data.attendances_id]}>
              { createClassPicker(classes)}
            </select>,
            student: <Select
            value={studentSelected[data.attendances_id]}
            onChange={(e) => onChangeStudent(e, data.attendances_id)}
            options={this.dataStudents(students)}
          />
          // <select class="form-control" onChange={(e) => onChangeStudent(e, data.attendances_id)} value={studentSelected[data.attendances_id]}>
          //     { createStudentPicker(students)}
          //   </select>
            ,
            status_student: <select class="form-control" onChange={(e) => onChangeStudentStatus(e, data.attendances_id)} value={studentStatus[data.attendances_id]}>
              <option value="0"></option>
              <option value="1">Absent</option>
              <option value="2">With Permission</option>  
              <option value="3">Attend</option>
            </select>,
            teacher: <Select
            value={teacherSelected[data.attendances_id]}
            onChange={(e) => onChangeTeacher(e, data.attendances_id)}
            options={this.dataTeachers(teachers)}
          />,
            teacher_student: <select class="form-control" onChange={(e) => onChangeTeacherStatus(e, data.attendances_id)} value={teacherStatus[data.attendances_id]}>
              <option value="0"></option>
              <option value="1">Absent</option>
              <option value="2">With Permission</option>
              <option value="3">Attend</option>
            </select>
          })
        })
        this.setState({loading: true})
        return rowData
      })()
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
      
      await this.fetchRooms()
      await this.fetchClasses()
      await this.fetchTeachers()

      this.setState({students: []})

        await this.fetchStudents()
        // await this.fetchStudentsByClass(attendance.class_id)
      await this.promisedSetState({
        isLoaded: true
      })
    }

    const { attendances } = this.state
    let table = []
    var i = 0
    table.push(
      <MDBDataTable
        striped
        bordered
        hover
        paging={false}
        data={await this.data(attendances)}
        btn
      />

    )
    console.log('table', table)
    this.setState({
      tables: table
    })
  }

  render() {
    // console.log('coba3',this.state.studentSelected[6])
    const { loading, tables, studentSelected } = this.state
    // console.log('studentOK', attendances)
    console.log('studentslect', studentSelected)
    // console.log('loaded', isLoaded)
    return (
      
      <>
        <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="content">
                  <b><h4>Attendance</h4></b>
                  {/* <h5>Class : {attendances.class_name}</h5> */}
                  <div style={{ position: 'absolute', top: 70, right: 216, zIndex: 1 }}>
                    <DatePicker
                      selected={this.state.filterDate}
                      onChange={this.onChangeFilterDate}
                      dateFormat="EEEE, dd MMMM YYYY"
                      peekNextMonth
                      dropdownMode="select"
                      className="form-control"
                      customInput={
                        <input type="text" class="form-control react-datepicker-ignore-onclickoutside" style={{ width: 220 }} />
                      }
                    />

                    <i className="fa fa-calendar" style={{ position: 'absolute', zIndex: 1, right: 13, top: 11 }} />
                  </div>
                  <div style={{ position: 'absolute', width: 223.2, top: 46, left: 278, zIndex: 1 }}>
                    <label style={{ marginBottom: 0 }}>Class</label>
                    <Select
                      value={this.state.selectedClass}
                      onChange={this.onChangeFilterClass}
                      options={this.dataClasses(this.state.classes)}
                    />
                  </div>
                  {loading ? tables : (<><MDBDataTable
                    striped
                    bordered
                    hover
                    paging={false}
                    data={this.dataHeader()}
                    btn

                  />
                    <center><Loader
                      type="Oval"
                      color="#00BFFF"
                      height="100"
                      width="100"
                    /></center></>)}
                </div>
              </div>
            </div>
          </div>
        </section>

      </>
    )
  }
}

