import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from 'mdbreact';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";
import NumberFormat from 'react-number-format';

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
    fetch('http://103.30.247.147:8000/api/transactions/filter?date='+moment(filterDate).format("YYYY-MM-DD"))
      .then(response => response.json())
      .then((json) => {
        this.setState({
          transactions: json
        })
      })
  }

  delete(id) {
    axios.delete('http://103.30.247.147:8000/api/transaction/' + id)
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
    axios.patch('http://103.30.247.147:8000/api/transaction_paid/' + id)
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
      fetch('http://103.30.247.147:8000/api/transaction/' + id)
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
    fetch('http://103.30.247.147:8000/api/transactions')
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
          label: 'Student Name',
          field: 'student',
          sort: 'desc',
          width: 500
        },
        {
          label: 'Teacher Name',
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
            date: moment(data.date).format("DD MMMM YYYY HH:mm:ss"),
            student: data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
            teacher: data.teacher_name,
            payment: data.payment_date,
            receipt: data.receipt_number,
            cost: <NumberFormat value={data.cost} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp '} />,
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
                <b><h4>Transaction</h4></b>
                <div class="box-header" style={{paddingRight: 0}}>
                  <NavLink to="/transaction/add" class="btn btn-success"><i class="fa fa-plus"></i> Add Transaction</NavLink>
                  <div class="float-right">
                    <DatePicker
                      selected={this.state.filterDate}
                      onChange={this.onChangeFilterDate}
                      dateFormat="MMMM/yyyy"
                      showMonthYearPicker
                      className="form-control"
                      customInput={
                        <input type="text" class="form-control react-datepicker-ignore-onclickoutside" style={{width: 130}} />
                      }
                    />
                  </div>
                  <i className="fa fa-calendar" style={{position: 'absolute', marginLeft: -33, zIndex: 1, right: 5, top: 20}}/>
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

                <p>Total transaction this month: {<NumberFormat value={this.state.totalAll} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp '} />}</p>
                
                <div className="d-none">
                  {this.state.printConfirm && <ComponentToPrint
                    ref={el => (this.state.layoutPrint = el)}
                    dataTransaction={this.state.detailTransaction} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div >
                  {/* {<ComponentToPrint
                    ref={el => (this.state.layoutPrint = el)}
                    dataTransaction={this.state.detailTransaction} />} */}
                </div>
      </section>
    )
  }
}

class ComponentToPrint extends React.Component {
  render() {
    const { dataTransaction } = this.props
    let data = dataTransaction[0]
    console.log('coba', data)

    if(data.type_by_difficulty == 1){
      data.type_by_difficulty = 'Basic'
    }else if(data.type_by_difficulty == 2){
      data.type_by_difficulty = 'Intermediate'
    }else if(data.type_by_difficulty == 3){
      data.type_by_difficulty = 'Pre adv & adv'
    }

    if(data.type_by_teacher == 1){
      data.type_by_teacher = 'Regular teacher class'
    }else if(data.type_by_teacher == 2){
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
      <div id="invoice">
      <div class="invoice overflow-auto">
          <div style={{minWidth: 600}}>
              <header>
                  <div class="row">
                      <div class="col">
                          <a target="_blank" href="https://lobianijs.com">
                              <img src="https://yt3.ggpht.com/a-/AAuE7mCbB4dWqCTd2rLPl4yneC5bjucikvCKXq-XNw=s900-mo-c-c0xffffffff-rj-k-no" height="120px" data-holder-rendered="true" />
                              </a>
                      </div>
                      <div class="col company-details">
                          <h2 class="name">
                              <a target="_blank" href="https://lobianijs.com">
                              Admin KBL
                              </a>
                          </h2>
                          <div>Jln. Kemang Raya No.3, Jakarta Selatan</div>
                          <div>021 - 7521645</div>
                          <div>kbl@example.com</div>
                      </div>
                  </div>
              </header>
              <main>
                  <div class="row contacts">
                      <div class="col invoice-to">
                          <div class="text-gray-light">INVOICE TO:</div>
                          {/* Student Name */}
                          <h2 class="to">{data.first_name + ' ' + data.middle_name + ' ' + data.last_name}</h2> 
                          {/* Adress */}
                          <div class="address">{data.street_address}</div>
                          {/* Email */}
                          <div class="email"><a href="mailto:john@example.com">{data.email}</a></div>
                      </div>
                      <div class="col invoice-details">
                          <h1 class="invoice-id">Receipt Number {data.receipt_number}</h1>
                          {/* Payment Date */}
                          <div class="date">Payment Date: {data.payment_date}</div>
                          {/* <div class="date">Due Date: 30/10/2018</div> */}
                      </div>
                  </div>
                  <table border="0" cellspacing="0" cellpadding="0">
                      <thead>
                          <tr>
                              <th>#</th>
                              <th class="text-left">Transaction Type</th>
                              <th class="text-left">Class</th>
                              <th class="text-left">Level</th>
                              <th class="text-left">Participant</th>
                          </tr>
                      </thead>
                      <tbody>
                          {/* <tr>
                              <td class="no">04</td>
                              <td class="text-left"><h3>
                                  <a target="_blank" href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w">
                                  Youtube channel
                                  </a>
                                  </h3>
                                 <a target="_blank" href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w">
                                     Useful videos
                                 </a> 
                                 to improve your Javascript skills. Subscribe and stay tuned :)
                              </td>
                              <td class="unit">$0.00</td>
                              <td class="qty">100</td>
                              <td class="total">$0.00</td>
                          </tr> */}
                          <tr>
                              <td class="no">01</td>
                              <td class="text-left">{data.transaction_type_name}</td>
                              <td class="text-left">{data.class_name}</td>
                              <td class="text-left">{data.type_by_difficulty}</td>
                              <td class="text-left">{data.type_by_participant}</td>
                          </tr>
                          {/* <tr>
                              <td class="no">02</td>
                              <td class="text-left"><h3>Website Development</h3>Developing a Content Management System-based Website</td>
                              <td class="unit">$40.00</td>
                              <td class="qty">80</td>
                              <td class="total">$3,200.00</td>
                          </tr>
                          <tr>
                              <td class="no">03</td>
                              <td class="text-left"><h3>Search Engines Optimization</h3>Optimize the site for search engines (SEO)</td>
                              <td class="unit">$40.00</td>
                              <td class="qty">20</td>
                              <td class="total">$800.00</td>
                          </tr> */}
                      </tbody>
                      <tfoot>
                        <div>
                        <tr>
                              <td colspan="2"></td>
                              <td colspan="2">Cost</td>
                              <td><NumberFormat value={data.cost} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp '} /></td>
                          </tr>
                          <tr>
                              <td colspan="2"></td>
                              <td colspan="2">Royalty</td>
                              <td><NumberFormat value={data.royalty} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp '} /></td>
                          </tr>
                          <tr>
                              <td colspan="2"></td>
                              <td colspan="2">GRAND TOTAL</td>
                              <td><NumberFormat value={Number(data.cost) + Number(data.royalty)} displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp '} /></td>
                          </tr>
                        </div>
                      </tfoot>
                  </table>
                  <div class="thanks">Thank you!</div>
                  <div class="notices">
                      <div>Note:</div>
                      <div class="notice">{data.note}</div>
                  </div>
              </main>
              <footer>
                  Invoice was created on a computer and is valid without the signature and seal.
              </footer>
          </div>
          {/* DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom */}
          <div></div>
      </div>
  </div>
        
    );
  }
}