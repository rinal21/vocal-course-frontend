import React, { Component } from "react";
import RoomAddForm from "./form/Add-Form"


export default class roomAdd extends Component {
    render() {
        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Add Room
                      </h3>
                </div>
                <div className="box-body">
                    <RoomAddForm />
                </div>
            </div>
        )
    }
}

