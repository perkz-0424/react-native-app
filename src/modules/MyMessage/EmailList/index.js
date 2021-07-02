import React, { useState } from "react";
import "../../../../shim";
import { View, Text } from "react-native";
import { Tab, TabView } from "react-native-elements";

const EmailList = props => {
  const initSelectTabs = [{ title: "收件箱", amount: 0 }, { title: "发件箱", amount: 0 }, { title: "系统信息", amount: 0 }];
  const [selectTabs, set_selectTabs] = useState(initSelectTabs);//title
  const [page, set_page] = useState(0);
  //前往详情页
  const gotoEmailDetails = (item) => {
    props.changeTitle("邮件详情");
    props.navigate("EmailDetails", { item });
  };
  const createTabs = (tabs) => <View style={{ borderBottomColor: "#a59f9f", borderBottomWidth: 0.2 }}>
    <Tab value={page} onChange={set_page} indicatorStyle={{ backgroundColor: "#2f5694" }}>
      {tabs.map((item, index) => {
        return (
          <Tab.Item
            key={index}
            containerStyle={{ backgroundColor: "transparent" }}
            title={
              <View style={{ height: 25, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: index === page ? "#2f5694" : "#222222", fontSize: 13.5 }}>{item.title}</Text>
                <Text style={{ fontSize: 12, marginLeft: 3, color: "#3571a5" }}>{item.amount}</Text>
              </View>
            }
          />
        );
      })}
    </Tab>
  </View>;
  return (
    <View style={{ width: "100%", flex: 1 }}>
      {
        createTabs(selectTabs)
      }
      <TabView value={page} onChange={set_page}>
        <TabView.Item style={{ width: "100%", flex: 1 }}>
          <Text h1>Recent</Text>
        </TabView.Item>
        <TabView.Item style={{ width: "100%", flex: 1 }}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{ width: "100%", flex: 1 }}>
          <Text h1>Cart</Text>
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default EmailList;
