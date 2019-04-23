import React, { Component } from "react";
import { MDBDataTable } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default class pricingList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pricings: []
    }
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    axios.delete('http://localhost:8000/api/pricing/' + id)
      .then(console.log('Deleted'))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    // ajax call
    this.fetchData()
  }

  fetchData = () => {
    fetch('http://localhost:8000/api/pricings')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          pricings: json.data
        })
      })
  }

  data = (pricings) => {
    const pricingDelete = this.delete

    return ({
      columns: [
        {
          label: 'Class',
          field: 'class',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Total Meetup',
          field: 'meetup',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Duration',
          field: 'duration',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Type by Difficulty',
          field: 'difficulty',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Type by Teacher',
          field: 'teacher',
          sort: 'asc',
          width: 500
        },
        {
          label: 'Type by Participant',
          field: 'participant',
          sort: 'asc',
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

        pricings.map((data, index) => {
          if(data.type_by_difficulty == 1){
            data.type_by_difficulty = 'Basic'
          }else if(data.type_by_difficulty == 2){
            data.type_by_difficulty = 'Intermediate'
          }else if(data.type_by_participant == 3){
            data.type_by_difficulty = 'Pre adv & adv'
          }

          if(data.type_by_teacher == 1){
            data.type_by_teacher = 'Regular teacher class'
          }else if(data.type_by_participant == 2){
            data.type_by_teacher = 'Senior teacher class'
          }

          if(data.type_by_participant == 1){
            data.type_by_participant = 'Private'
          }else if(data.type_by_participant == 2){
            data.type_by_participant = 'Semi Private'
          }else if(data.type_by_participant == 3){
            data.type_by_participant = 'Group'
          }
          rowData.push({
            class: data.class_name,
            price: data.price,
            meetup: data.total_meetup,
            duration: data.duration,
            difficulty: data.type_by_difficulty,
            teacher: data.type_by_teacher,
            participant: data.type_by_participant,
            edit: <NavLink
              to={{
                pathname: 'pricing/edit',
                state: {
                  pricingId: data.id
                }
              }}
              className="btn btn-primary">Edit</NavLink>,
            delete: <button onClick={() => pricingDelete(data.id)} className="btn btn-danger">Delete</button>
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
                  <NavLink to="/pricing/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Pricing</NavLink>
              </div>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={this.data(this.state.pricings)}
                    btn
                />
            </div>
        )
    }
}

