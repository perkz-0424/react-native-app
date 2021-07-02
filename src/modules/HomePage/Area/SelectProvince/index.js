import React, { memo } from "react";
import { View, Text, FlatList } from "react-native";
import { Radio } from "@ant-design/react-native";
import level from "../../../../assets/js/level";

const RadioItem = Radio.RadioItem;
const SelectProvince = (props) => {
  console.log(0)
  const province = props.area.filter(v => v.level === "province")[0].name; //现有省级（来自props）
  const changeProvince = (provinceItem) => {
    const province = provinceItem.item.name; //选中的省级
    const areas = [...props.area]; //地市信息
    const nowProvince = areas[0].name; //现在所在的省级
    if (province !== nowProvince) {
      //省级改变，市级、区级、局站级都重置
      areas[0] = { level: "province", name: province };
      areas[1] = { level: "city" };
      areas[2] = { level: "town" };
      areas[3] = { level: "station" };
      props.changeDispatch("AREA", { data: areas, level: "province", index: 0 });
      props.changeArea({ level: "province", name: province, page: 1 });
    }
  };
  const renderProvinceRow = (provinceItem) => {
    return <RadioItem
      style={{
        justifyContent: "center",
        backgroundColor: provinceItem.item.name === province ? "#f1f0f0" : "#fff",
        borderBottomWidth: 0.4,
        borderColor: "#d7d7d7"
      }}
      key={provinceItem.index}
      checked={provinceItem.item.name === province}
      onChange={() => {changeProvince(provinceItem);}}
    >
      <View style={{
        flex: 1,
        justifyContent: "center"
      }}>
        <Text style={{ fontSize: 13, color: "#3c3c3c" }}>{provinceItem.item.name}</Text>
      </View>
    </RadioItem>;
  };
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Text style={{
        fontSize: 12,
        paddingLeft: 12,
        paddingTop: 11,
        paddingBottom: 11,
        color: "#999999"
      }}>
        选择省份
      </Text>
      <FlatList
        data={level.province}
        keyExtractor={(item) => item.name}
        renderItem={renderProvinceRow}
        initialNumToRender={1}
      />
    </View>
  );
};
export default memo(SelectProvince, (prevProps, nextProps) => (prevProps["judgeTheConditionsOfChange"] === nextProps["judgeTheConditionsOfChange"]));
