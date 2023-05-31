import React from "react";
import logo from '../assets/nba-logoman-word-white.svg';
import '../styles/TopNavBar.css'; // Update the import path

export class TopNavBar extends React.Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title"></h1>
            </header>
        );
    }
}
