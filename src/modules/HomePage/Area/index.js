import React, { useState } from "react";
import { View, Keyboard, TouchableOpacity, Text, PixelRatio } from "react-native";
import { connect } from "react-redux";
import { SearchBar, Tabs } from "@ant-design/react-native";
import config from "../../../config";

export const fontScale = PixelRatio.getFontScale();
const Area = props => {
  const [searchValue, set_searchValue] = useState("");
  const [page, set_page] = useState(0);
  const renderTabBar = (tabBarPropsType) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 42,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFFFFF"
        }}
      >
        {
          tabBarPropsType.tabs.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: "25%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: tabBarPropsType.tabBarUnderlineStyle.height,
                  borderBottomColor: tabBarPropsType.activeTab === index ? "#1D9AFF" : "#FFFFFF",
                }}
                onPress={() => {set_page(index);}}
              >
                <Text
                  style={{
                    fontSize: 14 / fontScale,
                    color: tabBarPropsType.activeTab === index ? "#1D9AFF" : "#333333",
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )
          )
        }
      </View>
    );
  };
  return (
    <View style={{ width: "100%", flex: 1, backgroundColor: config.bgColor }}>
      <SearchBar
        value={searchValue}
        clearButtonMode="never"
        placeholder="请输入局站名称"
        keyboardType="web-search"
        onCancel={() => {
          set_searchValue("");
          Keyboard.dismiss();
        }}
        onSubmit={() => {}}
        onChange={value => {
          set_searchValue(value);
        }}
      />
      <View>
        <Tabs
          tabBarPosition="top"
          tabs={[
            { title: "浙江省" },
            { title: "请选择" },
            { title: "请选择" },
            { title: "请选择" },
          ]}
          renderTabBar={renderTabBar}
          initialPage={0}
          tabBarBackgroundColor="#FFFFFF"
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarActiveTextColor="#1D9AFF"
          tabBarInactiveTextColor="#333333"
          tabBarUnderlineStyle={{ width: 10, height: 3 }}
          prerenderingSiblingsNumber={3}
          page={page}
          animated={true}
        >
        </Tabs>
      </View>
    </View>
  );
};

export default connect(state => ({ state }))(Area);
