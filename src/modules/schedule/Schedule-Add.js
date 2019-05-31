import React, { Component } from "react";
import ScheduleForm from "./form/Add-Form"


export default class scheduleFormList extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Schedule
                      </h3>
                </div>
                <div className="box-body">
                    <ScheduleForm />
                </div>
            </div>
        )
    }
}

