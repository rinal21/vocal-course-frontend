import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';


export default class teacherList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transactions: [],
      deleteConfirm: false,
      deleteId : ''
    }
    this.delete = this.delete.bind(this);
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
          label: 'Edit',
          field: 'edit',
          width: 10
        },
        {
          label: 'Delete',
          field: 'delete',
          width: 10
        }
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
            edit: <NavLink
              to={{
                pathname: 'transaction/edit',
                state: {
                  transactionId: data.id
                }
              }}
              className="btn btn-primary">Edit</NavLink>,
            delete: <button onClick={() => deleteConfirm(data.id)} className="btn btn-danger">Delete</button>
          })
        })

        return rowData
      }())
    })
  };
  render() {
    return (
      <div>
        <div class="box-header">
          <NavLink to="/transaction/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Transaction</NavLink>
        </div>
        <MDBDataTable
          striped
          bordered
          hover
          data={this.data(this.state.transactions)}
          btn
          sort={false}
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
    )
  }
}

