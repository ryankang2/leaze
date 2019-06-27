import React, {Component} from "react";
import "./LoginTabs.css";
import LoginBox from "./LoginBox.js";
import RegisterBox from "./RegisterBox.js";
import {Tabs, Tab} from "react-materialize";

export default class LoginTabs extends Component {

    render () {
        return <div id="logTabs">
            <Tabs>
                <Tab title="Log In" active>
                    <LoginBox />
                </Tab>
                <Tab title="Register">
                    <RegisterBox />
                </Tab>

            </Tabs>
        </div>
    }
}
