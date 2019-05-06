import React, { Component } from "react";
import { MDBDataTable  } from 'mdbreact';
import { NavLink } from "react-router-dom";

import axios from 'axios';
import moment from "moment";
import DatePicker from "react-datepicker";

export default class classList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      payrolls: [],
      fromDate: new Date(),
      toDate: new Date(),
      deleteConfirm: false,
      deleteId : ''
    }
    this.delete = this.delete.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  onChangeFromDate = (fromDate) => {
    this.setState({
      fromDate: fromDate
    });
  }

  onChangeToDate = (toDate) => {
    this.setState({
      toDate: toDate
    });
  }

  filterData = (fromDate, toDate) => {
    const from = moment(fromDate).format("YYYY-MM-DD")
    const to = moment(toDate).format("YYYY-MM-DD")
    fetch('http://localhost:8000/api/payrolls?from_date=' + from + '&to_date=' + to)
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        this.setState({
          payrolls: json
        })
      })
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/payroll/' + id)
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

  data = (payrolls) => {
    const deleteConfirm = this.toggleDeleteConfirmation

    return ({
      columns: [
        {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Teacher\'s Name',
          field: 'teacher',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Students Count',
          field: 'count',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Total Salary',
          field: 'salary',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Total Vacation',
          field: 'vacation',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Total Absent',
          field: 'Absent',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Total',
          field: 'total',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'disabled',
          width: 10
        },
      ],
      rows: (function () {
        let rowData = []

        payrolls.map((data, index) => {
          rowData.push({
            date: data.date,
            teacher: data.name,
            count: data.students_count,
            salary: data.total_salary,
            vacation: data.total_vacation,
            absent: data.total_absent,
            total: data.total,
            edit:
              <div>
                <NavLink
                  to={{
                    pathname: 'payroll/edit',
                    state: {
                      payrollId: data.id
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
        <div>
          <div>
              <div class="form-inline">
                <DatePicker
                  selected={this.state.fromDate}
                  onChange={this.onChangeFromDate}
                  selectsStart
                  startDate={this.state.fromDate}
                  endDate={this.state.toDate}
                  dateFormat="d-MM-yyyy"
                  peekNextMonth
                  dropdownMode="select"
                  className="form-control"
                />
                <label style={{ marginLeft: 10, marginRight: 10 }}>-</label>
                <DatePicker
                  selected={this.state.toDate}
                  onChange={this.onChangeToDate}
                  selectsEnd
                  startDate={this.state.fromDate}
                  endDate={this.state.toDate}
                  dateFormat="d-MM-yyyy"
                  peekNextMonth
                  dropdownMode="select"
                  className="form-control"
                />

                <button type="button" class="btn btn-info" color="#fff" style={{marginLeft: 10}} onClick={() => this.filterData(this.state.fromDate, this.state.toda)} ><i class="fa fa-print"></i>
                  Generate
                </button>
              </div>
                  
              </div>
                <MDBDataTable
                    sortable={true}
                    fixed={false}
                    // order={['name', 'desc' ]}
                    striped
                    bordered
                    hover
                    data={this.data(this.state.payrolls )}
                />
            </div>
        )
    }
}

