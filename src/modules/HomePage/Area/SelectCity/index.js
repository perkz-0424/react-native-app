import React, { useEffect, useState, memo } from "react";
import { View, Text, FlatList, StyleSheet, Image, RefreshControl } from "react-native";
import { Radio } from "@ant-design/react-native";
import level from "../../../../assets/js/level";
import api, { abort } from "../../../../servers/Area/index";
import errorMessage from "../../../../components/errorMessage";

const RadioItem = Radio.RadioItem;
const SelectCity = (props) => {
  const province_children = props.area.filter(v => v.level === "province")[0].children;
  const province = props.area.filter(v => v.level === "province")[0].name;//省份名称
  const initCityWarningCounts = province_children ? province_children : level.city.filter(v => v.parents.province === province);
  const city = props.area.filter(v => v.level === "city")[0].name;//选中的城市名称
  const [cityWarningCounts, set_cityWarningCounts] = useState(initCityWarningCounts);//告警数量
  const [refreshing, set_refreshing] = useState(false);//是否刷新
  //点击切换城市
  const changeCity = (item) => {
    const checkCity = item.item.name; //选中的市级
    const areas = [...props.area]; //地市信息
    const nowCity = areas[1].name; //现在所在的市级
    if (checkCity === "选择全部") {
      if (nowCity) {
        //删除省级以下
        areas[1] = { level: "city" };
        areas[2] = { level: "town" };
        areas[3] = { level: "station" };
        areaDispatch("province", 0, areas, province, 1, item);//更改为省级
        const title = props.from ? props.from : "告警列表";
        props.changeTitle(title)
        abort.abortCityWarningCounts && abort.abortCityWarningCounts();
        props.navigation.goBack();//返回到上一页
      }
    } else {
      if (checkCity !== nowCity) {
        areas[1] = {
          level: "city",
          name: checkCity,
          info: item
        };
        //删除市级以下
        areas[2] = { level: "town" };
        areas[3] = { level: "station" };
        areaDispatch("city", 1, areas, checkCity, 2, item);//更改为城市级
      }
    }
  };
  //区域变更
  const areaDispatch = (level, index, areas, name, page, item) => {
    props.changeDispatch("AREA", { data: areas, level, index });
    props.changeArea({ level, name, page, item });
  };
  //获取城市告警数
  const getCityWarningCounts = () => {
    set_refreshing(true);
    api.getCityWarningCounts("province").then(res => {
      setCityWarningCounts(res);
      set_refreshing(false);
    }).catch((error) => {
      if (error.toString() !== "AbortError: Aborted") {
        errorMessage("获取数据失败");
      }
      set_refreshing(false);
    });
  };
  const setCityWarningCounts = (res) => {
    const areas = [...props.area]; //地市信息
    const _cityWarningCounts = [...res];
    const rootArea = props.rootArea;//权限数组
    const rootCities = props.root !== "province" && Object.prototype.toString.call(rootArea) === "[object Array]" ? rootArea.map(item => item.city) : [];//城市权限
    const cities = level.city.filter(v => v.parents.province === province);//拿到本地地市数据表里的数据
    const citiesInfo = _cityWarningCounts.map((cityInfo => ({ ...cityInfo, ...cities.filter(v => v.name === cityInfo.name)[0] })));//根据SCID排序
    const afterRootCities = props.root === "province" ? citiesInfo : citiesInfo.filter(v => rootCities.includes(v.name));//输出权限模块
    const sortCities = afterRootCities.sort((a, b) => a["SCID"] - b["SCID"]);
    set_cityWarningCounts(sortCities);//排序
    areas[0].children = sortCities;
    props.changeDispatch("AREA", { data: areas });
  };
  //获取城市数据
  const getCities = () => {
    const cities = props.root === "province" ? [{ name: "选择全部" }] : [];
    return cities.concat(cityWarningCounts);
  };
  const renderCityRow = (item) => {
    return (
      <RadioItem
        style={{
          justifyContent: "center",
          width: "100%",
          backgroundColor: item.item.name === city ? "#f1f0f0" : "#fff",
          borderBottomWidth: 0.4,
          borderColor: "#d7d7d7"
        }}
        key={item.index}
        checked={item.item.name === city}
        onChange={() => {changeCity(item);}}
      >
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 13, color: "#3c3c3c" }}>{item.item.name}</Text>
            {item.item.name !== "选择全部" && item.item["eng_status"] !== undefined && item.item["eng_status"] !== 0 ?
              <Image
                source={require("../../../../assets/images/icon/status_icon_monit_def.png")}
                style={{ marginLeft: 5, height: 14, width: 14 }}
              /> : null}
          </View>
          {item.item.name === "选择全部" ? null :
            <View style={{ width: 50, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 13, color: "#9c9c9c" }}>
                {item.item["alarm_count"] !== undefined ? item.item["alarm_count"] : "获取中"}
              </Text>
            </View>}
        </View>
      </RadioItem>
    );
  };
  useEffect(() => {
    if (province) {
      getCityWarningCounts();
    }
    return () => {
      abort.abortCityWarningCounts && abort.abortCityWarningCounts();
    };
  }, [province]);

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View style={styles.title}>
        <Text style={styles.fontStyle}>地区名称</Text>
        <Text style={styles.fontStyle}>告警数量</Text>
      </View>
      <FlatList
        data={getCities()}
        keyExtractor={(item) => item.name}
        renderItem={renderCityRow}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getCityWarningCounts}/>}
        initialNumToRender={12}
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
export default memo(SelectCity, (prevProps, nextProps) => (prevProps["judgeTheConditionsOfChange"] === nextProps["judgeTheConditionsOfChange"]));
