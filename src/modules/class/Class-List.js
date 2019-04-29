import React, { Component } from "react";
import { MDBDataTable  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default class classList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      classes: []
    }
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/class/' + id)
      .then(console.log('Deleted'))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    // ajax call
    this.fetchData()
  }

  fetchData = () => {
    fetch('http://localhost:8000/api/classes')
    .then(response => response.json())
    .then((json) => {
      this.setState({
        classes: json.data
      })
    })
  }


  data = (classes) => {
    const classDelete = this.delete

    return ({
      columns: [
        {
          label: 'Name',
          field: 'name',
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

        classes.map((data, index) => {
          rowData.push({
            name: data.name,
            edit: <NavLink
              to={{
                pathname: 'class/edit',
                state: {
                  classId: data.id,
                  name: data.name
                }
              }}
              className="btn btn-primary">Edit</NavLink>,
            delete: <button onClick={() => classDelete(data.id)} className="btn btn-danger">Delete</button>
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
                  <NavLink to="/class/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Class</NavLink>
              </div>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={this.data(this.state.classes)}
                    btn
                    sorting={false}
                />
            </div>
        )
    }
}

