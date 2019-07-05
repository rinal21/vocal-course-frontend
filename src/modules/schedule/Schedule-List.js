import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

export default class schedulesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schedules: [],
      filterDate: new Date(),
      deleteConfirm: false,
      deleteId : ''
    }
    this.delete = this.delete.bind(this);
    this.onChangeDay = this.onChangeDay.bind(this);
  }

  onChangeDay(e) {
    const branch = JSON.parse(localStorage["appState"]).user.branchId
    fetch('http://localhost:8000/api/schedules/filterDay?branch=' + branch + '&day=' + e.target.value)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          schedules: json
        })
      })
  }

  onChangeFilterDate = filterDate => {
    this.setState({
      filterDate: filterDate
    });
    this.filterData(filterDate)
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
    this.fetchData()
  }

  fetchData = () => {
    const branch = JSON.parse(localStorage["appState"]).user.branchId
    fetch('http://localhost:8000/api/schedules?branch=' + branch)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          schedules: json
        })
      })
  }

  filterData = (filterDate) => {
    fetch('http://localhost:8000/api/teacher_attendances/filter?date='+moment(filterDate).format("YYYY-MM-DD"))
      .then(response => response.json())
      .then((json) => {
        this.setState({
          teachers: json
        })
      })
  }

  data = (schedules) => {
    const deleteConfirm = this.toggleDeleteConfirmation

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
          label: 'Student\'s Name',
          field: 'student',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Teacher\'s Name',
          field: 'teacher',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Class\'s Name',
          field: 'class',
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

        schedules.map((data) => {
          rowData.push({
            day: data.day,
            time: data.time,
            student: data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
            teacher: data.teacher,
            class: data.class,
            action:
              <div>
                <NavLink
                  to={{
                    pathname: 'schedule/edit',
                    state: {
                      scheduleId: data.id,
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
  render() {
    return (
      <section className="content-header">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="content">
                <b><h4>Schedule</h4></b>
                <div class="box-header">
                  <NavLink to="/schedule/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Schedule</NavLink>
                  <div class="float-right">
                    {/* <DatePicker
                      selected={this.state.filterDate}
                      onChange={this.onChangeFilterDate}
                      dateFormat="d-MM-yyyy"
                      peekNextMonth
                      dropdownMode="select"
                      className="form-control"
                    /> */}
                    <select class="form-control" style={{ position: 'absolute', top: 75, right: 0, width: 140, zIndex: 1 }} id="day-picker" onChange={this.onChangeDay}>
                      <option value={'Monday'}>Monday</option>
                      <option value={'Tuesday'}>Tuesday</option>
                      <option value={'Wednesday'}>Wednesday</option>
                      <option value={'Thursday'}>Thursday</option>
                      <option value={'Friday'}>Friday</option>
                      <option value={'Saturday'}>Saturday</option>
                      <option value={'Sunday'}>Sunday</option>
                    </select>
                  </div>
                </div>
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={this.data(this.state.schedules)}
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
  }
}

