import React, { Component } from "react";

import { withNavigation, Header } from "react-navigation";
import { View } from "native-base";
import { StyleSheet, Picker } from "react-native";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import StatisticData from "../../utils/statistic-data";

import { ScreenOrientation } from "expo";

let data;
let statistic = new StatisticData();

let chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.3,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};

export class GraphicComponent extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
    this.state = {
      language: ""
    };

    statistic = this.props.navigation.state.params;

    data = {
      labels: statistic.x,
      datasets: [
        {
          data: statistic.y,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
          strokeWidth: 5 // optional
        }
      ]
    };

    // console.log("static graphic screen", this.props.navigation.state);
  }

  render() {
    return (
      <View style={{ paddingTop: 25 }}>
        <LineChart
          data={data}
          width={750}
          height={screenHeight - 400}
          verticalLabelRotation={45}
          chartConfig={chartConfig}
          withVerticalLabels={false}
          bezier
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});

export default withNavigation(GraphicComponent);
