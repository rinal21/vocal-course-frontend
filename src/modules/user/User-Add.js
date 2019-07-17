import React, { Component } from "react";
import UserAddForm from "./form/Add-Form"

export default class userAdd extends Component {
    render() {
        const { group } = this.props.location.state
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add User
                      </h3>
                </div>
                <div className="box-body">
                    <UserAddForm
                        group={group} />
                </div>
            </div>
        )
    }
}

