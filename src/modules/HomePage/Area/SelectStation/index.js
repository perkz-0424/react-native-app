import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, RefreshControl } from "react-native";
import { Radio } from "@ant-design/react-native";
import { connect } from "react-redux";
import api, { abort } from "../../../../servers/Area/index";
import errorMessage from "../../../../components/errorMessage";

const RadioItem = Radio.RadioItem;
const SelectStation = (props) => {
  const town_children = props.area.filter(v => v.level === "town")[0].children;
  const initStationWarningCounts = town_children ? town_children : [];
  const town = props.area.filter(v => v.level === "town")[0].name;//区县名称
  const aid = props.area.filter(v => v.level === "town")[0].AID;//区县的AID
  const AID = aid ? aid : 0;
  const SUID = props.area.filter(v => v.level === "station")[0].SUID;//选中的局站的SUID
  const townNetType = props.area.filter(v => v.level === "town")[0].netType;//区县的网络类型
  const [stationWarningCounts, set_stationWarningCounts] = useState(initStationWarningCounts);//告警数量
  const [refreshing, set_refreshing] = useState(false);//是否刷新

  //局站处理
  const getStations = () => {
    const root = props.state.token.decoded ? props.state.token.decoded["root_level"] : "province";//权限
    const rootArea = props.state.userMessage.message.area;//权限数组
    const levelRoot = root !== "province" && root !== "city" && root !== "town";//排除
    const rootSUID = levelRoot && Object.prototype.toString.call(rootArea) === "[object Array]" ? rootArea.map(item => item.SUID) : [];//权限SUID
    const afterRootStations = levelRoot ? stationWarningCounts.filter(v => rootSUID.includes(v.SUID)) : stationWarningCounts;//权限的局站
    return [{ name: "选择全部" }].concat(afterRootStations);
  };
  //获取局站告警
  const getStationWarningCounts = () => {
    set_refreshing(true);
    const areas = [...props.state.areas.data]; //地市信息
    api.getStationByAIDAndNetType(AID, townNetType).then(res => {
      areas[2].children = res.response;
      set_stationWarningCounts(res.response);
      props.dispatch(dispatch => {
        dispatch({ type: "AREA", payload: { data: areas } });
      });
      set_refreshing(false);
    }).catch((error) => {
      if (error.toString() !== "AbortError: Aborted") {
        errorMessage("获取数据失败");
      }
      set_refreshing(false);
    });
  };
  //选择局站
  const changeStation = (item) => {
    const checkStation = item.item.name;//选中的局站名
    const areas = [...props.state.areas.data]; //地市信息
    const nowStation = areas[3].name;//之前被选中的局站
    if (checkStation === "选择全部") {
      if (nowStation) {
        delete areas[3].name;
        delete areas[3].info;
        delete areas[3].SUID;
        areaDispatch("town", 2, areas, town, 3, item);
      }
    } else {
      if (checkStation !== nowStation) {
        areas[3].name = checkStation;
        areas[3].info = item;
        areas[3].SUID = item.item["SUID"];
        areaDispatch("station", 3, areas, checkStation, 3, item);
      }
    }
    props.dispatch(dispatch => {
      dispatch({
        type: "TITLE",
        payload: { title: props.from ? props.from : "告警列表" }
      });
    });//改变路由title
    abort.abortStationByAIDAndNetType && abort.abortStationByAIDAndNetType();
    props.navigation.goBack();//返回到上一页
  };
  //区域变更
  const areaDispatch = (level, index, areas, name, page, item) => {
    props.dispatch(dispatch => {
      dispatch({ type: "AREA", payload: { data: areas, level, index } });
    });
    props.changeArea({ level, name, page, item });
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
              <Text style={{ fontSize: 13, color: "#9c9c9c" }}>{item.item["alarm_count"]}</Text>
            </View>}
        </View>
      </RadioItem>
    );
  };
  useEffect(() => {
    return () => {
      abort.abortStationByAIDAndNetType && abort.abortStationByAIDAndNetType();
    };
  }, []);
  useMemo(() => {
    if (town) {
      getStationWarningCounts();
    }
  }, [town]);
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getStationWarningCounts}/>}
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
export default connect(state => ({ state }))(SelectStation);
