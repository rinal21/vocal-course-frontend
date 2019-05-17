import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import DatePicker from "react-datepicker";


export default class teacherList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transactions: [],
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

  filterData = (filterDate) => {
    fetch('http://localhost:8000/api/transactions/filter?date='+moment(filterDate).format("YYYY-MM-DD"))
      .then(response => response.json())
      .then((json) => {
        this.setState({
          transactions: json
        })
      })
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/transaction/' + id)
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
    fetch('http://localhost:8000/api/transactions')
    .then(response => response.json())
    .then((json) => {
      this.setState({
        transactions: json
      })
    })
  }

  data = (transactions) => {
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
          label: 'Student\'s Name',
          field: 'student',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Teacher\'s Name',
          field: 'teacher',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Payment Date',
          field: 'payment',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Receipt Number',
          field: 'receipt',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Cost',
          field: 'cost',
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

        transactions.map((data, index) => {
          rowData.push({
            date: data.date,
            student: data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
            teacher: data.teacher_name,
            payment: data.payment_date,
            receipt: data.receipt_number,
            cost: data.cost,
            edit:
              <div>
                <NavLink
                  to={{
                    pathname: 'transaction/edit',
                    state: {
                      transactionId: data.id
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
    console.log(this.state.filterDate)
    return (
      <section className="content-header">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="content">
                <div class="box-header">
                  <NavLink to="/transaction/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Transaction</NavLink>
                  <div class="float-right">
                    <DatePicker
                      selected={this.state.filterDate}
                      onChange={this.onChangeFilterDate}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      className="form-control"
                    />
                  </div>
                </div>
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={this.data(this.state.transactions)}
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

