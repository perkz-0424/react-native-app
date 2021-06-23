import React from "react";
import { View, Text, FlatList } from "react-native";
import { Radio } from "@ant-design/react-native";
import level from "../../../../assets/js/level";
import { connect } from "react-redux";

const RadioItem = Radio.RadioItem;
const SelectProvince = (props) => {
  const province = props.area.filter(v => v.level === "province")[0].name; //现有省级（来自props）
  const changeProvince = (provinceItem) => {
    const province = provinceItem.item.name; //选中的省级
    const areas = [...props.state.areas.data]; //地市信息
    const nowProvince = areas[0].name; //现在所在的省级
    if (province !== nowProvince) {
      //省级改变，市级、区级、局站级都重置
      areas[0].name = province;
      delete areas[1].name;
      delete areas[2].name;
      delete areas[3].name;
      props.dispatch(dispatch => {
        dispatch({
          type: "LEVEL",
          payload: { level: "province" }
        });
        dispatch({
          type: "AREA",
          payload: { data: areas }
        });
      });
      props.changeArea({
        level: "province",
        name: province
      });
    }
  };
  const renderProvinceRow = (provinceItem) => {
    return <RadioItem
      style={{
        justifyContent: "center"
      }}
      key={provinceItem.index}
      checked={provinceItem.item.name === province}
      onChange={() => {
        changeProvince(provinceItem);
      }}
    >
      <View style={{
        flex: 1,
        justifyContent: "center"
      }}>
        <Text style={{ fontSize: 14 }}>{provinceItem.item.name}</Text>
      </View>
    </RadioItem>;
  };
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          () => <Text
            style={{
              fontSize: 13,
              paddingLeft: 12,
              paddingTop: 14,
              paddingBottom: 8,
              color: "#999999"
            }}>
            选择省份
          </Text>
        }
        keyExtractor={(item) => item.name}
        data={level.province}
        renderItem={(item) => renderProvinceRow(item)}
      />
    </View>
  );
};
export default connect(state => ({ state }))(SelectProvince);
