import React, { Component } from "react";
import Home from "./screens/home";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { MonitoringComponent } from "./screens/monitoring/monitoring";

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppStackNavigator = createStackNavigator({
  Home: { screen: Home },
  Monitoring: { screen: MonitoringComponent }
});

const AppContainer = createAppContainer(AppStackNavigator);

export default App;
