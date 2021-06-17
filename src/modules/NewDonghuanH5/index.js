import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import config from "../../config";
import isBangsScreen from "../../assets/js/iPhone";

const NewDonghuanH5 = () => {
  return (
    <View style={style.webView}>
      <WebView source={{ uri: config.webH5Url }}/>
    </View>
  );
};
const style = {
  webView: {
    flex: 1,
    paddingTop: isBangsScreen() ? 35 : 0,
  },
};
export default NewDonghuanH5;
