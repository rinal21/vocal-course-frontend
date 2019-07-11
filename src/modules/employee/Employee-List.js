import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default class employeeList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: [],
      deleteConfirm: false,
      deleteId : ''
    }
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/employee/' + id)
      .then(console.log('Deleted'))
      .then(() => this.setState({deleteConfirm: !this.state.deleteConfirm}))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    // ajax call
    this.fetchData()
  }

  fetchData = () => {
    fetch('http://localhost:8000/api/employees')
    .then(response => response.json())
    .then((json) => {
      this.setState({
        employees: json.data
      })
    })
  }

  toggleDeleteConfirmation = (id) => {
    this.setState({
      deleteConfirm: !this.state.deleteConfirm,
      deleteId: id
    });
  }

  data = (employees) => {
    const deleteConfirm = this.toggleDeleteConfirmation

    return ({
      columns: [
        {
          label: 'Name',
          field: 'name',
          width: 150
        },
        {
          label: 'Email',
          field: 'email',
          width: 150
        },
        {
          label: 'No HP',
          field: 'noHp',
          width: 150
        },
        {
          label: 'Address',
          field: 'address',
          width: 150
        },
        {
          label: 'Gender',
          field: 'gender',
          width: 150
        },
        {
          label: 'Birthdate',
          field: 'birthdate',
          width: 150
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'disable',
          width: 100
        }
      ],
      rows: (function () {
        let rowData = []

        employees.map((data, index) => {
          rowData.push({
            name: data.name,
            email: data.email,
            noHp: data.no_hp,
            address: data.address,
            gender: data.gender,
            birthdate: data.birthdate,
            action:
              <div>
                <NavLink
                  to={{
                    pathname: 'employee/edit',
                    state: {
                      employeeId: data.id
                    }
                  }}
                  className="btn btn-primary">Edit</NavLink>
                <button onClick={() => deleteConfirm(data.id)} className="btn btn-danger" style={{ position: "relative", left: 25 }}>Delete</button>
              </div>,
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
                <b><h4>Employee</h4></b>
                <div className="box-header">
                  <NavLink to="/employee/add" className="btn btn-success"><i className="fa fa-plus"></i> Add Employee</NavLink>
                </div>
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={this.data(this.state.employees)}
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

