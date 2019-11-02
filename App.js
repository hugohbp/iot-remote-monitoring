import React, { Component } from "react";
import Home from "./screens/home";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { MonitoringComponent } from "./screens/monitoring/monitoring";
import { StatisticsComponent } from "./screens/statistics/statistics";
import { GraphicComponent } from "./screens/statistics/graphic";

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppStackNavigator = createStackNavigator({
  Home: { screen: Home },
  Monitoring: { screen: MonitoringComponent },
  Statistics: { screen: StatisticsComponent },
  Graphic: { screen: GraphicComponent }
});

const AppContainer = createAppContainer(AppStackNavigator);

export default App;
