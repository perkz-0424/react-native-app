import React, { useState } from "react";
import { View, Text, Platform, Dimensions, Image } from "react-native";
import { Tabs } from "@ant-design/react-native";
import Title from "../../components/Title";
import config from "../../config";

const MyMessage = props => {
  const [page, set_page] = useState(0);
  const leftIcon = () => {
    return (
      <Image
        style={{ width: 12, height: 18 }}
        source={require("../../assets/images/icon/back.png")}
      />
    );
  };
  const rightIcon = () => {
    return (
      <Text style={{ fontSize: 25, fontWeight: "200", color: "#2f5694" }}>+</Text>
    );
  };
  const goWriteEmail = () => {

  };
  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <View style={{
      height: Platform.OS === "ios" ? Dimensions.get("window").height : Dimensions.get("window").height - 25
    }}>
      <Title
        title={"消息"}
        titleLeft={leftIcon()}
        titleRight={rightIcon()}
        onLeftPress={goBack}
        onRightPress={goWriteEmail}
      />
      <View style={{ width: "100%", flex: 1, backgroundColor: config.bgColor }}>
        <Tabs
          tabBarPosition="none"
          tabs={["消息", "写信息"]}
          page={page}
          animated={true}
          swipeable={true}
          prerenderingSiblingsNumber={1}
        >
          <View>
            <Text>1</Text>
          </View>
          <View>
            <Text>2</Text>
          </View>
        </Tabs>
      </View>
    </View>
  );
};

export default MyMessage;
