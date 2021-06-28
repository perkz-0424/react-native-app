import React, { useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, RefreshControl, TouchableOpacity, PixelRatio } from "react-native";
import { Radio, Tabs } from "@ant-design/react-native";
import { connect } from "react-redux";
import api from "../../../../servers/Area/index";
import errorMessage from "../../../../components/errorMessage";

const RadioItem = Radio.RadioItem;
const fontScale = PixelRatio.getFontScale();
const SelectTown = (props) => {
  const city = props.area.filter(v => v.level === "city")[0].name;//选中的城市名称
  const town = props.area.filter(v => v.level === "town")[0].name;//选中的区县名称
  const netType = props.area.filter(v => v.level === "town")[0].netType;//选中的区县网络类型
  const netTypeInit = netType ? netType : 0;//初始化的网络类型在哪页
  const [townWarningCounts, set_townWarningCounts] = useState([]);//告警数量
  const [refreshing, set_refreshing] = useState(false);//是否刷新
  const tabs = [{ name: "固网", netType: 0 }, { name: "无线网", netType: 1 }];//固网无线网选项
  const [netTypeIndex, set_netTypeIndex] = useState(netTypeInit);//固网无线网序号
  //切换固网无线网
  const netTypeChange = (item, index) => {
    set_netTypeIndex(index);
  };
  //区县数据
  const getTowns = () => {
    const towns = townWarningCounts.filter(v => v["NETTYPE"] === netTypeIndex).sort((a, b) => a["AID"] - b["AID"]);
    return [{ name: "选择全部" }].concat(towns);
  };
  //获取数据
  const getTownsInfo = () => {
    set_refreshing(true);
    api.getTownWarningCounts("city", city).then(res => {
      set_refreshing(false);
      set_townWarningCounts(res);
    }).catch(() => {
      set_refreshing(false);
      errorMessage("获取数据失败");
    });
  };

  //改变或选择区县
  const changeTown = (item) => {
    const checkTown = item.item.name; //选中的区县
    const areas = [...props.state.areas.data]; //地市信息
    const nowTown = areas[2].name; //现在所在的区县
    if (checkTown === "选择全部") {
      if (nowTown) {
        delete areas[3].name;
        delete areas[3].info;
        delete areas[2].name;
        delete areas[2].info;
        delete areas[2].netType;
        areaDispatch("city", 1, areas, city, 2, item);//更改为市级
        props.dispatch(dispatch => {
          dispatch({
            type: "TITLE",
            payload: { title: props.from ? props.from : "告警列表" }
          });
        });//改变路由title
        props.navigation.goBack();//返回到上一页
      }
    } else {
      if (checkTown !== nowTown) {
        areas[2].netType = item.item["NETTYPE"];
        areas[2].name = checkTown;
        areas[2].info = item;
        delete areas[3].name;
        delete areas[3].info;
        areaDispatch("town", 2, areas, checkTown, 3, item);//更改为区县级
      }
    }
  };

  //区域变更
  const areaDispatch = (level, index, areas, name, page, item) => {
    props.dispatch(dispatch => {
      dispatch({ type: "AREA", payload: { data: areas, level, index } });
    });
    props.changeArea({ level, name, page, item });
  };
  const renderTownRow = (item) => {
    return (
      <RadioItem
        style={{
          justifyContent: "center",
          width: "100%",
          backgroundColor: item.item.name === city ? "#f1f0f0" : "#fff"
        }}
        key={item.index}
        checked={item.item.name === town && item.item["NETTYPE"] === netType}
        onChange={() => {changeTown(item);}}
      >
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <Text style={{ fontSize: 14 }}>{item.item.name}</Text>
            {item.item.name !== "选择全部" && item.item["eng_status"] !== undefined && item.item["eng_status"] !== 0 ?
              <Image
                style={{ marginLeft: 5, height: 14, width: 14 }}
                source={require("../../../../assets/images/icon/status_icon_monit_def.png")}
              /> : null}
          </View>{item.item.name === "选择全部" ? null :
          <View style={{ width: 50, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 14, color: "#9c9c9c" }}>{item.item["alarm_count"]}</Text>
          </View>}
        </View>
      </RadioItem>
    );
  };
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
                  borderBottomColor: tabBarPropsType.activeTab === index ? "#1D9AFF" : "#FFFFFF",
                }}
                onPress={() => {netTypeChange(item, index);}}
              ><Text style={{
                fontSize: 14 / fontScale,
                color: tabBarPropsType.activeTab === index ? "#1D9AFF" : "#333333",
              }}
              >{item.name}</Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <View style={styles.title}>
        <Text style={styles.fontStyle}>地区名称</Text>
        <Text style={styles.fontStyle}>告警数量</Text>
      </View>
    );
  };
  useMemo(() => {
    getTownsInfo();
  }, [city]);
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Tabs
          tabBarPosition="top"
          initialPage={0}
          tabs={tabs}
          renderTabBar={renderTabBar}
          tabBarBackgroundColor="#FFFFFF"
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarActiveTextColor="#1D9AFF"
          tabBarInactiveTextColor="#333333"
          tabBarUnderlineStyle={{ width: 10, height: 3 }}
          prerenderingSiblingsNumber={1}
          page={netTypeIndex}
          animated={false}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <FlatList
              data={getTowns()}
              ListHeaderComponent={renderHeader}
              keyExtractor={(item) => item.name}
              renderItem={renderTownRow}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTownsInfo}/>}
            />
          </View>
        </Tabs>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    paddingLeft: 18,
    paddingTop: 11,
    paddingBottom: 11,
    paddingRight: 18,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  fontStyle: {
    fontSize: 12,
    color: "#999999"
  },
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
export default connect(state => ({ state }))(SelectTown);
