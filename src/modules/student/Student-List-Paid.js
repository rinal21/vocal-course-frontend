import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

export default class studentListPaid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
      filterDate: new Date(),
      deleteConfirm: false,
      deleteId : ''
    }
    this.delete = this.delete.bind(this);
    this.onChangeFilterDate = this.onChangeFilterDate.bind(this);
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/student/' + id)
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
    this.fetchData()
  }

  createYearPicker = () => {
    let opt = []

    for (var i = 2019; i <= 2025; i++) {
      opt.push(<option value={i}>{i}</option>)
    }

    return (
      <select class="form-control" style={{ width: 100 }} id="year-picker" onChange={this.onChangeFilterDate}>
        {opt}
      </select>
    )
  }

  onChangeFilterDate(e) {
    this.setState({
      filterDate: e.target.value
    });

    this.filterData(e.target.value)
  }

  filterData = (filterDate) => {
    fetch('http://localhost:8000/api/students/filterYear?date=' + filterDate)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  fetchData = () => {
    fetch('http://localhost:8000/api/students?status=3')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          students: json
        })
      })
  }

  data = (students) => {
    const deleteConfirm = this.toggleDeleteConfirmation

    return ({
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Age',
          field: 'age',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Sex',
          field: 'sex',
          width: 10
        },
        {
          label: 'Address',
          field: 'address',
          width: 10
        },
        {
          label: 'Cell Phone',
          field: 'cellPhone',
          width: 10
        },
        {
          label: 'Home Phone',
          field: 'homePhone',
          width: 10
        },
        {
          label: 'School',
          field: 'school',
          width: 10
        },
        {
          label: 'Email',
          field: 'email',
          width: 10
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'disabled',
          width: 10
        }
      ],
      rows: (function () {
        let rowData = []

        Array.isArray(students) && students.map((data, index) => {
          rowData.push({
            name: data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
            age: data.age,
            sex: data.sex,
            address: data.street_address,
            cellPhone: data.cell_phone,
            homePhone: data.home_phone_no,
            school: data.school,
            email: data.email,
            action: 
              <div>
                <NavLink
                  to={{
                    pathname: 'student/edit',
                    state: {
                      studentId: data.id,
                      status: 4
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
  };

  tableStudentsGroup = (students) => {
    let table = []

    students.forEach((student, index) => {

      Array.isArray(student) ?
      table.push(
        <section className="content-header">
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <div className="content">
                    <h5>Class : {student[0].class_name}</h5>
                    {index < 1 && (
                      <>
                        <NavLink to="/student/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student</NavLink>
                        <div class="float-right">
                          {this.createYearPicker()}
                        </div>
                      </>
                    )}
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
                    
                    {index < 1 && (
                      <>
                        <NavLink to="/student/add" class="btn btn-success" style={{marginBottom: 10}}><i class="fa fa-plus"></i> Add Student</NavLink>
                        <div class="float-right">
                          {this.createYearPicker()}
                        </div>
                      </>
                    )}
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
    return(
      table
    )
  }

  render() {
    const { students } = this.state
    return (
      <>
      {students[0] && this.tableStudentsGroup(students)}
      
      {/* <section className="content-header">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="content">
                <div class="box-header">
                  <NavLink to="/student/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Student</NavLink>
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

