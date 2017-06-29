import React, { Component } from 'react';
import autobind from 'class-autobind';
import { Link } from 'react-router-dom';

const electron = window.require("electron");
const ipc = electron.ipcRenderer;


export default class Home extends Component {
  constructor () {
    super(...arguments);
    autobind(this);

    this.message = '';

    this.state = {
      notified: null
    }

    ipc.on('onNotified', function(event, birthdays) {
      this.setState({ notified: 'notification successful' })
    }.bind(this));
  }
rm 
  handleOnClick() {
    ipc.send('onNotify', {
      title: 'My notifier',
      message: this.message,
      closeLabel: 'close'
    });
  }

  handleOnChange (event) {
    this.message = event.target.value;
  }

  render () {
    return (
      <div id="home" className="wrapper">
        <header>
          <nav id="menu">
            <div className="container row">
              <Link to="/birthdays">{`Birthdays >`}</Link>
            </div>
          </nav>
          <h1 className="container row">Notify Me</h1>
        </header>
        <main>
          <div className="container row">
            <label htmlFor="message">Message</label>
            <input type="text" id="message" className="message" placeholder="Enter notification" onChange={this.handleOnChange} />
            <button onClick={this.handleOnClick}>Send Notification</button>
          </div>
        </main>
        <footer className="fixed">
          <div className="container row">
            <div className="col col-2 create-by">App by Kolab</div>
            <div className="col col-2 copyright">&copy; 2017</div>
          </div>
        </footer>
      </div>
    );
  }
}