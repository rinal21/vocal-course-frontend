import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "../modules/Home";
import About from "../modules/About";

import StudentList from "../modules/student/Student-List";
import StudentAdd from "../modules/student/Student-Add";

import UserList from "../modules/user/User-List";
import UserAdd from "../modules/user/User-Add";

import ClassList from "../modules/class/Class-List";
import ClassAdd from "../modules/class/Class-Add";

import TeacherList from "../modules/teacher/Teacher-List";
import TeacherAdd from "../modules/teacher/Teacher-Add";

import PricingList from "../modules/pricing/Pricing-List";
import PricingAdd from "../modules/pricing/Pricing-Add";

import PayrollList from "../modules/payroll/Payroll-List";
import PayrollAdd from "../modules/payroll/Payroll-Add";

import TeacherAttendanceList from "../modules/teacher-attendance/Teacher-List";
import TeacherAttendanceAdd from "../modules/teacher-attendance/Teacher-Add";

import StudentAttendanceList from "../modules/student-attendance/Student-List";
import StudentAttendanceAdd from "../modules/student-attendance/Student-Add";

import TransactionList from "../modules/transaction/Transaction-List";
import TransactionAdd from "../modules/transaction/Transaction-Add";
export default class Content extends Component {
    render(){
        return (
                <div className="content-wrapper">
            <section className="content-header">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    
                        <div className="content">
                          <Route exact path="/" component={Home} />
                          <Route path="/about" component={About} />
                          <Route exact path="/student" component={StudentList} />
                          <Route path="/student/add" component={StudentAdd} />
                          <Route exact path="/user" component={UserList} />
                          <Route exact path="/user/add" component={UserAdd} />
                          <Route exact path="/class" component={ClassList} />
                          <Route exact path="/class/add" component={ClassAdd} />
                          <Route exact path="/teacher" component={TeacherList} />
                          <Route exact path="/teacher/add" component={TeacherAdd} />
                          <Route exact path="/pricing" component={PricingList} />
                          <Route exact path="/pricing/add" component={PricingAdd} />
                          <Route exact path="/payroll" component={PayrollList} />
                          <Route exact path="/payroll/add" component={PayrollAdd} />
                          <Route exact path="/teacher-attendance" component={TeacherAttendanceList} />
                          <Route exact path="/teacher-attendance/add" component={TeacherAttendanceAdd} />
                          <Route exact path="/student-attendance" component={StudentAttendanceList} />
                          <Route exact path="/student-attendance/add" component={StudentAttendanceAdd} />                          
                          <Route exact path="/transaction" component={TransactionList} />
                          <Route exact path="/transaction/add" component={TransactionAdd} />
                        </div>
                      
                    
                  </div>    
                </div>
              </div>
              
            </section>
          </div>
          
        );
    }
}