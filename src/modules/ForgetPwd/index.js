import React, { useState, useMemo, useEffect } from "react";
import {
  View, Dimensions, Image, TextInput,
  TouchableWithoutFeedback, TouchableOpacity,
  Text, StyleSheet, BackHandler,
} from "react-native";
import { Button } from "@ant-design/react-native";
import Title from "../../components/Title";
import api from "../../servers/Login";
import SDHPicker from "../../components/SDHPicker/index";

const ForgetPwd = props => {
  const [phoneOrMail, set_phoneOrMail] = useState("");
  const [imageSource, set_imageSource] = useState("data:image/jpeg;base64,123");//图形验证码的图
  const [code, set_code] = useState("");//图形验证码的值
  const [codeTitle, set_codeTitle] = useState("获取验证码");
  const [buttonTitle, set_buttonTitle] = useState("下一步");
  const [buttonDisabled, set_buttonDisabled] = useState(true);
  const [pickerData, set_pickerData] = useState([]); //[{ label: "XXX", value: "XXX" }]
  const [user, set_user] = useState([""]);
  const [ID, set_ID] = useState("");
  const [mail, set_mail] = useState("");
  const [secure, set_secure] = useState(true);
  const onBackPress = () => {
    props.navigation.goBack();
    return true;
  };
  const getImageCode = () => {
    api.getVerificationCode().then(res => {
      set_imageSource(`data:image/jpeg;base64,${res.img}`);
      set_code(res.key);
    });
  };
  const phoneOrMailChange = value => {
    set_phoneOrMail(value);
  };
  useMemo(() => {
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    getImageCode();
  }, []);

  useEffect(() => {
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, []);
  return (
    <View style={{ height: Dimensions.get("window").height, backgroundColor: "#FFFFFF" }}>
      <Title
        title="重置密码"
        onLeftPress={onBackPress}
        titleLeft={<Image style={{ width: 12, height: 18 }} source={require("../../assets/images/icon/back.png")}/>}
      />
      <View style={{
        width: "100%",
      }}>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
              <Image
                style={{ width: 14, height: 18 }}
                source={require("../../assets/images/SDH/phone.png")}
              />
            </View>
            <TextInput
              onChange={phoneOrMailChange}
              style={styles.inputText}
              placeholder="请输入电信手机号或邮箱"
              clear
              autoCapitalize="none"
              keyboardType="default"
              value={phoneOrMail}
            />
          </View>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
              <Image
                style={{ width: 16, height: 19 }}
                source={require("../../assets/images/SDH/code.png")}
              />
            </View>
            <TextInput
              maxLength={4}
              style={styles.inputText}
              placeholder="请输入验证码"
              clear
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>
          <TouchableWithoutFeedback style={{ justifyContent: "center" }} onPress={getImageCode}>
            <View style={{ justifyContent: "center", marginRight: 5 }}>
              <Image
                style={{ width: 80, height: 20 }}
                source={{ uri: imageSource }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
              <Image
                style={{ width: 16, height: 19 }}
                source={require("../../assets/images/SDH/code.png")}
              />
            </View>
            <TextInput
              maxLength={6}
              style={styles.inputText}
              placeholder="请输入手机或邮箱验证码"
              clear
              autoCapitalize="none"
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => {}}>
            <View style={{ justifyContent: "center", marginRight: 5 }}>
              <View style={styles.line}>
                <Text style={{ fontSize: 11, color: "#1D9AFF" }}>{codeTitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.inputBox, ...{ borderBottomWidth: 0.3 } }}>
          <SDHPicker
            title=""
            data={pickerData}
            value={user}
            onOk={v => {
              set_user(v);
            }}
            cols={1}
            extra="请选择用户"
          >
            <View style={{ flexDirection: "row", width: "100%", }}>
              <Image
                style={{ height: 16, width: 15, marginLeft: -5 }}
                source={require("../../assets/images/SDH/user.png")}
              />
            </View>
          </SDHPicker>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
              <Image
                style={{ width: 17, height: 14 }}
                source={require("../../assets/images/SDH/id.png")}
              />
            </View>
            <TextInput
              onChange={() => {}}
              maxLength={18}
              style={styles.inputText}
              placeholder="请输入18位身份证号码"
              clear
              autoCapitalize="none"
              keyboardType="default"
              value={ID}
            />
          </View>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
              <Image
                style={{ width: 18, height: 14 }}
                source={require("../../assets/images/SDH/mailIcon.png")}
              />
            </View>
            <TextInput
              onChange={() => {}}
              maxLength={30}
              style={styles.inputText}
              placeholder="设置邮箱账号"
              clear
              autoCapitalize="none"
              keyboardType="default"
              value={mail}
            />
          </View>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
              <Image
                style={{ width: 15.5, height: 18, marginLeft: 1 }}
                source={require("../../assets/images/SDH/password.png")}
              />
            </View>
            <TextInput
              style={styles.inputText}
              placeholder="输入你的密码"
              clear
              autoCapitalize="none"
              secureTextEntry={secure}
              keyboardType="default"
            />
          </View>
          <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => {set_secure(!secure);}}>
            <View style={{ justifyContent: "center", marginRight: 10 }}>
              {secure ? <Image
                style={styles.eyes}
                source={require("../../assets/images/SDH/closeEyes.png")}
              /> : <Image
                style={styles.eyes}
                source={require("../../assets/images/SDH/openEyes.png")}
              />}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.inputBox, ...{ borderBottomWidth: 0, } }}>
          <Text style={{ fontSize: 10, marginTop: 10, color: "#BFBFBF", }}>
            密码由8-30位字母数字组成，区分大小写，必须包含特殊字符
          </Text>
        </View>
        <View style={{ ...styles.inputBox, ...{ marginTop: 10, borderBottomWidth: 0 } }}>
          <Button
            type="primary"
            style={styles.buttonStyle}
            size="small"
            disabled={buttonDisabled}
            onPress={() => {}}
          >
            {buttonTitle}
          </Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    height: 35,
    backgroundColor: "#1D9AFF",
    color: "#fff",
  },
  line: {
    height: 20,
    width: 80,
    borderLeftWidth: 1,
    borderColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  eyes: {
    marginTop: 15,
    marginBottom: 15,
    height: 9,
    width: 17,
    alignSelf: "flex-end",
  },
  inputContainer: {
    borderStyle: "solid",
    flexDirection: "row",
  },
  inputBox: {
    borderBottomWidth: 0.2,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
  inputText: {
    height: 45,
    marginLeft: 5,
    paddingLeft: 5,
  },
  inputTitle: {
    marginLeft: 10,
    justifyContent: "center",
    width: 20,
  },
  icon: {
    top: 80,
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
    shadowColor: "rgb(159, 205, 243)",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.4,
  },
  iconImage: {
    height: 86,
    width: 86,
    borderRadius: 15,
  },
});
export default ForgetPwd;
