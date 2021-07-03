import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import "../../../../shim";
import { View, Keyboard, Text, Platform, TouchableOpacity, StyleSheet } from "react-native";
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
import { Tab, TabView } from "react-native-elements";

const Area = props => {
  const tabs = props.state.areas.data;
  const titles = props.state.areas.data.map((item) => {
    return { title: item.name ? item.name : "请选择" };
  });
  const index = props.state.areas.index + 1 === 4 ? 3 : props.state.areas.index + 1;
  const root = props.state.token.decoded ? props.state.token.decoded["root_level"] : "province";//权限
  const [page, set_page] = useState(index);
  const [loading, set_loading] = useState(false);
  const [searchValue, set_searchValue] = useState("");
  const [searchEndValue, set_searchEndValue] = useState("");
  const [searchResult, set_searchResult] = useState([]);
  const provinceJudge = tabs[0].name;
  const cityJudge = `${tabs[0].name}${tabs[1].name}`;
  const townJudge = `${tabs[0].name}${tabs[1].name}${tabs[2].name}`;
  const stationJudge = `${tabs[0].name}${tabs[1].name}${tabs[2].name}`;
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
      set_searchResult(res.list);
      set_searchEndValue(`${searchValue}${new Date().getTime()}`);
    }).catch(error => {
      if (error.toString() !== "AbortError: Aborted") {
        errorMessage("获取数据失败");
      }
      set_searchEndValue(searchValue);
      set_loading(false);
    });
  };
  const onSubmit = (value) => {
    Keyboard.dismiss();
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
    set_page(index);
    return () => {
      abort.abortStationsByKeyword && abort.abortStationsByKeyword();
    };
  }, []);
  const setLoading = (bool) => {
    set_loading(bool);
  };
  const onChangeValue = useCallback((value) => {
    set_searchValue(value);
  }, []);
  const createTabs = (titles) => <View style={{ borderBottomColor: "#a59f9f", borderBottomWidth: 0.2 }}>
    <Tab value={page} onChange={set_page} indicatorStyle={{ backgroundColor: "#2f5694" }}>
      {titles.map((item, index) => {
        return (
          <Tab.Item
            key={index}
            containerStyle={{ backgroundColor: "#FFF" }}
            title={
              <View style={{ height: 25, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: index === page ? "#2f5694" : "#222222", fontSize: 13.5 }} numberOfLines={1}
                      ellipsizeMode="tail">{item.title}</Text>
              </View>
            }
          />
        );
      })}
    </Tab>
  </View>;
  const renderTabBar = (tabBarPropsType) => {
    return (
      <View style={styles.tabStyle}>
        {tabBarPropsType.tabs.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  ...styles.tab,
                  borderBottomWidth: tabBarPropsType.tabBarUnderlineStyle.height,
                  borderBottomColor: tabBarPropsType.activeTab === index ? "#2f5694" : "#FFFFFF",
                }}
                onPress={() => {set_page(index);}}
              ><Text
                style={{
                  fontSize: 14,
                  color: tabBarPropsType.activeTab === index ? "#2f5694" : "#333333",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >{item.title}</Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>
    );
  };
  return (
    <View style={{ width: "100%", flex: 1, backgroundColor: config.bgColor }}>
      {useMemo(() => <Loading loading={loading} text="加载中"/>, [loading])}
      {useMemo(() => <SearchBar
        value={searchValue}
        clearButtonMode="never"
        placeholder="请输入局站名称"
        keyboardType="web-search"
        onCancel={() => {
          set_searchValue("");
          set_searchEndValue("");
          Keyboard.dismiss();
        }}
        onSubmit={onSubmit}
        onChange={onChangeValue}
      />, [searchValue])}
      <View style={{ flex: 1 }}>
        {/*<Tabs*/}
        {/*  tabBarPosition="top"*/}
        {/*  tabs={titles}*/}
        {/*  renderTabBar={renderTabBar}*/}
        {/*  tabBarBackgroundColor="#FFFFFF"*/}
        {/*  tabBarTextStyle={{ fontSize: 15 }}*/}
        {/*  tabBarActiveTextColor="#1D9AFF"*/}
        {/*  tabBarInactiveTextColor="#333333"*/}
        {/*  tabBarUnderlineStyle={{ height: 2 }}*/}
        {/*  prerenderingSiblingsNumber={3}*/}
        {/*  page={page}*/}
        {/*  animated={true}*/}
        {/*>*/}
        {/*  <SelectProvince*/}
        {/*    judgeTheConditionsOfChange={provinceJudge}*/}
        {/*    area={tabs}*/}
        {/*    navigation={props.navigation}*/}
        {/*    changeArea={changeArea}*/}
        {/*    rootArea={props.state.userMessage.message.area}*/}
        {/*    root={root}*/}
        {/*    changeDispatch={changeDispatch}*/}
        {/*    changeTitle={props.changeTitle}*/}
        {/*  />*/}
        {/*  <SelectCity*/}
        {/*    judgeTheConditionsOfChange={cityJudge}*/}
        {/*    area={tabs}*/}
        {/*    navigation={props.navigation}*/}
        {/*    changeArea={changeArea}*/}
        {/*    from={props.route.params.fromRouteName}*/}
        {/*    rootArea={props.state.userMessage.message.area}*/}
        {/*    root={root}*/}
        {/*    changeDispatch={changeDispatch}*/}
        {/*    changeTitle={props.changeTitle}*/}
        {/*  />*/}
        {/*  <SelectTown*/}
        {/*    judgeTheConditionsOfChange={townJudge}*/}
        {/*    area={tabs}*/}
        {/*    navigation={props.navigation}*/}
        {/*    changeArea={changeArea}*/}
        {/*    from={props.route.params.fromRouteName}*/}
        {/*    rootArea={props.state.userMessage.message.area}*/}
        {/*    root={root}*/}
        {/*    changeDispatch={changeDispatch}*/}
        {/*    changeTitle={props.changeTitle}*/}
        {/*  />*/}
        {/*  <SelectStation*/}
        {/*    judgeTheConditionsOfChange={stationJudge}*/}
        {/*    area={tabs}*/}
        {/*    navigation={props.navigation}*/}
        {/*    changeArea={changeArea}*/}
        {/*    from={props.route.params.fromRouteName}*/}
        {/*    rootArea={props.state.userMessage.message.area}*/}
        {/*    root={root}*/}
        {/*    searchResult={searchResult}*/}
        {/*    searchEndValue={searchEndValue}*/}
        {/*    changeDispatch={changeDispatch}*/}
        {/*    loading={setLoading}*/}
        {/*    changeTitle={props.changeTitle}*/}
        {/*  />*/}
        {/*</Tabs>*/}
        <View style={{ flex: 1 }}>
          {createTabs(titles)}
          <View style={{ flex: 1, width: "100%" }}>
            <TabView value={page} onChange={set_page} animationType="timing">
              <TabView.Item style={{ width: "100%", flex: 1 }}>
                <SelectProvince
                  judgeTheConditionsOfChange={provinceJudge}
                  area={tabs}
                  navigation={props.navigation}
                  changeArea={changeArea}
                  rootArea={props.state.userMessage.message.area}
                  root={root}
                  changeDispatch={changeDispatch}
                  changeTitle={props.changeTitle}
                />
              </TabView.Item>
              <TabView.Item style={{ width: "100%", flex: 1 }}>
                <SelectCity
                  judgeTheConditionsOfChange={cityJudge}
                  area={tabs}
                  navigation={props.navigation}
                  changeArea={changeArea}
                  from={props.route.params.fromRouteName}
                  rootArea={props.state.userMessage.message.area}
                  root={root}
                  changeDispatch={changeDispatch}
                  changeTitle={props.changeTitle}
                />
              </TabView.Item>
              <TabView.Item style={{ width: "100%", flex: 1 }}>
                <SelectTown
                  judgeTheConditionsOfChange={townJudge}
                  area={tabs}
                  navigation={props.navigation}
                  changeArea={changeArea}
                  from={props.route.params.fromRouteName}
                  rootArea={props.state.userMessage.message.area}
                  root={root}
                  changeDispatch={changeDispatch}
                  changeTitle={props.changeTitle}
                />
              </TabView.Item>
              <TabView.Item style={{ width: "100%", flex: 1 }}>
                <SelectStation
                  judgeTheConditionsOfChange={stationJudge}
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
                  changeTitle={props.changeTitle}
                />
              </TabView.Item>
            </TabView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    flexDirection: "row",
    width: "100%",
    height: 42,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  tab: {
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
});
export default connect(state => ({ state }))(memo(Area));
