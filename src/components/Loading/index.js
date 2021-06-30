import React from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";

const Loading = (props) => {
  const styleView = props.style ? props.style : {};
  return (
    <View style={{
      width: "100%",
      position: "absolute",
      zIndex: 100,
      ...styleView,
    }}
    >
      {
        props.loading ?
          <View style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: Dimensions.get("window").height,
            backgroundColor: "rgba(0,0,0,0)",
            display: props.loading ? "flex" : "none"
          }} key={props.loading}>
            <View style={{
              height: Dimensions.get("window").width / 5.5,
              width: Dimensions.get("window").width / 5.5,
              borderRadius: Dimensions.get("window").width / 100,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
            }}><ActivityIndicator animating={props.loading} color="#FFF"/>
              {props.text ? <Text style={{
                color: "#FFF",
                marginTop: 8,
                fontSize: 12
              }}>
                {props.text}
              </Text> : null
              }
            </View>
          </View> : null
      }
    </View>
  );
};

export default Loading;
