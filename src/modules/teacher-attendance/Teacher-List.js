import React, { Component } from "react";
import { MDBDataTable  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

export default class teacherList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teachers: [],
      filterDate: new Date()
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
    axios.delete('http://localhost:8000/api/teacher_attendance/' + id)
      .then(console.log('Deleted'))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    // ajax call
    this.fetchData()
  }

  fetchData = () => {
    fetch('http://localhost:8000/api/teacher_attendances')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          teachers: json
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

  data = (teachers) => {
    const teacherAttendanceDelete = this.delete

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
          label: 'Edit',
          field: 'edit',
          width: 100
        },
        {
          label: 'Delete',
          field: 'delete',
          width: 100
        }
      ],
      rows: (function () {
        let rowData = []

        teachers.map((data) => {
          rowData.push({
            date: data.date,
            name: data.name,
            absent: data.status == 1 && <i class="fa fa-check" style={{ float: "right", position: "relative", right: "50%" }}></i>,
            permission: data.status == 2 && <i class="fa fa-check" style={{ float: "right", position: "relative", right: "50%" }}></i>,
            attend: data.status == 3 && <i class="fa fa-check" style={{ float: "right", position: "relative", right: "50%" }}></i>,
            edit: <NavLink
              to={{
                pathname: 'teacher-attendance/edit',
                state: {
                  teacherId: data.id,
                }
              }}
              className="btn btn-primary">Edit</NavLink>,
            delete: <button onClick={() => teacherAttendanceDelete(data.id)} className="btn btn-danger">Delete</button>
          })
        })

        return rowData
      }())
    })
  };
    render() {
        return(
            <div>
              <div class="box-header">
                  <NavLink to="/teacher-attendance/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Teacher Attendance</NavLink>
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
                    data={this.data(this.state.teachers)}
                    btn
                />
            </div>
        )
    }
}

