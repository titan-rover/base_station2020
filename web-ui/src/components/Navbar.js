import React from 'react';
import { Component } from 'react';

class MyNavbar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <div class="container">
                    <a class="navbar-brand" href="https://controls.titanrover.com">Titan Rover User Interface</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarColor01">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="https://controls.titanrover.com">2D Mode
                                <span class="sr-only">(current)</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://controls.titanrover.com/XR">XR Mode</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default MyNavbar;