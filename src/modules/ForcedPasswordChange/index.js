import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import Title from "../../components/Title";
import Password from "../../components/Input/Password";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import api from "../../servers/Login";
import { encrypt } from "../../assets/crypto";
import regExps from "../../assets/js/regExp";
import { Toast, Icon } from "@ant-design/react-native";
import { clearAllCookie } from "../../assets/cookie";
import { connect } from "react-redux";
import { data } from "../../store/dataSource";

const ForcedPasswordChange = (props) => {
  const [loading, set_loading] = useState(false);
  const [oldPassword, set_oldPassword] = useState("");//旧密码
  const [newPassword, set_newPassword] = useState("");//新密码
  const [rNewPassword, set_rNewPassword] = useState("");//再次输入新密码
  const [success, set_success] = useState(false);//是否重置成功
  let tempTime = null;
  /*错误告警*/
  const alertError = (message) => {
    return Alert.alert("警告", message, [{ text: "确定" }]);
  };
  /*错误提示*/
  const errorMessage = (err = "网络错误") => {
    Toast.info(err, 1);
  };
  const oldPasswordChange = text => {
    set_oldPassword(text);
  };
  const newPasswordChange = text => {
    set_newPassword(text);
  };
  const rNewPasswordChange = text => {
    set_rNewPassword(text);
  };
  /*检查密码的正则*/
  const checkPasswordRegExp = (value) => {
    const { password, haveChinese, specialCharacters } = regExps;
    return (
      !password.test(value) || //密码由8-30位字母数字组成，区分大小写，必须包含特殊字符
      haveChinese.test(value) || //不能含中文（双字节）
      specialCharacters.test(value) //不能含空格、换行符
    );
  };
  /*检查密码格式*/
  const checkPassword = () => {
    if (!oldPassword || !newPassword || !rNewPassword) {
      alertError("请填写密码");
      return false;
    }
    if (checkPasswordRegExp(newPassword)) {
      alertError("新密码格式错误");
      return false;
    }
    if (newPassword === oldPassword) {
      alertError("旧密码不能和新密码相同");
      return false;
    }
    if (newPassword !== rNewPassword) {
      alertError("输入新密码不一致");
      return false;
    }
    return true;
  };
  /*重置成功*/
  const resetSuccess = () => {
    set_success(true);
    tempTime && clearTimeout(tempTime);
    tempTime = setTimeout(() => {
      props.navigation.navigate("Login");
      props.dispatch(dispatch => {
        dispatch({ type: "TOKEN", payload: { ...data.token } });
      });
      rollBack();
    }, 1500);
  };

  /*清空*/
  const rollBack = () => {
    set_loading(false);
    set_success(false);
    set_oldPassword("");
    set_newPassword("");
    set_rNewPassword("");
    clearAllCookie();
    clearTimeout(tempTime);
  };
  /*重置*/
  const onForce = () => {
    if (checkPassword()) {
      set_loading(true);
      api.onResetPassword(
        encrypt(oldPassword),
        encrypt(newPassword)
      ).then(({ message }) => {
        set_loading(false);
        if (message === "success") {
          resetSuccess();
        } else {
          errorMessage("旧密码错误");
        }
      }).catch(() => {
        set_loading(false);
        errorMessage();
      });
    }
  };
  useEffect(() => {
    return () => {
      rollBack();
    };
  }, []);
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Loading loading={loading} text="密码重置中"/>
      <Title title="重置密码"/>
      {
        !success ?
          <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>您的密码即将过期，请重置密码</Text>
            </View>
            <Password
              placeholder="输入旧密码"
              onChangeText={oldPasswordChange}
              value={oldPassword}
            />
            <Password
              placeholder="输入新密码"
              onChangeText={newPasswordChange}
              value={newPassword}
            />
            <Password
              placeholder="再次输入新密码"
              onChangeText={rNewPasswordChange}
              value={rNewPassword}
            />
            <View style={styles.inputBox}>
              <Text style={{ fontSize: 10, color: "#BFBFBF", }}>
                密码由8-30位字母数字组成，区分大小写，必须包含特殊字符
              </Text>
            </View>
            <View style={styles.inputBox}>
              <Button onPress={onForce}>重置</Button>
            </View>
          </View>
          :
          <View style={styles.successBox}>
            <View style={{ alignItems: "center", }}>
              <Icon name="check-circle" color="green" size="lg"/>
              <Text style={{ marginTop: 7, fontSize: 14 }}>重置密码成功，正在返回登录页...</Text>
            </View>
          </View>
      }
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(158,38,38,0.12)",
  },
  titleText: {
    fontWeight: "400",
    fontSize: 11,
    color: "#6c6c6c"
  },
  inputBox: {
    marginTop: 10,
    borderBottomWidth: 0.2,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
  successBox: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default connect(state => ({ state }))(ForcedPasswordChange);
