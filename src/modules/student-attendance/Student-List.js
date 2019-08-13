import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

export default class studentList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
      filterDate: new Date(),
      deleteConfirm: false,
      deleteId : ''
    }
    this.delete = this.delete.bind(this);
  }

  onChangeFilterDate = filterDate => {
    this.setState({
      filterDate: filterDate
    });
    this.filterData(filterDate)
  }

  delete(id) {
    axios.delete('http://103.30.247.147:8000/api/student_attendance/' + id)
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
    const { students } = this.state
    // ajax call
    this.fetchData()

    // console.log(students)
    
    // students[0] && this.tableAttandanceGroup()
  }

  fetchData = () => {
    fetch('http://103.30.247.147:8000/api/student_attendances')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  filterData = (filterDate) => {
    fetch('http://103.30.247.147:8000/api/student_attendances/filterDate?date=' + moment(filterDate).format("YYYY-MM-DD"))
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  tableAttandanceGroup = (students) => {
    let table = []

    students.forEach((student, index) => {
      Array.isArray(student) ?
      table.push(
        <section className="content-header">
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <div className="content">
                  {/* {index < 1 && (
                      <>
                      <NavLink to="/student-attendance/add" class="btn btn-success" style={{marginBottom: 10}}><i class="fa fa-plus"></i> Add Student Attendance</NavLink>
                      
                      <div class="float-right">
                        <DatePicker
                          selected={this.state.filterDate}
                          onChange={this.onChangeFilterDate}
                          dateFormat="d-MM-yyyy"
                          peekNextMonth
                          dropdownMode="select"
                          className="form-control"
                        />
                      </div>
                    </>
                    )} */}
                    <h5>Class : {student[0].class_name}</h5>
                    <MDBDataTable
                      striped
                      bordered
                      hover
                      data={this.data(student)}
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
      ) : table.push(
        <section className="content-header">
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <div className="content">
                  {/* {index < 1 && (
                    <>
                      <NavLink to="/student-attendance/add" class="btn btn-success" style={{marginBottom: 10}}><i class="fa fa-plus"></i> Add Student Attendance</NavLink>
                      
                      <div class="float-right">
                        <DatePicker
                          selected={this.state.filterDate}
                          onChange={this.onChangeFilterDate}
                          dateFormat="d-MM-yyyy"
                          peekNextMonth
                          dropdownMode="select"
                          className="form-control"
                        />
                      </div>
                    </>
                  )} */}
                  <h5>Class : {student}</h5>
                    <MDBDataTable
                      striped
                      bordered
                      hover
                      data={this.data(student)}
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
    });

    // students.map((student, index) => {
    //   console.log(student[0])
      // student[index] && student[index][] && console.log(student)
    // })

    return(
      table
    )
  }

  data = (students) => {
    const deleteConfirm = this.toggleDeleteConfirmation

    return ({
      columns: [
        {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Absent',
          field: 'absent',
          sort: 'asc',
          width: 200
        },
        {
          label: 'With Permission',
          field: 'permission',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Attend',
          field: 'attend',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'disabled',
          width: 100
        }
      ],
      rows: (function () {
        let rowData = []

        Array.isArray(students) && students.map((data) => {
          rowData.push({
            date: data.date,
            name: data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
            absent: data.status == 1 && <i class="fa fa-check" style={{ float: "right", position: "relative", right: "50%" }}></i>,
            permission: data.status == 2 && <i class="fa fa-check" style={{ float: "right", position: "relative", right: "50%" }}></i>,
            attend: data.status == 3 && <i class="fa fa-check" style={{ float: "right", position: "relative", right: "50%" }}></i>,
            action:
              <div>
                <NavLink
                  to={{
                    pathname: 'student-attendance/edit',
                    state: {
                      studentId: data.id,
                    }
                  }}
                  className="btn btn-primary">Edit</NavLink>
                <button onClick={() => deleteConfirm(data.id)} className="btn btn-danger" style={{ position: "relative", left: 25 }}>Delete</button>
              </div>
          })
        })

        return rowData
      }())
    })
  }
    render() {
      const { students } = this.state
      // console.log(students)
      // console.log(json[1][1].first_name)
        return(
          <>
          <div style={{paddingTop: 14, paddingLeft: 14, paddingRight: 14}}>
              <NavLink to="/student-attendance/add" class="btn btn-success" style={{ marginBottom: 10 }}><i class="fa fa-plus"></i> Add Student Attendance</NavLink>

              <div class="float-right">
                <DatePicker
                  selected={this.state.filterDate}
                  onChange={this.onChangeFilterDate}
                  dateFormat="d-MM-yyyy"
                  peekNextMonth
                  dropdownMode="select"
                  className="form-control"
                />
              </div>
          </div>
          
          {students[0] && this.tableAttandanceGroup(students)}
          {/* <section className="content-header">
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <div className="content">
                    <div class="box-header">
                      <NavLink to="/student-attendance/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student Attendance</NavLink>
                      <div class="float-right">
                        <DatePicker
                          selected={this.state.filterDate}
                          onChange={this.onChangeFilterDate}
                          dateFormat="d-MM-yyyy"
                          peekNextMonth
                          dropdownMode="select"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <MDBDataTable
                      striped
                      bordered
                      hover
                      data={this.data(this.state.students)}
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

            <section className="content-header">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <div className="content">
                      <div class="box-header">
                        <NavLink to="/student-attendance/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student Attendance</NavLink>
                        <div class="float-right">
                          <DatePicker
                            selected={this.state.filterDate}
                            onChange={this.onChangeFilterDate}
                            dateFormat="d-MM-yyyy"
                            peekNextMonth
                            dropdownMode="select"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.data(this.state.students)}
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
            </section> */}
          </>
        )
    }
}

