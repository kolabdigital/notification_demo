import React, { PureComponent } from 'react';
import '../css/style-layout.css';
import logo from '../images/logo.svg'; 


export default class Layout extends PureComponent {
  render () {
    return (
      <div className="Layout">
        <div className="Layout-header">
          <img src={logo} className="Logo" alt="logo" />
          <h2>Welcome to React/Electron</h2>
        </div>
        <p className="Layout-content">
          {this.props.children}
        </p>
      </div>
    );
  }
};