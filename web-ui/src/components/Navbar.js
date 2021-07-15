import React from 'react';
import { Component } from 'react';
import { NavLink} from "react-router-dom";
import '../css/NavBar.css'

class MyNavbar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <div class="container">
                    <NavLink exact to ="/"className="nav-links">Titan Rover User Interface</NavLink>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarColor01">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                {/* <a class="nav-link" href="https://controls.titanrover.com">2D Mode
                                <span class="sr-only">(current)</span>
                                </a> */}
                                <NavLink exact to ="/"className="nav-links"> 2D Mode </NavLink>
                            </li>
                            <li class="nav-item">
                                {/* <a class="nav-link" href="https://controls.titanrover.com/XR">XR Mode</a> */}
                                {/* <a class="nav-link" href="http://localhost:3000/XR">XR Mode</a> */}
                                <NavLink exact to ="/XR" className="nav-links"> XR </NavLink>
                            </li>
                            <li class="nav-item">
                                {/* <a class="nav-link" href="https://controls.titanrover.com">Science Mode</a> */}
                                {/* <a class="nav-link" href="http://localhost:3000/science">Science</a> */}
                                <NavLink exact to ="/science" className="nav-links"> Science </NavLink>
                            </li>
                            <li class="nav-item">
                                {/* <a class="nav-link" href="https://controls.titanrover.com">Electricals Mode</a> */}
                                {/* <a class="nav-link" href="http://localhost:3000/electricals">Electricals Mode</a> */}
                                <NavLink exact to ="/electricals" className="nav-links"> Electricals </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default MyNavbar;