import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Easing,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  NativeModules,
  TextInput
} from "react-native";
const { width, height } = Dimensions.get("window");
import { withNavigation, Header } from "react-navigation";
import stylesGlobal from "../../styles/styles";
import CardCustom from "../../components/card";

import firebaseService from "../../services/firebaseService";
import { firebaseDatabase } from "../../utils/firebase";
import SensorValues from "../../utils/sensor-values";
import styles from "../../styles/styles";

/**
 * Objects
 */
let sensorValues;

export class MonitoringComponent extends Component {
  static navigationOptions = {
    title: "Dados dos sensores",
    headerStyle: {
      backgroundColor: "#798C35"
    },
    headerTintColor: "#F2F2F2",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      sensorValues: new SensorValues(),
      backgroundColorTemp: "#48592266",
      backgroundColorMQ7: "#48592266"
    };
    // sensorValues = firebaseService.getLastInformationFromSensors();
    // console.log(sensorValues);

    setTimeout(() => {
      this.setState({ backgroundColor: "#990000" });
    }, 3000);

    firebaseDatabase
      .ref("dados/sensors/")
      .orderByKey()
      .limitToLast(1)
      .on("child_added", snap => {
        console.log("teste", snap.val());
        this.setState({ sensorValues: snap.val() });
        if (this.state.sensorValues.mq7.ppm > 55) {
          this.setState({ backgroundColorMQ7: "#990000" });
        } else {
          this.setState({ backgroundColorMQ7: "#48592266" });
        }

        if (this.state.sensorValues.dht22.temperature > 50) {
          this.setState({ backgroundColorTemp: "#990000" });
        } else {
          this.setState({ backgroundColorTemp: "#48592266" });
        }
      });
  }

  render() {
    if (this.state.sensorValues) {
      return (
        <View
          style={[
            {
              flexDirection: "column",
              height: 500,
              padding: 20
            },
            stylesComponent.container
          ]}
        >
          <Text style={stylesComponent.text}>Temperatura:</Text>

          <CardCustom
            style={{ backgroundColor: `${this.state.backgroundColorTemp}` }}
            typeSensor="DHT11"
            description={[
              this.state.sensorValues.dht11.temperature + " ºC",
              this.state.sensorValues.dht11.humidity + " UR"
            ]}
          ></CardCustom>
          <CardCustom
            style={{ backgroundColor: `${this.state.backgroundColorTemp}` }}
            typeSensor="DHT22"
            description={[
              this.state.sensorValues.dht22.temperature + " ºC",
              this.state.sensorValues.dht22.humidity + " UR"
            ]}
          ></CardCustom>
          <Text style={stylesComponent.text}>Qualidade do ar:</Text>

          <CardCustom
            style={{ backgroundColor: `${this.state.backgroundColorMQ7}` }}
            typeSensor="MQ7"
            description={[
              this.state.sensorValues.mq7.analog + " (valor analógico)",
              this.state.sensorValues.mq7.ppm + " p.p.m."
            ]}
          ></CardCustom>
          <CardCustom
            style={{ backgroundColor: "#48592266" }}
            typeSensor="MQ2"
            description={[
              this.state.sensorValues.mq2.analog + " (valor analógico)",
              this.state.sensorValues.mq2.co + " (CO) p.p.m.",
              this.state.sensorValues.mq2.lpg + " (LPG) p.p.m."
            ]}
          ></CardCustom>
          {this.state.sensorValues.dht22.temperature > 50 ? (
            <Text style={stylesComponent.text}>Alerta: alta temperatura</Text>
          ) : null}
          {this.state.sensorValues.mq7.ppm > 55 ? (
            <Text style={stylesComponent.text}>Alerta: aumento de CO</Text>
          ) : null}
        </View>
      );
    } else {
      return null;
    }
  }
}

const stylesComponent = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2"
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 18
  }
});
export default withNavigation(MonitoringComponent);
