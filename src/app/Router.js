import React from 'react';
import Home from './modules/home/components/Home';
import Birthdays from './modules/birthdays/components/Birthdays';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';


export default class Router extends React.Component {
  render () {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/birthdays" component={Birthdays}/>
        </div>
      </ConnectedRouter>
    );
  }
}
