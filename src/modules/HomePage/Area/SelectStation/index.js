import React, { memo, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, RefreshControl } from "react-native";
import { Radio } from "@ant-design/react-native";
import api, { abort } from "../../../../servers/Area/index";
import errorMessage from "../../../../components/errorMessage";

let prevAID = 0;
const RadioItem = Radio.RadioItem;
const SelectStation = (props) => {
  const town_children = props.area.filter(v => v.level === "town")[0].children;
  const initStationWarningCounts = town_children ? town_children : [];
  const aid = props.area.filter(v => v.level === "town")[0].AID;//区县的AID
  const AID = aid ? aid : 0;
  const SUID = props.area.filter(v => v.level === "station")[0].SUID;//选中的局站的SUID
  const townNetType = props.area.filter(v => v.level === "town")[0].netType;//区县的网络类型
  const [stationWarningCounts, set_stationWarningCounts] = useState(initStationWarningCounts);//告警数量
  const [refreshing, set_refreshing] = useState(false);//是否刷新

  //局站处理
  const getStations = () => {
    return [{ name: "选择全部" }].concat(stationWarningCounts);
  };
  const setStationWarningCounts = (res) => {
    const areas = [...props.area]; //地市信息
    const _stationWarningCounts = [...res];
    const rootArea = props.rootArea;//权限数组
    const levelRoot = props.root !== "province" && props.root !== "city" && props.root !== "town";//排除
    const rootSUID = levelRoot && Object.prototype.toString.call(rootArea) === "[object Array]" ? rootArea.map(item => item.SUID) : [];//权限SUID
    const afterRootStations = levelRoot ? _stationWarningCounts.filter(v => rootSUID.includes(v.SUID)) : _stationWarningCounts;//权限的局站
    set_stationWarningCounts(afterRootStations);
    areas[2].children = afterRootStations;
    props.changeDispatch("AREA", { data: areas });
  };
  //获取局站告警
  const getStationWarningCounts = () => {
    props.loading(true);
    if (AID) {
      api.getStationByAIDAndNetType(AID, townNetType).then(res => {
        props.loading(false);
        set_refreshing(false);
        setStationWarningCounts(res.response);
        prevAID = AID;
      }).catch((error) => {
        props.loading(false);
        set_refreshing(false);
        if (error.toString() !== "AbortError: Aborted") {
          errorMessage("获取数据失败");
        }
      });
    } else {
      props.loading(false);
    }
  };
  const setSearchStationByKeyWords = () => {
    setStationWarningCounts(props.searchResult);
    props.loading(false);
  };
  //选择局站
  const changeStation = (item) => {
    const checkStation = item.item.name;//选中的局站名
    const areas = [...props.area]; //地市信息
    const nowStation = areas[3].name;//之前被选中的局站
    if (checkStation === "选择全部") {
      if (nowStation) {
        areas[3] = { level: "station" };
        if (areas[2].name) {
          return areaDispatch("town", 2, areas, areas[2].name, 3, item);
        }
        if (areas[1].name) {
          return areaDispatch("city", 1, areas, areas[1].name, 2, item);
        }
        if (areas[0].name) {
          return areaDispatch("province", 0, areas, areas[0].name, 1, item);
        }
      }
    } else {
      if (checkStation !== nowStation) {
        areas[3] = {
          level: "station",
          name: checkStation,
          info: item,
          SUID: item.item["SUID"]
        };
        areas[2].name = item.item.parents["town"];
        areas[2].netType = item.item["NETTYPE"];
        areas[2].AID = item.item.AID;
        areas[1].name = item.item.parents.city;
        areaDispatch("station", 3, areas, checkStation, 3, item);
      }
    }
  };
  //区域变更
  const areaDispatch = (level, index, areas, name, page, item) => {
    props.changeDispatch("AREA", { data: areas, level, index });
    props.changeArea({ level, name, page, item });
    const title = props.from ? props.from : "告警列表";
    props.changeTitle(title);
    abort.abortStationByAIDAndNetType && abort.abortStationByAIDAndNetType();
    props.navigation.goBack();//返回到上一页
  };
  const renderStationRow = (item) => {
    const checked = item.item.name !== "选择全部" && item.item.SUID === SUID;
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
        onChange={() => {changeStation(item);}}
      >
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{ fontSize: 13, color: "#3c3c3c" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.item.name}
            </Text>
            {item.item.name !== "选择全部" && item.item["eng_status"] !== undefined && item.item["eng_status"] !== 0 ?
              <Image
                source={require("../../../../assets/images/icon/status_icon_monit_def.png")}
                style={{ marginLeft: 5, height: 14, width: 14 }}
              /> : null
            }
            {item.item.name !== "选择全部" && item.item["maintain_status"] ?
              <Image
                source={require("../../../../assets/images/icon/imp_icon_monit_def.png")}
                style={{ marginLeft: 5, height: 14, width: 14 }}
              /> : null
            }
          </View>
          {item.item.name === "选择全部" ? null :
            <View style={{ width: 50, alignItems: "center", justifyContent: "center" }}>
              <Text style={{
                fontSize: 13,
                color: item.item["alarm_count"] === 0 ? "#9c9c9c" : "#8C1E25"
              }}>{item.item["alarm_count"]}</Text>
            </View>}
        </View>
      </RadioItem>
    );
  };
  useEffect(() => {
    set_stationWarningCounts(initStationWarningCounts);
    if (props.searchEndValue) {
      setSearchStationByKeyWords();//搜索优先
    } else {
      /**
       * AID不变不会去重新拿数据，数据会保留
       * 但搜索完之后的也会保留搜索留下的数据
       * 防止重复掉接口拿相同数据
       * 所以加了一个下拉刷新，手动更新数据
       * */
      if (AID && AID !== prevAID) {
        getStationWarningCounts();
      }
    }
    return () => {
      abort.abortStationByAIDAndNetType && abort.abortStationByAIDAndNetType();
    };
  }, [AID, props.searchEndValue, props.judgeTheConditionsOfChange]);
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View style={styles.title}>
        <Text style={styles.fontStyle}>局站名称</Text>
        <Text style={styles.fontStyle}>告警数量</Text>
      </View>
      <FlatList
        data={getStations()}
        keyExtractor={(item) => `station${item["SUID"]}`}
        renderItem={renderStationRow}
        initialNumToRender={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
          set_refreshing(true);
          getStationWarningCounts();
        }}/>}
      />
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
  }
});
export default memo(SelectStation, (prevProps, nextProps) => {
  return !(prevProps["judgeTheConditionsOfChange"] !== nextProps["judgeTheConditionsOfChange"] || nextProps["searchEndValue"]);
});
