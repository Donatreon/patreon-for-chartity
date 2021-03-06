import React, { Component } from "react";
import { Route } from "react-router-dom";
// import { createMuiTheme } from '@material-ui/core/styles';

import Home from 'views/Home';
import CreateOrg from 'views/CreateOrg';
import Profile from 'views/Profile';
import SignIn from 'views/SignIn';
import SideMenu from 'views/SideMenu'

import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";

import 'typeface-roboto'

import 'normalize.css/normalize.css';
import './App.css';

// import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';

// bootstrap the initial data state
import demo_data from 'fake-data.json';

function createSub({ id, amount, recurring, interval }) {
  return {
    // id: `2018TXHCK305${demo_data.length + 1}`, // temp crappy id maker
    id,
    amount,
    recurring,
    interval,
  }
}

const demo_user = {
  name: 'Gus Goodguy',
  subs: [
    // charities backed by the User
    {
      id: '2018TXHCK301',
      recurring: true,
      amount: 1, // in whole dollars
      interval: 'm', // monthly: m, quarterly: q
      total: 10,
      active: true
    },
    {
      id: '2018TXHCK311',
      recurring: true,
      amount: 5, // in whole dollars
      interval: 'q', // monthly: m, quarterly: q
      total: 60,
      active: true
    },
    {
      id: '2018TXHCK313',
      recurring: true,
      amount: 5, // in whole dollars
      interval: 'm', // monthly: m, quarterly: q
      total: 100,
      active: false
    }
  ],
  image: 'https://banner2.kisspng.com/20180404/lpe/kisspng-philip-j-fry-bender-leela-sticker-futurama-5ac54bcf3781d5.5554988315228794392274.jpg',
}


const WrappedRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      exact
      path={path}
      render={props => {
        return <Component {...props} {...rest} />;
      }}
    />
  );
};


// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#ED1B2E',
//     },
//   }
// });


class App extends Component {
  state = {
    orgs: demo_data.orgs,
    user: demo_user,
    showMenu: false,
  }

  updateState = (key, new_data) => {
    if (key === 'user') {
      this.setState({
        user: {
          ...this.state.user,
          subs: [...this.state.user.subs, new_data]
        }
      })
    }
    else {
      const targetIndex = this.state.user.subs.findIndex((sub) => sub.id === new_data.ID)
      // update target record recurring and active values
      this.state.user.subs[targetIndex]['recurring'] = new_data.recurring
      this.state.user.subs[targetIndex]['active'] = new_data.recurring

      // this.state.user
      this.setState({
        user: {
          ...this.state.user,
          subs: [...this.state.user.subs]
        }
      })
    }
  }

  toggleDrawer = (open) => () => {
    this.setState({
      showMenu: open,
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar toggleDrawer={this.toggleDrawer} />

        <SideMenu open={this.state.showMenu} toggleOpen={this.toggleDrawer} ctx={this.state} updateState={this.updateState} />

        <WrappedRoute path="/" component={Home} ctx={this.state} update={this.updateState} />
        <WrappedRoute path="/create-org" component={CreateOrg} ctx={this.state} update={this.updateState} />
        <WrappedRoute path="/profile" component={Profile} ctx={this.state} update={this.updateState} />
        <WrappedRoute path="/signin" component={SignIn} ctx={this.state} update={this.updateState} />
        <Footer />
      </div>
    );
  }
}

export default App;

// export default withStyles(styles)(App);
