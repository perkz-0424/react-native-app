import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import { View, Keyboard, Text} from "react-native";
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

const Area = props => {
  const tabs = props.state.areas.data;
  const titles = props.state.areas.data.map((item) => {
    return {
      title: item.name ?
        <Text numberOfLines={1} ellipsizeMode="tail">{item.name}</Text> :
        <Text>请选择</Text>
    };
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
          set_searchEndValue("");
          Keyboard.dismiss();
        }}
        onSubmit={onSubmit}
        onChange={onChangeValue}
      />
      <View style={{ flex: 1 }}>
        <Tabs
          tabBarPosition="top"
          tabs={titles}
          tabBarBackgroundColor="#FFFFFF"
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarActiveTextColor="#1D9AFF"
          tabBarInactiveTextColor="#333333"
          tabBarUnderlineStyle={{ height: 3 }}
          prerenderingSiblingsNumber={3}
          page={page}
          animated={true}
        >
          <SelectProvince
            judgeTheConditionsOfChange={provinceJudge}
            area={tabs}
            navigation={useMemo(() => (props.navigation), [])}
            changeArea={changeArea}
            rootArea={props.state.userMessage.message.area}
            root={root}
            changeDispatch={changeDispatch}
            changeTitle={props.changeTitle}
          />
          <SelectCity
            judgeTheConditionsOfChange={cityJudge}
            area={tabs}
            navigation={useMemo(() => (props.navigation), [])}
            changeArea={changeArea}
            from={props.route.params.fromRouteName}
            rootArea={props.state.userMessage.message.area}
            root={root}
            changeDispatch={changeDispatch}
            changeTitle={props.changeTitle}
          />
          <SelectTown
            judgeTheConditionsOfChange={townJudge}
            area={tabs}
            navigation={useMemo(() => (props.navigation), [])}
            changeArea={changeArea}
            from={props.route.params.fromRouteName}
            rootArea={props.state.userMessage.message.area}
            root={root}
            changeDispatch={changeDispatch}
            changeTitle={props.changeTitle}
          />
          <SelectStation
            judgeTheConditionsOfChange={stationJudge}
            area={tabs}
            navigation={useMemo(() => (props.navigation), [])}
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
        </Tabs>
      </View>
    </View>
  );
};

export default connect(state => ({ state }))(memo(Area));
