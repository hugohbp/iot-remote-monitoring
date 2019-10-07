import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  StatusBar
} from "react-native";
import stylesGlobal from "../styles/styles";
import AutoHeightImage from "react-native-auto-height-image";
import { withNavigation } from "react-navigation";
import * as Animatable from "react-native-animatable";
import { StyleSheet } from "react-native";

import Constants from "expo-constants";

import Botao from "../components/botao";

import imageLogo from "../assets/icons/cloud-computing.png";

let user;

class Home extends React.Component {
  handleViewRef = ref => (this.view = ref);
  // constante = Constants.manifest;

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={[stylesGlobal.containerHome]}>
        <View style={[styles.containerLogo]}>
          {/* <Animatable.View
            style={styles.logo}
            ref={this.handleViewRef}
            animation="fadeIn"
            duration={1000}
          > */}
          <AutoHeightImage
            style={[styles.logo]}
            width={140}
            source={imageLogo}
          />
          <Botao
            style={{ marginBottom: 20 }}
            action={() => this.props.navigation.navigate("Monitoring")}
            textButton="Monitorar minha residência"
          />
        </View>
        {/* </Animatable.View> */}

        {/* <View>
          <Text>v. {Constants.manifest.version}b</Text>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 22
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center"
  }
});
// withNavigation returns a component that wraps HomeCliente and passes in the
// navigation prop
export default withNavigation(Home);
