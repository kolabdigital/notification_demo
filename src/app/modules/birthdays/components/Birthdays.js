import React, { Component } from 'react';
import autobind from 'class-autobind';
import { Link } from 'react-router-dom';

const electron = window.require("electron");
const ipc = electron.ipcRenderer;


export default class Home extends Component {
  constructor () {
    super(...arguments);
    autobind(this);

    this.state = {
      toDaysBirthdays: [],
      birthdays: []
    }

    ipc.on('onBirthdaysRender', function(event, birthdays) {
      this.setState({ birthdays })
    }.bind(this));
  }

  componentDidMount () {
    ipc.send('onLoadBirthdays');
  }

  getMonth (mnt) {
    const month = {
      '1': 'January',
      '2': 'February',
      '3': 'March',
      '4': 'April',
      '5': 'May',
      '6': 'June',
      '7': 'July',
      '8': 'August',
      '9': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }
    return month[mnt.toString()];
  }

  getBirthdays () {
    return this.state.birthdays.map(item => {
      return (
        <li className="bday-item" key={item.firstName}>
          <a>
            {item.firstName}
          </a>
          <p>
            {this.getMonth([item.monthNumber])} {item.dayOfMonth}
          </p>
        </li>
      )
    });
  }

  render () {
    return (
      <div id="bday" className="wrapper">
        <header>
          <nav id="menu">
            <div className="container row">
              <Link to="/">
                {`< Notify Me`}
              </Link>
            </div>
          </nav>
          <h1 className="container row">Birthdays</h1>
        </header>
        <main>
          <div className="container row">
            <ul id="bday-list">
              {this.getBirthdays()}
            </ul>
          </div>
        </main>
        <footer>
          <div className="container row">
            <div className="col col-2 create-by">App by Kolab</div>
            <div className="col col-2 copyright">&copy; 2017</div>
          </div>
        </footer>
      </div>
    );
  }
}