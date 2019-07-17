import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "../modules/Home";
import About from "../modules/About";
import { PrivateRoute } from "../components/PrivateRoute"
import { withRouter } from "react-router-dom"

import StudentListPaid from "../modules/student/Student-List-Paid";
import StudentListUnpaid from "../modules/student/Student-List-Unpaid";
import StudentListTrial from "../modules/student/Student-List-Trial";
import StudentListPending from "../modules/student/Student-List-Pending";
import StudentAdd from "../modules/student/Student-Add";
import StudentEdit from "../modules/student/Student-Edit";

import UserList from "../modules/user/User-List";
import UserListAdmin from "../modules/user/User-List-Admin";
import UserListBranch from "../modules/user/User-List-BranchAdmin";
import UserListEmployee from "../modules/user/User-List-Employee";
import UserListTeacher from "../modules/user/User-List-Teacher";
import UserAdd from "../modules/user/User-Add";
import UserEdit from "../modules/user/User-Edit";

import EmployeeList from "../modules/employee/Employee-List";
import EmployeeAdd from "../modules/employee/Employee-Add";
import EmployeeEdit from "../modules/employee/Employee-Edit";

import ClassList from "../modules/class/Class-List";
import ClassAdd from "../modules/class/Class-Add";
import ClassEdit from "../modules/class/Class-Edit";

import RoomList from "../modules/room/Room-List";
import RoomAdd from "../modules/room/Room-Add";
import RoomEdit from "../modules/room/Room-Edit";

import BranchList from "../modules/branch/Branch-List";
import BranchAdd from "../modules/branch/Branch-Add";
import BranchEdit from "../modules/branch/Branch-Edit";

import RoleList from "../modules/role/Role-List";
import RoleAdd from "../modules/role/Role-Add";
import RoleEdit from "../modules/role/Role-Edit";

import TeacherList from "../modules/teacher/Teacher-List";
import TeacherAdd from "../modules/teacher/Teacher-Add";
import TeacherEdit from "../modules/teacher/Teacher-Edit";

import PricingList from "../modules/pricing/Pricing-List";
import PricingAdd from "../modules/pricing/Pricing-Add";
import PricingEdit from "../modules/pricing/Pricing-Edit";

import PayrollList from "../modules/payroll/Payroll-List";
import PayrollAdd from "../modules/payroll/Payroll-Add";

import ScheduleList from "../modules/schedule/Schedule-List";
import ScheduleAdd from "../modules/schedule/Schedule-Add";
import ScheduleEdit from "../modules/schedule/Schedule-Edit";

import AttendanceList from "../modules/attendance/Attendance-List";
import AttendanceAdd from "../modules/attendance/Attendance-Add";

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
            {this.props.children}
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
          <PrivateRoute exact path="/student-paid" component={StudentListPaid} />
          <PrivateRoute exact path="/student-unpaid" component={StudentListUnpaid} />
          <PrivateRoute exact path="/student-trial" component={StudentListTrial} />
          <PrivateRoute exact path="/student-pending" component={StudentListPending} />
          <PrivateRoute exact path="/student/add" component={StudentAdd} />
          <PrivateRoute exact path="/student/edit" component={StudentEdit} />
          <PrivateRoute exact path="/user" component={UserList} />
          <PrivateRoute exact path="/user-admin" component={UserListAdmin} />
          <PrivateRoute exact path="/user-branch" component={UserListBranch} />
          <PrivateRoute exact path="/user-employee" component={UserListEmployee} />
          <PrivateRoute exact path="/user-teacher" component={UserListTeacher} />
          <PrivateRoute exact path="/user/add" component={UserAdd} />
          <PrivateRoute exact path="/user/edit" component={UserEdit} />
          <PrivateRoute exact path="/employee" component={EmployeeList} />
          <PrivateRoute exact path="/employee/add" component={EmployeeAdd} />
          <PrivateRoute exact path="/employee/edit" component={EmployeeEdit} />
          <PrivateRoute exact path="/class" component={ClassList} />
          <PrivateRoute exact path="/class/add" component={ClassAdd} />
          <PrivateRoute exact path="/class/edit" component={ClassEdit} />
          <PrivateRoute exact path="/room" component={RoomList} />
          <PrivateRoute exact path="/room/add" component={RoomAdd} />
          <PrivateRoute exact path="/room/edit" component={RoomEdit} />
          <PrivateRoute exact path="/branch" component={BranchList} />
          <PrivateRoute exact path="/branch/add" component={BranchAdd} />
          <PrivateRoute exact path="/branch/edit" component={BranchEdit} />
          <PrivateRoute exact path="/role" component={RoleList} />
          <PrivateRoute exact path="/role/add" component={RoleAdd} />
          <PrivateRoute exact path="/role/edit" component={RoleEdit} />
          <PrivateRoute exact path="/teacher" component={TeacherList} />
          <PrivateRoute exact path="/teacher/add" component={TeacherAdd} />
          <PrivateRoute exact path="/teacher/edit" component={TeacherEdit} />
          <PrivateRoute exact path="/pricing" component={PricingList} />
          <PrivateRoute exact path="/pricing/add" component={PricingAdd} />
          <PrivateRoute exact path="/pricing/edit" component={PricingEdit} />
          <PrivateRoute exact path="/payroll" component={PayrollList} />
          <PrivateRoute exact path="/payroll/add" component={PayrollAdd} />
          <PrivateRoute exact path="/schedule" component={ScheduleList} />
          <PrivateRoute exact path="/schedule/add" component={ScheduleAdd} />
          <PrivateRoute exact path="/schedule/edit" component={ScheduleEdit} />
          <PrivateRoute exact path="/attendance" component={AttendanceList} />
          <PrivateRoute exact path="/attendance/add" component={AttendanceAdd} />
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