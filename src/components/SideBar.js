
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

class SideBar extends Component {
    render(){
      // console.log('selma', this.props)
      const username = JSON.parse(localStorage["appState"]).user.username
      const role = JSON.parse(localStorage["appState"]).user.roleId
      const { location } = this.props

        return (
          <aside className="main-sidebar">
            <section className="sidebar">
              <div className="user-panel">
                <div className="pull-left image">
                  <img
                    src="/img/user2-160x160.jpg"
                    className="img-circle"
                    alt="User"
                  />
                </div>
                <div className="pull-left info">
                  <p>{username}</p>
                  <a href="">
                    <i className="fa fa-circle text-success" /> Online
                  </a>
                </div>
              </div>
              <form action="" method="get" className="sidebar-form">
                <div className="input-group">
                  <input
                    type="text"
                    name="q"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <span className="input-group-btn">
                    <button
                      type="submit"
                      name="search"
                      id="search-btn"
                      className="btn btn-flat"
                    >
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </form>
              <ul className="sidebar-menu" data-widget="tree">
                <li className="header">MAIN NAVIGATION</li>
                <li>
                  <Link to="/">
                    <i className="fa fa-dashboard" /> <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/class">
                    <i className="fa fa-users" /> <span>Class</span>
                  </Link>
                </li>
                <li>
                  <Link to="/room">
                    <i className="fa fa-home" /> <span>Room</span>
                  </Link>
                </li>
                {role == 1 && (
                  <>
                    <li>
                      <Link to="/branch">
                        <i className="fa fa-home" /> <span>Branch</span>
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/user">
                        <i className="fa fa-user" /> <span>User</span>
                      </Link>
                    </li> */}
                    <li className="treeview">
                  <a href="">
                    <i className="fa fa-child" />
                    <span>User</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                      <ul className="treeview-menu">
                        <li>
                          <Link to="/user">
                            <i className={location.pathname == '/user' ? "fa fa-circle" : "fa fa-circle-o"} style={{ color: location.pathname == '/user' && '#fff' }} />
                            <span style={{ color: location.pathname == '/user' && '#fff' }}>Users</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/user-teacher">
                            <i className={location.pathname == '/user-teacher' ? "fa fa-circle" : "fa fa-circle-o"} style={{ color: location.pathname == '/user-teacher' && '#fff' }} />
                            <span style={{ color: location.pathname == '/user-teacher' && '#fff' }}>Teacher</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/user-employee">
                            <i className={location.pathname == '/user-employee' ? "fa fa-circle" : "fa fa-circle-o"} style={{ color: location.pathname == '/user-employee' && '#fff' }} />
                            <span style={{ color: location.pathname == '/user-employee' && '#fff' }}>Employee</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/user-admin">
                            <i className={location.pathname == '/user-admin' ? "fa fa-circle" : "fa fa-circle-o"} style={{ color: location.pathname == '/user-admin' && '#fff' }} />
                            <span style={{ color: location.pathname == '/user-admin' && '#fff' }}>Admin</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/user-branch">
                            <i className={location.pathname == '/user-branch' ? "fa fa-circle" : "fa fa-circle-o"} style={{ color: location.pathname == '/user-branch' && '#fff' }} />
                            <span style={{ color: location.pathname == '/user-branch' && '#fff' }}>Branch Admin</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/employee">
                        <i className="fa fa-user" /> <span>Employee</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/role">
                        <i className="fa fa-user" /> <span>Role</span>
                      </Link>
                    </li>
                  </>
                )}
                
                <li className="treeview">
                  <a href="">
                    <i className="fa fa-child" />
                    <span>Student</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li>
                      <Link to="/student-paid">
                        <i className={location.pathname == '/student-paid' ? "fa fa-circle" : "fa fa-circle-o"} style={{color: location.pathname == '/student-paid' && '#fff'}}/> 
                        <span style={{color: location.pathname == '/student-paid' && '#fff'}}>Paid</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/student-unpaid">
                        <i className={location.pathname == '/student-unpaid' ? "fa fa-circle" : "fa fa-circle-o"} style={{color: location.pathname == '/student-unpaid' && '#fff'}}/> 
                        <span style={{color: location.pathname == '/student-unpaid' && '#fff'}}>Unpaid</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/student-trial">
                        <i className={location.pathname == '/student-trial' ? "fa fa-circle" : "fa fa-circle-o"} style={{color: location.pathname == '/student-trial' && '#fff'}}/> 
                        <span style={{color: location.pathname == '/student-trial' && '#fff'}}>Trial</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/student-pending">
                        <i className={location.pathname == '/student-pending' ? "fa fa-circle" : "fa fa-circle-o"} style={{color: location.pathname == '/student-pending' && '#fff'}}/> 
                        <span style={{color: location.pathname == '/student-pending' && '#fff'}}>Pending</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/schedule">
                    <i className="fa fa-calendar" /> <span>Schedule</span>
                  </Link>
                </li>
                <li>
                  <Link to="/attendance">
                    <i className="fa fa-check-square-o" /> <span>Attendance</span>
                  </Link>
                </li>
                <li>
                  <Link to="/teacher">
                    <i className="fa fa-graduation-cap" /> <span>Teacher</span>
                  </Link>
                </li>
                <li>
                  <Link to="/transaction">
                    <i className="fa fa-exchange" /> <span>Transaction</span>
                  </Link>
                </li>
                <li>
                  <Link to="/pricing">
                    <i className="fa fa-tag" /> <span>Pricing</span>
                  </Link>
                </li>
                <li>
                  <Link to="/payroll">
                    <i className="fa fa-print" /> <span>Payroll</span>
                  </Link>
                </li>

                {/* <li>
                  <Link to="/student-attendance">
                    <i className="fa fa-check-square-o" /> <span>Student Attendance</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/teacher-attendance">
                    <i className="fa fa-check-square-o" /> <span>Teacher Attendance</span>
                  </Link>
                </li> */}
                  {/* <li className="treeview">
                    <a href="">
                      <i className="fa fa-pie-chart" />
                      <span>Charts</span>
                      <span className="pull-right-container">
                        <i className="fa fa-angle-left pull-right" />
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href="pages/charts/chartjs.html">
                          <i className="fa fa-circle-o" /> ChartJS
                        </a>
                      </li>
                      <li>
                        <a href="pages/charts/morris.html">
                          <i className="fa fa-circle-o" /> Morris
                        </a>
                      </li>
                      <li>
                        <a href="pages/charts/flot.html">
                          <i className="fa fa-circle-o" /> Flot
                        </a>
                      </li>
                      <li>
                        <a href="pages/charts/inline.html">
                          <i className="fa fa-circle-o" /> Inline charts
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul className="treeview-menu">
                      <li>
                        <a href="pages/tables/simple.html">
                          <i className="fa fa-circle-o" /> Simple tables
                        </a>
                      </li>
                      <li>
                        <a href="pages/tables/data.html">
                          <i className="fa fa-circle-o" /> Data tables
                        </a>
                      </li>
                    </ul>
                  </li> */}
                </ul>
            </section>
          </aside>
        );
    }
}

export default withRouter(SideBar)