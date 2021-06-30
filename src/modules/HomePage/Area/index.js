import React, { useState, useEffect } from "react";
import { View, Keyboard, TouchableOpacity, Text, PixelRatio } from "react-native";
import { connect } from "react-redux";
import { SearchBar, Tabs } from "@ant-design/react-native";
import config from "../../../config";
import SelectProvince from "./SelectProvince";
import SelectCity from "./SelectCity";
import SelectTown from "./SelectTown";
import SelectStation from "./SelectStation";
import Loading from "../../../components/Loading";
import api, { abort } from "../../../servers/Area";
import errorMessage from "../../../components/errorMessage";

const fontScale = PixelRatio.getFontScale();
const Area = props => {
  const tabs = props.state.areas.data;
  const index = props.state.areas.index + 1 === 4 ? 3 : props.state.areas.index + 1;
  const root = props.state.token.decoded ? props.state.token.decoded["root_level"] : "province";//权限
  const [page, set_page] = useState(index);
  const [loading, set_loading] = useState(false);
  const [searchValue, set_searchValue] = useState("");
  const [searchEndValue, set_searchEndValue] = useState("");
  const [searchResult, set_searchResult] = useState([]);
  const changeArea = ({ page }) => {
    set_page(page);
  };
  const searchStationsByKeyWords = (value) => {
    const areas = props.state.areas;
    const level = areas.level;
    const group_id = props.state.token.decoded["group_id"];
    const params = {
      group_id,
      level,
      keyword: value,
      AID: areas.data[2].AID,
      net_type: areas.data[2].netType,
    };
    switch (level) {
      case "city":
        params.area_name = areas.data[1].name;
        break;
      case "town":
        params.area_name = areas.data[2].name;
        break;
      case "station":
        params.level = "town";
        params.area_name = areas.data[2].name;
        break;
      default:
    }
    api.getStationsByKeyword(params).then(res => {
      set_loading(false);
      set_searchResult(res.list);
      set_searchEndValue(searchValue);
    }).catch(error => {
      if (error.toString() !== "AbortError: Aborted") {
        errorMessage("获取数据失败");
      }
      set_searchEndValue(searchValue);
      set_loading(false);
    });
  };
  const onSubmit = (value) => {
    if (value) {
      set_page(3);
      set_loading(true);
      searchStationsByKeyWords(value);
    }
  };

  const changeDispatch = (type, data) => {
    props.dispatch(dispatch => {
      dispatch({ type, payload: { ...data } });
    });
  };
  useEffect(() => {
    return () => {
      abort.abortStationsByKeyword && abort.abortStationsByKeyword();
    };
  }, []);
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
          tabBarPropsType.tabs.map((item, index) => {
              return (
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
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name ? item.name : "请选择"}
                  </Text>
                </TouchableOpacity>
              );
            }
          )
        }
      </View>
    );
  };
  const setLoading = (bool) => {
    set_loading(bool);
  };
  return (
    <View style={{ width: "100%", flex: 1, backgroundColor: config.bgColor }}>
      <Loading loading={loading} text="加载中"/>
      <SearchBar
        value={searchValue}
        clearButtonMode="never"
        placeholder="请输入局站名称"
        keyboardType="web-search"
        onCancel={() => {
          set_searchValue("");
          Keyboard.dismiss();
        }}
        onSubmit={onSubmit}
        onChange={value => {
          set_searchValue(value);
        }}
      />
      <View style={{ flex: 1 }}>
        <Tabs
          tabBarPosition="top"
          tabs={tabs}
          renderTabBar={renderTabBar}
          tabBarBackgroundColor="#FFFFFF"
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarActiveTextColor="#1D9AFF"
          tabBarInactiveTextColor="#333333"
          tabBarUnderlineStyle={{ width: 10, height: 3 }}
          prerenderingSiblingsNumber={2}
          page={page}
          animated={true}
        >
          <SelectProvince
            area={tabs}
            navigation={props.navigation}
            changeArea={changeArea}
            rootArea={props.state.userMessage.message.area}
            root={root}
            changeDispatch={changeDispatch}
          />
          <SelectCity
            area={tabs}
            navigation={props.navigation}
            changeArea={changeArea}
            from={props.route.params.fromRouteName}
            rootArea={props.state.userMessage.message.area}
            root={root}
            changeDispatch={changeDispatch}

          />
          <SelectTown
            area={tabs}
            navigation={props.navigation}
            changeArea={changeArea}
            from={props.route.params.fromRouteName}
            rootArea={props.state.userMessage.message.area}
            root={root}
            changeDispatch={changeDispatch}
          />
          <SelectStation
            area={tabs}
            navigation={props.navigation}
            changeArea={changeArea}
            from={props.route.params.fromRouteName}
            rootArea={props.state.userMessage.message.area}
            root={root}
            searchResult={searchResult}
            searchEndValue={searchEndValue}
            changeDispatch={changeDispatch}
            loading={setLoading}
          />
        </Tabs>
      </View>
    </View>
  );
};

export default connect(state => ({ state }))(Area);
