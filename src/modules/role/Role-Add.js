import React, { Component } from "react";
import RoleAddForm from "./form/Add-Form"


export default class roleAdd extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Role
                      </h3>
                </div>
                <div className="box-body">
                    <RoleAddForm />
                </div>
            </div>
        )
    }
}

