import React, { Component } from "react";
import RoomEditForm from "./form/Edit-Form"


export default class roomEdit extends Component {
    render() {
        const { name, roomId } = this.props.location.state

        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Room
                      </h3>
                </div>
                <div className="box-body">
                    <RoomEditForm
                        roomId={roomId}
                        name={name} />
                </div>
            </div>
        )
    }
}

