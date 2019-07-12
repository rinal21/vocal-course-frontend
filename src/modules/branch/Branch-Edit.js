import React, { Component } from "react";
import BranchEditForm from "./form/Edit-Form"


export default class branchEdit extends Component {
    render() {
        const { branchId } = this.props.location.state

        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Branch
                      </h3>
                </div>
                <div className="box-body">
                    <BranchEditForm
                        branchId={branchId} />
                </div>
            </div>
        )
    }
}

