import React, {Component} from 'react';

export default class Header extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          branches: [],
          branchSelected: '',
          branchId: ''
        }
      }

    componentDidMount = () => {
      // ajax call
      this.fetchBranches()
    }


    fetchBranches = () => {
        let userData = JSON.parse(localStorage["appState"])
        fetch('http://localhost:8000/api/user_branchs/'+userData.user.id)
        .then(response => response.json())
        .then((json) => {
          this.setState({
            branches: json,
            branchSelected: userData.user.branchId
          })
        })
    }

    createBranchPicker = (branches) => {
        let opt = []
    
        branches.map((data) => {
          opt.push(<option style={{background: '#367fa9', color: 'white'}} value={data.id}>{data.name}</option>)
        })
    
        return (
            opt
        )
      }

      onChangeBranch = (e) =>  {
        let tempStorage = JSON.parse(localStorage["appState"])
        tempStorage.user.branchId = e.target.value
        localStorage["appState"] = JSON.stringify(tempStorage)

        window.location.reload()
      }

    logout = () => {
        let appState = {
            isLoggedIn: false,
            isLogout: true,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
    }
    render(){
        const { branches, branchSelected } = this.state
        const role = JSON.parse(localStorage["appState"]).user.roleId

        return (
            <header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-lg" style={{width: role != 1 ?'106%' : '100%'}}><b>Admin</b>{role != 1 && ' - '}
                    {role != 1 && (
                        <select id="branch-picker" value={branchSelected} onChange={ (e) => this.onChangeBranch(e)} style={{background: 'none', color: 'white'}}>
                                {this.createBranchPicker(branches)}
                        </select>)}
                    </span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        {/* <ul className="nav navbar-nav">
                            <li className="dropdown messages-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-envelope-o"></i>
                                    <span className="label label-success">4</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 4 messages</li>
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <img src="/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        Support Team
                                                        <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul> */}
                        <ul className="nav navbar-nav">
                        <a href="" onClick={this.logout} style={{color: 'white'}}>Logout</a>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}