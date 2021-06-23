const level = [
  {
    category: "province",
    name: "浙江省",
    parents: {},
  },
  {
    category: "province",
    name: "江苏省",
    parents: {},
  },
  {
    category: "city",
    name: "南京市",
    parents: {
      province: "江苏省"
    },
  },
  {
    category: "city",
    name: "杭州市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "city",
    name: "湖州市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "city",
    name: "舟山市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "city",
    name: "嘉兴市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "city",
    name: "衢州市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "city",
    name: "金华市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "city",
    name: "宁波市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "city",
    name: "台州市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "city",
    name: "温州市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "city",
    name: "丽水市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "city",
    name: "绍兴市",
    parents: {
      province: "浙江省"
    },
  },
  {
    category: "town",
    name: "吴兴区",
    parents: {
      city: "湖州市",
    },
  },
  {
    category: "town",
    name: "南浔区",
    parents: {
      city: "湖州市",
    },
  },
  {
    category: "town",
    name: "德清县",
    parents: {
      city: "湖州市",
    },
  },
  {
    category: "town",
    name: "长兴县",
    parents: {
      city: "湖州市",
    },
  },
  {
    category: "town",
    name: "安吉县",
    parents: {
      city: "湖州市",
    },
  },
  {
    category: "town",
    name: "萧山区",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "余杭区",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "桐庐县",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "淳安县",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "建德市",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "富阳市",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "临安市",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "定海区",
    parents: {
      city: "舟山市",
    },
  },
  {
    category: "town",
    name: "普陀区",
    parents: {
      city: "舟山市",
    },
  },
  {
    category: "town",
    name: "岱山县",
    parents: {
      city: "舟山市",
    },
  },
  {
    category: "town",
    name: "嵊泗县",
    parents: {
      city: "舟山市",
    },
  },
  {
    category: "town",
    name: "嘉善县",
    parents: {
      city: "嘉兴市",
    },
  },
  {
    category: "town",
    name: "海盐县",
    parents: {
      city: "嘉兴市",
    },
  },
  {
    category: "town",
    name: "海宁市",
    parents: {
      city: "嘉兴市",
    },
  },
  {
    category: "town",
    name: "平湖市",
    parents: {
      city: "嘉兴市",
    },
  },
  {
    category: "town",
    name: "桐乡市",
    parents: {
      city: "嘉兴市",
    },
  },
  {
    category: "town",
    name: "常山县",
    parents: {
      city: "衢州市",
    },
  },
  {
    category: "town",
    name: "开化县",
    parents: {
      city: "衢州市",
    },
  },
  {
    category: "town",
    name: "龙游县",
    parents: {
      city: "衢州市",
    },
  },
  {
    category: "town",
    name: "江山市",
    parents: {
      city: "衢州市",
    },
  },
  {
    category: "town",
    name: "武义县",
    parents: {
      city: "金华市",
    },
  },
  {
    category: "town",
    name: "浦江县",
    parents: {
      city: "金华市",
    },
  },
  {
    category: "town",
    name: "磐安县",
    parents: {
      city: "金华市",
    },
  },
  {
    category: "town",
    name: "兰溪市",
    parents: {
      city: "金华市",
    },
  },
  {
    category: "town",
    name: "义乌市",
    parents: {
      city: "金华市",
    },
  },
  {
    category: "town",
    name: "东阳市",
    parents: {
      city: "金华市",
    },
  },
  {
    category: "town",
    name: "永康市",
    parents: {
      city: "金华市",
    },
  },
  {
    category: "town",
    name: "北仑区",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "镇海区",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "鄞州区",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "象山县",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "宁海县",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "余姚市",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "慈溪市",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "奉化市",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "椒江区",
    parents: {
      city: "台州市",
    },
  },
  {
    category: "town",
    name: "黄岩区",
    parents: {
      city: "台州市",
    },
  },
  {
    category: "town",
    name: "路桥区",
    parents: {
      city: "台州市",
    },
  },
  {
    category: "town",
    name: "玉环县",
    parents: {
      city: "台州市",
    },
  },
  {
    category: "town",
    name: "三门县",
    parents: {
      city: "台州市",
    },
  },
  {
    category: "town",
    name: "天台县",
    parents: {
      city: "台州市",
    },
  },
  {
    category: "town",
    name: "仙居县",
    parents: {
      city: "台州市",
    },
  },
  {
    category: "town",
    name: "温岭市",
    parents: {
      city: "台州市",
    },
  },
  {
    category: "town",
    name: "临海市",
    parents: {
      city: "台州市",
    },
  },
  {
    category: "town",
    name: "洞头县",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "永嘉县",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "平阳县",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "苍南县",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "文成县",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "泰顺县",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "瑞安市",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "乐清市",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "莲都区",
    parents: {
      city: "丽水市",
    },
  },
  {
    category: "town",
    name: "青田县",
    parents: {
      city: "丽水市",
    },
  },
  {
    category: "town",
    name: "缙云县",
    parents: {
      city: "丽水市",
    },
  },
  {
    category: "town",
    name: "遂昌县",
    parents: {
      city: "丽水市",
    },
  },
  {
    category: "town",
    name: "松阳县",
    parents: {
      city: "丽水市",
    },
  },
  {
    category: "town",
    name: "云和县",
    parents: {
      city: "丽水市",
    },
  },
  {
    category: "town",
    name: "庆元县",
    parents: {
      city: "丽水市",
    },
  },
  {
    category: "town",
    name: "景宁县",
    parents: {
      city: "丽水市",
    },
  },
  {
    category: "town",
    name: "龙泉市",
    parents: {
      city: "丽水市",
    },
  },
  {
    category: "town",
    name: "越城区",
    parents: {
      city: "绍兴市",
    },
  },
  {
    category: "town",
    name: "新昌县",
    parents: {
      city: "绍兴市",
    },
  },
  {
    category: "town",
    name: "诸暨市",
    parents: {
      city: "绍兴市",
    },
  },
  {
    category: "town",
    name: "上虞市",
    parents: {
      city: "绍兴市",
    },
  },
  {
    category: "town",
    name: "嵊州市",
    parents: {
      city: "绍兴市",
    },
  },
  {
    category: "town",
    name: "拱墅区",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "上城区",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "下城区",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "江干区",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "西湖区",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "滨江区",
    parents: {
      city: "杭州市",
    },
  },
  {
    category: "town",
    name: "海曙区",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "江东区",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "江北区",
    parents: {
      city: "宁波市",
    },
  },
  {
    category: "town",
    name: "鹿城区",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "龙湾区",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "瓯海区",
    parents: {
      city: "温州市",
    },
  },
  {
    category: "town",
    name: "南湖区",
    parents: {
      city: "嘉兴市",
    },
  },
  {
    category: "town",
    name: "秀洲区",
    parents: {
      city: "嘉兴市",
    },
  },
  {
    category: "town",
    name: "绍兴县",
    parents: {
      city: "绍兴市",
    },
  },
  {
    category: "town",
    name: "婺城区",
    parents: {
      city: "金华市",
    },
  },
  {
    category: "town",
    name: "金东区",
    parents: {
      city: "金华市",
    },
  },
  {
    category: "town",
    name: "柯城区",
    parents: {
      city: "衢州市",
    },
  },
  {
    category: "town",
    name: "衢江区",
    parents: {
      city: "衢州市",
    },
  },
];
const province = level.filter(e => e.category === "province");
const city = level.filter(e => e.category === "city");
const allTown = level.filter(e => e.category === "town");

export default {
  province, city, allTown
};
