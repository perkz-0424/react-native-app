const config = {
  webH5Url: "http://192.168.30.150:3090",
  Url: "http://10.52.14.219:3080",
  imagePwd: "thisisakeykeykey",
  imageIv:"This is an IV456",
  // 实时数据刷新间隔
  realTimeFetchInterval: 1000 * 5,
  // 实时数据没有刷到数据时的刷新间隔
  realTimeNoDataFetchInterval: 1000,
  // text font
  titleFontSize: 15,
  titleFontSizeBig: 18,
  titleFontSizeBigBig: 22,
  textFontSize: 12,
  timeFontSize: 9,
  headerFontSize: 15,
  buttonFontSize: 30,
  // color
  orange: "#e14b06",
  grey: "#e8eaeb",
  black: "black",
  yellow: "#f4f2e3",
  lightBlue: "#6EB0F1",
  blue: "#2f5694",
  lightGrey: "#eeeeee",

  titleColor: "black",
  textColor: "grey",

  oldColor: ["#f08099", "#f4bb6c", "#57a5f1", "#8fe0ba"],
  // height width
  headerHeight: 50,

  //* ***************
  myOrange: "#e14b06",
  myGray: "#e8eaeb",
  myBlack: "black",
  // warningColor: ['#f08099','#f4bb6c','#57a5f1','#8fe0ba'],

  // warning
  warningColor: [
    "#8C1E25",
    "#D35E1A",
    "#DFA479",
    "#8fe0ba",
    "#8C1E25",
    "#D35E1A",
    "#DFA479",
  ],
  version: "2.5.7 20210620"
};
export default config;
