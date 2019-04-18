import React, { Component } from "react";
import { MDBDataTable } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class studentList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/user/' + id)
      .then(console.log('Deleted'))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
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
    const userDelete = this.delete

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
            delete: <button onClick={() => userDelete(data.id)} className="btn btn-danger">Delete</button>
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
      </div>
    )
  }
}

