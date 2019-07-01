import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";

export default class teacherList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transactions: [],
      filterDate: new Date(),
      deleteConfirm: false,
      deleteId : '',
      paidConfirm: false,
      paidId : '',
      detailTransaction: [],
      printConfirm: false,
      printId : '',
      layoutPrint: '',
      totalAll: 0
    }
    this.delete = this.delete.bind(this);
    this.paid = this.paid.bind(this);
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

  paid(id) {
    axios.patch('http://localhost:8000/api/transaction_paid/' + id)
      .then(() => this.setState({paidConfirm: !this.state.paidConfirm}))
      .then(() => this.fetchData())
      .catch(err => console.log(err))
  }

  togglePaidConfirmation = (id) => {
    this.setState({
      paidConfirm: !this.state.paidConfirm,
      paidId: id
    });
  }

  togglePrintConfirmation = (id) => {
    if (id) {
      fetch('http://localhost:8000/api/transaction/' + id)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          detailTransaction: json,
          printConfirm: !this.state.printConfirm
        })
      })
    }
    else {
      this.setState({
        printConfirm: false
      })
    }
  }

  componentDidMount = () => {
    // ajax call
    this.fetchData()
  }

  fetchData = () => {
    var total = 0
    fetch('http://localhost:8000/api/transactions')
    .then(response => response.json())
    .then((json) => {
      json.map((data) => {
        total += data.cost
      })
      this.setState({
        totalAll: total,
        transactions: json
      })
    })
  }

  data = (transactions) => {
    const deleteConfirm = this.toggleDeleteConfirmation
    const paidConfirm = this.togglePaidConfirmation
    const printConfirm = this.togglePrintConfirmation

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
          label: 'Status',
          field: 'status',
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
            status: data.status == 0 ? 'Pending' : 'paid',
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
                <button onClick={() => deleteConfirm(data.id)} className="btn btn-danger" style={{ position: "relative", left: 10 }}>Delete</button>
                {data.status == 0 ? <button onClick={() => paidConfirm(data.id)} className="btn btn-warning" style={{ position: "relative", left: 20 }}>paid</button> 
                : <button onClick={() => printConfirm(data.id)} className="btn btn-default" style={{ position: "relative", left: 20 }}><i className="fa fa-print" />Print</button>
                }
              </div>
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
                <div class="box-header">
                  <NavLink to="/transaction/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Transaction</NavLink>
                  <div class="float-right">
                    <DatePicker
                      selected={this.state.filterDate}
                      onChange={this.onChangeFilterDate}
                      dateFormat="MMMM/yyyy"
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

                <MDBContainer>
                  <MDBModal isOpen={this.state.paidConfirm} toggle={this.togglePaidConfirmation} size="sm" centered>
                    <MDBModalHeader toggle={this.togglePaidConfirmation}>paid Confirmation</MDBModalHeader>
                    <MDBModalBody>
                      Are you sure this transaction has been paid ?
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={this.togglePaidConfirmation}>No</MDBBtn>
                      <MDBBtn color="success" onClick={() => this.paid(this.state.paidId)}>Yes</MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </MDBContainer>

                <MDBContainer>
                  <MDBModal isOpen={this.state.printConfirm} toggle={this.togglePrintConfirmation} size="md" centered>
                    <MDBModalHeader toggle={this.togglePrintConfirmation}>Detail Student</MDBModalHeader>
                    <MDBModalBody>
                      Do you want to print this Transaction ?
                    </MDBModalBody>
                    <MDBModalFooter>
                      <ReactToPrint
                        trigger={() => <button className="btn btn-default"><i className="fa fa-print" />Print</button>}
                        content={() => this.state.layoutPrint}
                      />
                      <MDBBtn color="secondary" onClick={this.togglePrintConfirmation}>Close</MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </MDBContainer>

                <p>Total transaction this month: {this.state.totalAll}</p>
                
                <div className="d-none">
                  {this.state.printConfirm && <ComponentToPrint
                    ref={el => (this.state.layoutPrint = el)}
                    dataTransaction={this.state.detailTransaction} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

class ComponentToPrint extends React.Component {
  render() {
    const { dataTransaction } = this.props
    let data = dataTransaction[0]

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
    
    return (
      <>
        <div className="content-wrapper" style={{ backgroundColor: 'white' }}>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Student's Name
            </label>
            <label>: &nbsp;</label>
            <label>{data.first_name + ' ' + data.middle_name + ' ' + data.last_name}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Teacher's Name
            </label>
            <label>: &nbsp;</label>
            <label>{data.teacher_name}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Class
            </label>
          <label>: &nbsp;</label>
            <label>{data.class_name + ' - ' + data.type_by_difficulty + ' - ' + data.type_by_participant}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Payment Date
            </label>
            <label>: &nbsp;</label>
            <label>{data.payment_date}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Receipt Number
            </label>
            <label>: &nbsp;</label>
            <label>{data.receipt_number}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Cost
            </label>
            <label>: &nbsp;</label>
            <label>{data.cost}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Royalty
            </label>
            <label>: &nbsp;</label>
            <label>{data.royalty}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Note
            </label>
            <label>: &nbsp;</label>
            <label>{data.note}</label>
          </div>
          <div className="form-inline mb-2">
            <label for="name" class="mr-sm-2 text-left d-block" style={{ width: 190 }}>
              Total
            </label>
            <label>: &nbsp;</label>
            <label>{Number(data.cost) + Number(data.royalty)}</label>
          </div>
        </div>
      </>
    );
  }
}