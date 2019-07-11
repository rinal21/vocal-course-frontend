import React, { Component } from "react";
import RoleEditForm from "./form/Edit-Form"


export default class roleEdit extends Component {
    render() {
        const { name, roleId } = this.props.location.state

        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Role
                      </h3>
                </div>
                <div className="box-body">
                    <RoleEditForm
                        roleId={roleId}
                        name={name} />
                </div>
            </div>
        )
    }
}

