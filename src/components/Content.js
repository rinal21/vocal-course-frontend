import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "../modules/Home";
import About from "../modules/About";
import { PrivateRoute } from "../components/PrivateRoute"
import { withRouter } from "react-router-dom"

import StudentList from "../modules/student/Student-List";
import StudentAdd from "../modules/student/Student-Add";
import StudentEdit from "../modules/student/Student-Edit";

import UserList from "../modules/user/User-List";
import UserAdd from "../modules/user/User-Add";
import UserEdit from "../modules/user/User-Edit";

import ClassList from "../modules/class/Class-List";
import ClassAdd from "../modules/class/Class-Add";
import ClassEdit from "../modules/class/Class-Edit";

import TeacherList from "../modules/teacher/Teacher-List";
import TeacherAdd from "../modules/teacher/Teacher-Add";
import TeacherEdit from "../modules/teacher/Teacher-Edit";

import PricingList from "../modules/pricing/Pricing-List";
import PricingAdd from "../modules/pricing/Pricing-Add";
import PricingEdit from "../modules/pricing/Pricing-Edit";

import PayrollList from "../modules/payroll/Payroll-List";
import PayrollAdd from "../modules/payroll/Payroll-Add";

import TeacherAttendanceList from "../modules/teacher-attendance/Teacher-List";
import TeacherAttendanceAdd from "../modules/teacher-attendance/Teacher-Add";
import TeacherAttendanceEdit from "../modules/teacher-attendance/Teacher-Edit";

import StudentAttendanceList from "../modules/student-attendance/Student-List";
import StudentAttendanceAdd from "../modules/student-attendance/Student-Add";
import StudentAttendanceEdit from "../modules/student-attendance/Student-Edit";

import TransactionList from "../modules/transaction/Transaction-List";
import TransactionAdd from "../modules/transaction/Transaction-Add";
import TransactionEdit from "../modules/transaction/Transaction-Edit";

import Login from '../modules/login-admin/Login-Form';
// import studentAttendances from '../modules/student-attendance/form/Add-Form';

class Template extends Component {
  render() {
    switch (this.props.type) {
      case 'dashboard':
        return (
          <div className="content-wrapper">
            <section className="content-header">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <div className="content">
                      {this.props.children}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
      default:
        return (this.props.children)
    }
  }
}

class Content extends Component {
  render() {
    let templateType = localStorage["appState"] ? (JSON.parse(localStorage["appState"]).isLoggedIn ? 'dashboard' : 'login') : 'login'

    return (
      <>
        <Template type={templateType}>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/about" component={About} />
          <PrivateRoute exact path="/student" component={StudentList} />
          <PrivateRoute exact path="/student/add" component={StudentAdd} />
          <PrivateRoute exact path="/student/edit" component={StudentEdit} />
          <PrivateRoute exact path="/user" component={UserList} />
          <PrivateRoute exact path="/user/add" component={UserAdd} />
          <PrivateRoute exact path="/user/edit" component={UserEdit} />
          <PrivateRoute exact path="/class" component={ClassList} />
          <PrivateRoute exact path="/class/add" component={ClassAdd} />
          <PrivateRoute exact path="/class/edit" component={ClassEdit} />
          <PrivateRoute exact path="/teacher" component={TeacherList} />
          <PrivateRoute exact path="/teacher/add" component={TeacherAdd} />
          <PrivateRoute exact path="/teacher/edit" component={TeacherEdit} />
          <PrivateRoute exact path="/pricing" component={PricingList} />
          <PrivateRoute exact path="/pricing/add" component={PricingAdd} />
          <PrivateRoute exact path="/pricing/edit" component={PricingEdit} />
          <PrivateRoute exact path="/payroll" component={PayrollList} />
          <PrivateRoute exact path="/payroll/add" component={PayrollAdd} />
          <PrivateRoute exact path="/teacher-attendance" component={TeacherAttendanceList} />
          <PrivateRoute exact path="/teacher-attendance/add" component={TeacherAttendanceAdd} />
          <PrivateRoute exact path="/teacher-attendance/edit" component={TeacherAttendanceEdit} />
          <PrivateRoute exact path="/student-attendance" component={StudentAttendanceList} />
          <PrivateRoute exact path="/student-attendance/add" component={StudentAttendanceAdd} />
          <PrivateRoute exact path="/student-attendance/edit" component={StudentAttendanceEdit} />
          <PrivateRoute exact path="/transaction" component={TransactionList} />
          <PrivateRoute exact path="/transaction/add" component={TransactionAdd} />
          <PrivateRoute exact path="/transaction/edit" component={TransactionEdit} />
        </Template>
      </>
    );
  }
}

export default withRouter(Content)