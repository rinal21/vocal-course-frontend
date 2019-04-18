import React, { Component } from "react";
import UserAddForm from "./form/Add-Form"

export default class userAdd extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add User
                      </h3>
                </div>
                <div className="box-body">
                    <UserAddForm />
                </div>
            </div>
        )
    }
}

