import React, { Component } from "react"
import { Route } from "react-router-dom"

class Redirect extends Component {
    componentDidMount() {
        localStorage.getItem("appState") === null && alert('You must login first')
        localStorage["appState"] && JSON.parse(localStorage["appState"]).isLogout && localStorage.removeItem("appState");
        window.location.replace('/login')
    }

    render() {
        return (<></>)
    }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage["appState"] && JSON.parse(localStorage["appState"]).isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect/>
            )}
    />
)