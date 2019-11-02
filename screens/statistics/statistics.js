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
  TextInput,
  Picker
} from "react-native";
const { width, height } = Dimensions.get("window");
import { withNavigation, Header } from "react-navigation";
import stylesGlobal from "../../styles/styles";
import CardCustom from "../../components/card";

import firebaseService from "../../services/firebaseService";
import { firebaseDatabase } from "../../utils/firebase";
import SensorValues from "../../utils/sensor-values";
import StatisticData from "../../utils/statistic-data";
import styles from "../../styles/styles";
import { Input } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import Time from "../../utils/time";

import Botao from "../../components/botao";

/**
 * Objects
 */
let sensorX = [];
let sensorY = [];

export class StatisticsComponent extends Component {
  static navigationOptions = {
    title: "Informações medidas",
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
      sensorValues: new Map(),
      dataInicial: "2019-10-12T17:05:00",
      dataFinal: "2019-10-12T17:10:00",
      typeSensor: "mq7",
      detailSensor: "ppm",
      timeStampInicial: new String(
        new Date("2019-10-12T17:05:00").getTime() + ""
      ).substring(0, 10),
      timeStampFinal: new String(
        new Date("2019-10-12T17:10:00").getTime() + ""
      ).substring(0, 10),
      statisticData: new StatisticData()
    };

    /**
     * TESTE
     *
     */
    this.searchDataOnFirebase();

    // sensorValues = firebaseService.getLastInformationFromSensors();
    // console.log(sensorValues);
  }

  treatDataForGraphic = () => {
    if (this.state.sensorValues) {
      sensorX = [];
      sensorY = [];

      this.state.sensorValues.forEach((value, key) => {
        // console.log("indice: ", key, "elemento:", value);
        sensorX.push(key);
        sensorY.push(value[this.state.typeSensor][this.state.detailSensor]);
      });

      // console.log("resultado");

      // sensorX.forEach((disgraca, index) => {
      //   console.log(disgraca);
      // });
      // sensorY.forEach((value, index) => {
      //   console.log(value);
      // });

      this.props.navigation.navigate(
        "Graphic",
        new StatisticData(sensorX, sensorY)
      );
    }
  };

  searchDataOnFirebase = () => {
    if (this.state.timeStampInicial && this.state.timeStampFinal) {
      this.setState({
        sensorValues: new Map()
      });
      // firebaseDatabase
      //   .ref("dados/sensors/")
      //   .orderByKey()
      //   .startAt(this.state.timeStampInicial)
      //   .endAt(this.state.timeStampFinal)
      //   .limitToLast(8000)
      //   .on("child_added", snap => {
      //     console.log("snap", snap);
      //     // snap.forEach(t => {
      //     //   sensorValues = new SensorValues();
      //     //   sensorValues = t.val();
      //     //   console.log("Item", sensorValues);
      //     // });

      //     this.setState({
      //       sensorValues: this.state.sensorValues.set(snap.key, snap.val())
      //     });
      //   });
      firebaseDatabase
        .ref("dados/sensors/")
        .orderByKey()
        .startAt(this.state.timeStampInicial)
        .endAt(this.state.timeStampFinal)
        .limitToLast(8000)
        .once("value")
        .then(snapshot => {
          console.log("valor carregado:", Object.entries(snapshot.val()));
          this.setState({
            sensorValues: new Map(Object.entries(snapshot.val()))
          });
        });
    }
  };

  render() {
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
        <Text style={stylesComponent.text}>Data inicial:</Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.dataInicial}
          mode="datetime"
          // placeholder="select date"
          format="YYYY-MM-DDTHH:mm:ss"
          // maxDate="2019-10-12T17:05:00"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            console.log(new Date(date));
            console.log("time", new Date(date).getTime());
            this.setState({
              dataInicial: date,
              timeStampInicial: new String(
                new Date(date).getTime() + ""
              ).substring(0, 10)
            });
            this.searchDataOnFirebase();
          }}
        />

        <Text style={stylesComponent.text}>Data final:</Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.dataFinal}
          mode="datetime"
          // placeholder="select date"
          format="YYYY-MM-DDTHH:mm:ss"
          // maxDate="2019-10-12T17:10:00"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            console.log(new Date(date));
            console.log("time", new Date(date).getTime());
            this.setState({
              dataFinal: date,
              timeStampFinal: new String(
                new Date(date).getTime() + ""
              ).substring(0, 10)
            });
            this.searchDataOnFirebase();
          }}
        />
        <Text style={stylesComponent.text}>Tipo do sensor:</Text>
        <Picker
          selectedValue={this.state.typeSensor}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ typeSensor: itemValue });
            this.searchDataOnFirebase();
          }}
        >
          <Picker.Item label="DHT11" value="dht11" />
          <Picker.Item label="DHT22" value="dht22" />
          <Picker.Item label="MQ2" value="mq2" />
          <Picker.Item label="MQ7" value="mq7" />
        </Picker>
        <Text style={stylesComponent.text}>Informação detalhada:</Text>
        <Picker
          selectedValue={this.state.detailSensor}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ detailSensor: itemValue });
            this.searchDataOnFirebase();
          }}
        >
          <Picker.Item label="Analog" value="analog" />
          <Picker.Item label="ppm" value="ppm" />
          <Picker.Item label="humidity" value="humidity" />
          <Picker.Item label="temperature" value="temperature" />
          <Picker.Item label="CO" value="co" />
          <Picker.Item label="LPG" value="lpg" />
        </Picker>

        <Botao
          style={{ marginTop: 10 }}
          action={
            () => this.treatDataForGraphic()
            // this.props.navigation.navigate(
            //   "Graphic",
            //   new StatisticData(new Date(), new Date())
            // )
          }
          textButton="Gerar gráfico"
        />
      </View>
    );
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
export default withNavigation(StatisticsComponent);
