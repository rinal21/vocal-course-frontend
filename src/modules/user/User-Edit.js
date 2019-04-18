import React, { Component } from "react";
import UserEditForm from "./form/Edit-Form"


export default class studentEdit extends Component {
    render() {
        const {userId, email, username} = this.props.location.state

        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit User
                      </h3>
                </div>
                <div className="box-body">
                    <UserEditForm
                        userId={userId}
                        email={email}
                        username={username} />
                </div>
            </div>
        )
    }
}

