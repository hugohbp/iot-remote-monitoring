import React, { Component } from "react";
import { Text, TouchableHighlight } from "react-native";
import stylesGlobal from "../styles/styles";

const Botao = ({ route, textButton, action, style }) => (
  <TouchableHighlight style={[stylesGlobal.button, style]} onPress={action}>
    <Text style={stylesGlobal.textButton} accessibilityLabel={`${textButton}`}>
      {textButton}
    </Text>
  </TouchableHighlight>
);

export default Botao;
