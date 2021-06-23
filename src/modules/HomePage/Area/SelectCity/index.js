import React from "react";
import { View, Text, FlatList } from "react-native";
import { Radio } from "@ant-design/react-native";
import level from "../../../../assets/js/level";
import { connect } from "react-redux";

const RadioItem = Radio.RadioItem;
const SelectCity = (props) => {
  const province = props.area.filter(v => v.level === "province")[0].name;
  const city = props.area.filter(v => v.level === "city")[0].name;
  const cities = level.city.filter(v => v.parents.province === province);
  const changeCity = (item) => {
    const checkCity = item.item.name; //选中的市级
    const areas = [...props.state.areas.data]; //地市信息
    const nowCity = areas[1].name; //现在所在的市级
    if (checkCity !== nowCity) {
      areas[1].name = checkCity;
      delete areas[2].name;
      delete areas[3].name;
      props.dispatch(dispatch => {
        dispatch({
          type: "LEVEL",
          payload: { level: "city", index: 1 }
        });
        dispatch({
          type: "AREA",
          payload: { data: areas }
        });
      });
      props.changeArea({
        level: "city",
        name: checkCity
      });
    }
  };
  const renderCityRow = (item) => {
    return (
      <RadioItem
        style={{ justifyContent: "center" }}
        key={item.index}
        checked={item.item.name === city}
        onChange={() => {changeCity(item);}}
      >
        <View style={{
          flex: 1,
          justifyContent: "center"
        }}>
          <Text style={{ fontSize: 14 }}>{item.item.name}</Text>
        </View>
      </RadioItem>
    );
  };
  const renderHeader = () => {
    return (
      <Text style={{ fontSize: 12, paddingLeft: 12, paddingTop: 11, paddingBottom: 11, color: "#999999" }}>
        地区名称
      </Text>
    );
  };
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <FlatList
        data={cities}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.name}
        renderItem={renderCityRow}
      />
    </View>
  );
};
export default connect(state => ({ state }))(SelectCity);
