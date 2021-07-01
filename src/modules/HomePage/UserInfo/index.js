import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import UserButton from "../../../components/UserButton";
import api, { userAbort } from "../../../servers/User";
import { decrypt } from "../../../assets/crypto";
import errorMessage from "../../../components/errorMessage";

const UserInfo = props => {
  const userInfo = props.route.params.userInfo;
  const [phone, set_phone] = useState("");
  const [gender, set_gender] = useState("male");
  const [birthDay, set_birthDay] = useState("1900-01-01");
  const getUserInfo = () => {
    api.getUserInfo(userInfo["_id"]).then(res => {
      if (res.message.phone) {
        set_phone(`${decrypt(res.message.phone)}`);//解密电话号码
      }
      if (res.message["gender"]) {
        set_gender(`${res.message["gender"]}`);//性别
      }
      if (res.message["identityCard"]) {
        const ID = decrypt(res.message["identityCard"]);//解密身份证
        const birth = `${ID.substring(6, 10)}-${ID.substring(10, 12)}-${ID.substring(12, 14)}`;//分解身份证
        set_birthDay(birth);
      }
    }).catch(error => {
      if (error.toString() !== "AbortError: Aborted") {
        errorMessage("获取数据失败");
      }
    });
  };
  const headImage = () => {
    return (
      <Image
        style={{ width: 40, height: 40, padding: 5, borderRadius: 20 }}
        source={require("../../../assets/images/icon/user.png")}
      />
    );
  };
  useEffect(() => {
    getUserInfo();
    return () => {
      userAbort.abortUserInfo && userAbort.abortUserInfo();
    };
  }, []);
  // TODO: 修改昵称、性别、生日、手机号
  return (
    <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
      <View style={{ width: "100%", backgroundColor: "#FFFFFF", paddingRight: 10, paddingLeft: 10 }}>
        <UserButton onPress={() => {}} centerContent={headImage()}>头像</UserButton>
        <UserButton
          onPress={() => {}}
          centerContent={<Text style={{ color: "#9D9FA1" }}>{userInfo["user_name"]}</Text>}
        >昵称</UserButton>
        <UserButton
          onPress={() => {}}
          centerContent={<Text style={{ color: "#9D9FA1" }}>{gender === "male" ? "男" : "女"}</Text>}
        >性别</UserButton>
        <UserButton
          onPress={() => {}}
          centerContent={<Text style={{ color: "#9D9FA1" }}>{birthDay}</Text>}
        >生日</UserButton>
        <UserButton
          onPress={() => {}}
          centerContent={<Text style={{ color: "#9D9FA1" }}>{phone}</Text>}
        >手机号</UserButton>
      </View>
    </View>
  );
};

export default UserInfo;
