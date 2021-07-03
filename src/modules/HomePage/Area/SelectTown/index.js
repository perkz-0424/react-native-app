import React, { useEffect, useState, memo, useMemo } from "react";
import { View, Text, FlatList, StyleSheet, Image, RefreshControl, TouchableOpacity, PixelRatio } from "react-native";
import { Radio, Tabs } from "@ant-design/react-native";
import api, { abort } from "../../../../servers/Area/index";
import errorMessage from "../../../../components/errorMessage";

let prevCity = "";//上一次搜索的城市
const RadioItem = Radio.RadioItem;
const fontScale = PixelRatio.getFontScale();
const SelectTown = (props) => {
  const city_children = props.area.filter(v => v.level === "city")[0].children;//该城市下有的区县
  const initTownWarningCounts = city_children ? city_children : [];//初始化城市信息
  const city = props.area.filter(v => v.level === "city")[0].name;//选中的城市名称
  const netType = props.area.filter(v => v.level === "town")[0].netType;//选中的区县网络类型
  const netTypeInit = netType ? netType : 0;//初始化的网络类型
  const [townWarningCounts, set_townWarningCounts] = useState(initTownWarningCounts);//告警数量
  const [refreshing, set_refreshing] = useState(false);//是否刷新
  const tabs = [{ name: "固网", netType: 0 }, { name: "无线网", netType: 1 }];//固网无线网选项
  const [netTypeIndex, set_netTypeIndex] = useState(netTypeInit);//固网无线网序号
  const AID = props.area.filter(v => v.level === "town")[0].AID;//选中的区县AID
  //切换固网无线网
  const netTypeChange = (item, index) => {
    set_netTypeIndex(index);
  };
  //区县数据
  const getTowns = () => {
    const netTypeTowns = townWarningCounts.filter(v => v["NETTYPE"] === netTypeIndex);
    const towns = (props.root === "province" || props.root === "city") && netTypeTowns.length ? [{ name: "选择全部" }] : [];
    return towns.concat(netTypeTowns);
  };//是否有选择全部;
  const setTownWarningCounts = (res) => {
    const areas = [...props.area]; //地市信息
    const _townWarningCounts = [...res];
    const rootArea = props.rootArea;//权限数组
    const levelRoot = props.root !== "province" && props.root !== "city";
    const rootAID = levelRoot && Object.prototype.toString.call(rootArea) === "[object Array]" ? rootArea.map(item => item.AID) : [];//权限AID
    const afterRootTowns = levelRoot ? _townWarningCounts.filter(v => rootAID.includes(v.AID)) : _townWarningCounts;//权限之后的局站
    const afterSort = afterRootTowns.sort((a, b) => a["AID"] - b["AID"]);
    set_townWarningCounts(afterSort);
    areas[1].children = afterSort;
    props.changeDispatch("AREA", { data: areas });
  };
  //获取数据
  const getTownsInfo = () => {
    set_townWarningCounts(initTownWarningCounts);
    set_refreshing(true);
    if (city) {
      api.getTownWarningCounts("city", city).then(res => {
        prevCity = city;
        setTownWarningCounts(res);
        set_refreshing(false);
      }).catch((error) => {
        if (error.toString() !== "AbortError: Aborted") {//不是手动终止的报网络错误
          errorMessage("获取数据失败");
        }
        set_refreshing(false);
      });
    } else {
      set_refreshing(false);
    }
  };
  //改变或选择区县
  const changeTown = (item) => {
    const checkTown = item.item.name; //选中的区县
    const areas = [...props.area]; //地市信息
    const nowTown = areas[2].name; //现在所在的区县
    if (checkTown === "选择全部") {
      if (nowTown) {
        areas[3] = { level: "station" };
        areas[2] = { level: "town" };
        areaDispatch("city", 1, areas, city, 2, item);//更改为市级
        const title = props.from ? props.from : "告警列表";
        props.changeTitle(title);
        abort.abortTownWarningCounts && abort.abortTownWarningCounts();
        props.navigation.goBack();//返回到上一页
      }
    } else {
      if (checkTown !== nowTown) {
        areas[2] = {
          level: "town",
          netType: item.item["NETTYPE"],
          name: checkTown,
          info: item,
          AID: item.item["AID"],
        };
        areas[3] = { level: "station" };
        areaDispatch("town", 2, areas, checkTown, 3, item);//更改为区县级
      }
    }
  };
  //区域变更
  const areaDispatch = (level, index, areas, name, page, item) => {
    props.changeDispatch("AREA", { data: areas, level, index });
    props.changeArea({ level, name, page, item });
  };
  const renderTownRow = (item) => {
    const checked = item.item.name !== "选择全部" && item.item.AID === AID && item.item["NETTYPE"] === netType;//被选中
    return (
      <RadioItem
        style={{
          justifyContent: "center",
          width: "100%",
          backgroundColor: checked ? "#f1f0f0" : "#fff",
          borderBottomWidth: 0.4,
          borderColor: "#d7d7d7"
        }}
        key={item.index}
        checked={checked}
        onChange={() => {changeTown(item);}}
      >
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 13, color: "#3c3c3c" }}>{item.item.name}</Text>
            {item.item.name !== "选择全部" && item.item["eng_status"] !== undefined && item.item["eng_status"] !== 0 ?
              <Image
                style={{ marginLeft: 5, height: 14, width: 14 }}
                source={require("../../../../assets/images/icon/status_icon_monit_def.png")}
              /> : null}
          </View>{item.item.name === "选择全部" ? null :
          <View style={{ width: 50, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 13, color: "#9c9c9c" }}>{item.item["alarm_count"]}</Text>
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
  useEffect(() => {
    if (city && prevCity !== city) {
      getTownsInfo();
    }
    return () => {
      abort.abortTownWarningCounts && abort.abortTownWarningCounts();
    };
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
          tabBarUnderlineStyle={{ width: 10, height: 2 }}
          prerenderingSiblingsNumber={1}
          page={netTypeIndex}
          animated={true}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <View style={styles.title}>
              <Text style={styles.fontStyle}>县市区域</Text>
              <Text style={styles.fontStyle}>告警数量</Text>
            </View>
            <FlatList
              data={getTowns()}
              keyExtractor={(item) => `town${item.AID}`}
              renderItem={renderTownRow}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTownsInfo}/>}
              initialNumToRender={15}
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
export default memo(SelectTown, (prevProps, nextProps) => (prevProps["judgeTheConditionsOfChange"] === nextProps["judgeTheConditionsOfChange"]));
