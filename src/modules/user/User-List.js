import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default class userList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      deleteConfirm: false,
      deleteId : ''
    }
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/user/' + id)
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
    fetch('http://localhost:8000/api/users')
    .then(response => response.json())
    .then((json) => {
      this.setState({
        users: json.data
      })
    })
  }

  data = (users) => {
    const deleteConfirm = this.toggleDeleteConfirmation

    return ({
      columns: [
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Username',
          field: 'username',
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

        users.map((data, index) => {
          rowData.push({
            email: data.email,
            username: data.username,
            edit: <NavLink
              to={{
                pathname: 'user/edit',
                state: {
                  userId: data.id,
                  email: data.email,
                  username: data.username
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
          <NavLink to="/user/add" class="btn btn-success"><i class="fa fa-plus"></i> Add User</NavLink>
        </div>

        <MDBDataTable
          striped
          bordered
          hover
          data={this.data(this.state.users)}
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
    )
  }
}

