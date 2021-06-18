/**为android加了相关的样式**/
import React from "react";
import { Platform } from "react-native";
import { Picker, List } from "@ant-design/react-native";

const SDHPicker = (props) => {
  return (
    <List style={{ width: "100%" }}>
      {Platform.OS === "ios" ?
        <Picker
          title={props.title}
          data={props.data}
          value={props.value}
          onOk={props.onOk}
          cols={props.cols}
          extra={props.extra}
        >
          <List.Item arrow="horizontal">
            {props.children}
          </List.Item>
        </Picker> : <Picker
          title={props.title}
          data={props.data}
          value={props.value}
          onOk={props.onOk}
          cols={props.cols}
          extra={props.extra}
          itemStyle={{ height: 40, lineHeight: 40, }}
        >
          <List.Item arrow="horizontal">
            {props.children}
          </List.Item>
        </Picker>}
    </List>
  );
};
export default SDHPicker;
