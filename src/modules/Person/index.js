import React, { useMemo, useEffect } from "react";
import Title from "../../components/Title/index";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  BackHandler,
  Dimensions,
  Image,
  Platform,
} from "react-native";

const Person = (props) => {
  const onBackPress = () => {
    props.navigation.goBack();
    return true;
  };
  useMemo(() => {
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
  }, []);

  useEffect(() => {
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, []);
  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <Title
        title="隐私政策"
        onLeftPress={onBackPress}
        titleLeft={<Image style={{ width: 12, height: 18 }} source={require("../../assets/images/icon/back.png")}/>}
      />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.center}>欢迎您使用本软件及服务！</Text>
          <Text>本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私政策相关有规定外在未得到您允许的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。{"\n"}{"\n"}</Text>
          <Text style={styles.h3}>1. 适用范围</Text>
          <Text>在您注册本应用帐号时，您根据本应用要求提供的个人注册信息；在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录数据；关于用户注销账户、更正或删除个人信息，可以通过客服电话联系帮忙注销，也可以通过网页版来删除、修改、注销个人信息 {"\n"}{"\n"}</Text>
          <Text style={styles.h3}>2. 信息使用</Text>
          <Text>本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料；本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。{"\n"}{"\n"}</Text>
          <Text style={styles.h3}>3. 信息披露</Text>
          <Text>在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：
            1 经您事先同意，向第三方披露；
            2 为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；
            3 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；
            4 如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；
            5 如您是知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
            {"\n"}{"\n"}
          </Text>
          <Text style={styles.h3}>4. 信息存储和交换</Text>
          <Text>我们会按照法律法规规定，将境内收集的用户个人信息存储于中国境内。我们仅为实现目的所必需的时间保留你的个人信息，当我们的产品或服务发生停止运营的情形时，我们将以推送通知、公告等形式通知您，并在合理的期限内删除您的个人信息或进行匿名化处理。
            {"\n"}{"\n"}
          </Text>
          <Text style={styles.h3}>5. Cookie的使用</Text>
          <Text>
            在您未拒绝接受cookies的情况下，本应用会在您的计算机上设定或取用cookies
            ，以便您能登录或使用依赖于cookies的本应用平台服务或功能。本应用使用cookies可为您提供更加周到的个性化服务，包括推广服务。您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的本应用网络服务或功能。通过本应用所设cookies所取得的有关信息，将适用本政策。
            {"\n"}{"\n"}
          </Text>
          <Text style={styles.h3}>6. 信息安全</Text>
          <Text>
            本应用帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。
            {"\n"}{"\n"}
          </Text>
          <Text style={styles.h3}>7.本隐私政策的更改</Text>
          <Text>
            如果决定更改隐私政策，我们会在本政策中、本公司网站中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。本公司保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，本公司会通过网站通知的形式告知。
            {"\n"}{"\n"}
          </Text>
          <Text style={styles.h3}>8.知识产权相关</Text>
          <Text>
            您了解并同意我方有权随时检查您所上传或发布的内容，如果发现您上传的内容不符合前述规定，我方有权删除或重新编辑或修改您所上传或发布的内容，且有权在不事先通知您的情况下停用您的账号。您亦了解、同意并保证，您所上传或发布的内容符合前述规定，是您的义务，而非我方，我方无任何对您上传或发布的内容进行主动检查、编辑或修改的义务。我方不对用户上传或发布的内容的合法性、正当性、完整性或品质作出任何保证，用户需自行承担因使用或依赖由软件所传送的内容或资源所产生的风险，我方在任何情况下对此种风险可能或实际带来的损失或损害都不负任何责任。
            {"\n"}{"\n"}
          </Text>
          <Text style={styles.h3}>9.法律责任与免责申明</Text>
          <Text>我方将会尽其商业上的合理努力以保护用户的设备资源及通讯的隐私性和完整性，但是，用户承认和同意我方不能就此事提供任何保证。我方可以根据用户的使用状态和行为，为了改进软件的功能、用户体验和服务，开发或调整软件功能</Text>
          <Text>
            我方为保障业务发展和调整的自主权，有权随时自行修改或中断软件服务而无需通知用户。在任何情况下用户因使用或不能使用本软件所产生的直接、间接、偶然、特殊及后续的损害及风险，我方及合作方不承担任何责任。因技术故障等不可抗事件影响到服务的正常运行的，我方及合作方承诺在第一时间内与相关单位配合，及时处理进行修复。用户通过软件与其他用户联系，因受误导或欺骗而导致或可能导致的任何心理、生理上的伤害以及经济上的损失，由过错方依法承担所有责任，一概与我方及合作方无关。 {"\n"}{"\n"}
          </Text>
          <Text style={styles.h3}>10.运营者基本信息</Text>
          <Text>公司名称：浙江省邮电工程建设有限公司</Text>
          <Text>注册地址：浙江省杭州市滨江区泰安路99号</Text>
          <Text>个人信息保护相关负责人联系方式： linxiunao.zjgc@chinaccs.cn（林秀闹）</Text>
          <Text>平台问题维护QQ群号：94575723</Text>
          <Text style={{ marginBottom: 10 }}>平台问题维护邮箱：digital.zjgc@chinaccs.cn</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: Platform.OS === "ios" ? 71 : 60,
  },
  center: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    padding: 10,
  },
  h3: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Person;
