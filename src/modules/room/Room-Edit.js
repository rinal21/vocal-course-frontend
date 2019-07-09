import React, { Component } from "react";
import RoomEditForm from "./form/Edit-Form"


export default class roomEdit extends Component {
    render() {
        const { noRoom, roomId } = this.props.location.state

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
                        noRoom={noRoom} />
                </div>
            </div>
        )
    }
}

