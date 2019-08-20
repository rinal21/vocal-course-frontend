import React, { Component } from "react";
import { MDBDataTable  } from 'mdbreact';
import { NavLink } from "react-router-dom";

import axios from 'axios';
import moment from "moment";
import DatePicker from "react-datepicker";
import NumberFormat from 'react-number-format';

export default class classList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      payrolls: [],
      fromDate: new Date(),
      toDate: new Date(),
      deleteConfirm: false,
      deleteId : '',
      totalAll: 0
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
    var total = 0
    fetch('http://localhost:8000/api/payrolls?from_date=' + from + '&to_date=' + to)
      .then(response => response.json())
      .then((json) => {
        json.map((data) => {
          total += data.total
        })
        this.setState({
          totalAll: total,
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
          label: 'Teacher Name',
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
          width: "500px"
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
        // {
        //   label: 'Action',
        //   field: 'action',
        //   sort: 'disabled',
        //   width: 10
        // },
      ],
      rows: (function () {
        let rowData = []

        payrolls.map((data, index) => {
          rowData.push({
            date: data.date,
            teacher: data.name,
            count: data.students_count,
            salary: <NumberFormat value={data.total_salary} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp '} style={{float: "right"}}/>,
            vacation: data.total_vacation,
            absent: data.total_absent,
            total: <NumberFormat value={data.total} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp '} style={{float: "right"}}/>
            // edit:
            //   <div>
            //     <NavLink
            //       to={{
            //         pathname: 'payroll/edit',
            //         state: {
            //           payrollId: data.id
            //         }
            //       }}
            //       className="btn btn-primary">Edit</NavLink>
            //     <button onClick={() => deleteConfirm(data.id)} className="btn btn-danger" style={{ position: "relative", left: 25 }}>Delete</button>
            //   </div>
          })
        })

        return rowData
      }())
    })
  };
  render() {
    console.log(this.state.totalAll)
    return (
      <>
        <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="content">
                <b><h4>Payroll</h4></b>
                  <div>
                    <div class="form-inline">
                      <DatePicker
                        selected={this.state.fromDate}
                        onChange={this.onChangeFromDate}
                        selectsStart
                        startDate={this.state.fromDate}
                        endDate={this.state.toDate}
                        dateFormat="MMMM/yyyy"
                        showMonthYearPicker
                        dropdownMode="select"
                        className="form-control"
                      />
                      <i className="fa fa-calendar" style={{marginLeft: -33, zIndex: 1}}/>
                      <label style={{ marginLeft: 30, marginRight: 10 }}>-</label>
                      <DatePicker
                        selected={this.state.toDate}
                        onChange={this.onChangeToDate}
                        selectsEnd
                        startDate={this.state.fromDate}
                        endDate={this.state.toDate}
                        dateFormat="MMMM/yyyy"
                        showMonthYearPicker
                        dropdownMode="select"
                        className="form-control"
                      />
                      <i className="fa fa-calendar" style={{marginLeft: -33, zIndex: 1}}/>

                      <button type="button" class="btn btn-info" color="#fff" style={{ marginLeft: 30 }} onClick={() => this.filterData(this.state.fromDate, this.state.toDate)} ><i class="fa fa-print"></i>
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
                    data={this.data(this.state.payrolls)}
                  />

                  <p style={{position: 'absolute', right: 28, marginTop: -66}}>
                    Total : {<NumberFormat value={this.state.totalAll} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp '} />}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </>
    )
  }
}

