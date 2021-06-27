import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

const Homework = props => {
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Text>维护作业</Text>
    </View>
  );
};

export default connect(state => ({ state }))(Homework);
