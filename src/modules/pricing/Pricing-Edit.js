import React, { Component } from "react";
import PricingEditForm from "./form/Edit-Form"


export default class pricingEdit extends Component {
    render() {
        const { pricingId } = this.props.location.state

        return(
            <div>
                <div className="box-header with-border">
                    <h3>
                        Edit Pricing
                      </h3>
                </div>
                <div className="box-body">
                    <PricingEditForm 
                        pricingId={pricingId} />
                </div>
            </div>
        )
    }
}

