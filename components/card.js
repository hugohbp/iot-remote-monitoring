import React, { Component } from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

import stylesGlobal from "../styles/styles";

export default class CardCustom extends Component {
  render() {
    return (
      <View style={[stylesCard.container]}>
        <View style={{ flex: 0.5 }}>
          <Text
            style={[stylesCard.text, stylesCard.textTypeSensor]}
            accessibilityLabel={`${this.props.typeSensor}`}
          >
            {this.props.typeSensor}
          </Text>
        </View>
        <View style={{ flex: 0.5 }}>
          {this.props.description.map((current, index) => (
            <Text
              key={index}
              style={[stylesCard.text, stylesCard.textDescription]}
              accessibilityLabel={`${current}`}
            >
              {current}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}
const stylesCard = StyleSheet.create({
  container: {
    backgroundColor: "#48592266",
    flexDirection: "row",
    padding: 20,
    borderRadius: 10,
    marginBottom: 5
  },
  text: {
    fontWeight: "bold",
    color: "#F2F2F2",
    fontSize: 18
  },
  textTypeSensor: {},
  textDescription: {}
});
