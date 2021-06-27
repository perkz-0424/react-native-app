import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

const Moint = props => {
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Text>实时监控</Text>
    </View>
  );
};

export default connect(state => ({ state }))(Moint);
