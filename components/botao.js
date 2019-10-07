import React, { Component } from "react";
import { Text, TouchableHighlight } from "react-native";
import styles from "../styles/styles";

const Botao = ({ route, textButton, action }) => (
  <TouchableHighlight style={styles.button} onPress={action}>
    <Text style={styles.textButton} accessibilityLabel={`${textButton}`}>
      {textButton}
    </Text>
  </TouchableHighlight>
);

export default Botao;
