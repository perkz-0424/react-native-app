import React, { useState, memo, useEffect, useCallback, useMemo } from "react";
import "../../../../shim";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Tab, TabView } from "react-native-elements";
import api, { mailAbort } from "../../../servers/Mail";
import { connect } from "react-redux";
import errorMessage from "../../../components/errorMessage";

const EmailList = props => {
  const initSelectTabs = [{ title: "收件箱", amount: 0 }, { title: "发件箱", amount: 0 }, { title: "系统信息", amount: 0 }];
  const userName = props.state.userMessage.message.name;//用户名
  const [selectTabs, set_selectTabs] = useState(initSelectTabs);//amount
  const [page, set_page] = useState(0);
  const [inboxMessage, set_inboxMessage] = useState([]);//收件箱的数据
  const [inPage, set_inPage] = useState(0);//收件箱页码
  const [finishInboxInit, set_finishInboxInit] = useState(false);
  const [outboxMessage, set_outboxMessage] = useState([]);//发件箱的数据
  const [outPage, set_outPage] = useState(0);//发件箱页码
  const [finishOutboxInit, set_finishOutboxInit] = useState(false);
  const [publicMailMessage, set_publicMailMessage] = useState([]);//系统提示的数据
  const [publicPage, set_publicPage] = useState(0);//系统信息页码
  const [finishPublicInit, set_finishPublicInit] = useState(false);
  //获取收件箱邮件
  const getInboxMessage = (page = 1) => {
    api.getInboxMessage(userName, page).then(res => {
      set_inboxMessage([...inboxMessage, ...res["response"]]);
      set_inPage(page);
    }).catch(errorTips);
  };

  const getOutboxMessage = (page = 1) => {
    api.getOutInfoMessage(userName, page).then(res => {
      set_outboxMessage([...outboxMessage, ...res["response"]]);
      set_outPage(page);
    }).catch(errorTips);
  };

  const getPublicMailMessage = (page = 1, limit = 20) => {
    api.getPublicMailMessage(page, limit).then(res => {
      set_publicMailMessage([...publicMailMessage, ...res["response"]]);
      set_publicPage(page);
    }).catch(errorTips);
  };
  //数据初始化
  const initData = () => {
    api.getInboxMessage(userName).then(res => {
      set_finishInboxInit(true);
      const amountInit = [...selectTabs];
      amountInit[0].amount = res["total_num"];
      set_selectTabs(amountInit);
      set_inboxMessage(res["response"]);
      set_inPage(1);
      api.getOutInfoMessage(userName).then(res => {
        set_finishOutboxInit(true);
        const amountInit = [...selectTabs];
        amountInit[1].amount = res["total_num"];
        set_selectTabs(amountInit);
        set_outboxMessage(res["response"]);
        set_outPage(1);
        api.getPublicMailMessage(1, 20).then(res => {
          set_finishPublicInit(true);
          const amountInit = [...selectTabs];
          amountInit[2].amount = res["total_num"];
          set_selectTabs(amountInit);
          set_publicMailMessage(res["response"]);
          set_publicPage(1);
        }).catch((error) => {
          errorTips(error);
          set_finishPublicInit(true);
        });
      }).catch((error) => {
        errorTips(error);
        set_finishOutboxInit(true);
      });
    }).catch((error) => {
      errorTips(error);
      set_finishInboxInit(true);
    });
  };

  const errorTips = (error) => {
    if (error.toString() !== "AbortError: Aborted") {
      errorMessage("获取数据失败");
    }
  };
  //前往详情页
  const gotoEmailDetails = (item) => {
    props.changeTitle("邮件详情");
    props.navigate("EmailDetails", { item });
  };
  useEffect(() => {
    initData();
    return () => {
      mailAbort.abortInboxMessage && mailAbort.abortInboxMessage();
      mailAbort.abortOutInfoMessage && mailAbort.abortOutInfoMessage();
      mailAbort.abortPublicMailMessage && mailAbort.abortPublicMailMessage();
    };
  }, []);

  const renderItem = (item, finish, type) => {
    return (
      <View style={{ flex: 1, width: "100%", position: "relative", zIndex: 20 }}>
        {!finish ? <View style={{ width: "100%", alignItems: "center", backgroundColor: "#FFF" }}>
          <Text style={{ color: "#6c6c6c", fontSize: 13 }}>加载中...</Text>
        </View> : null}
        <View style={{ flex: 1, width: "100%" }}>
          {item.length ? <View style={{ flex: 1, width: "100%" }}>
            <FlatList
              style={{ flex: 1 }}
              data={item}
              keyExtractor={(item) => `${type}${item["_id"]}`}
              renderItem={(item) => {
                return (<TouchableOpacity
                  key={`${type}${item.index}`}
                  style={{ height: 180, width: "100%", backgroundColor: "#FFF", marginBottom: 10 }}>
                  <Text>{item.item.title}</Text>
                </TouchableOpacity>);
              }}/>
          </View> : <View style={{ flex: 1, width: "100%" }}>

          </View>}
        </View>
      </View>
    );
  };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      {useMemo(() => <View style={{ borderBottomColor: "#a59f9f", borderBottomWidth: 0.2, backgroundColor: "#fff" }}>
        <Tab value={page} onChange={set_page} indicatorStyle={{ backgroundColor: "#2f5694" }}>
          {selectTabs.map((item, index) => {
            return (<Tab.Item
              key={index} containerStyle={{ backgroundColor: "transparent" }}
              title={<View
                style={{ height: 25, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: index === page ? "#2f5694" : "#222222", fontSize: 13.5 }}>{item.title}</Text>
                <Text style={{ fontSize: 12, marginLeft: 3, color: "#3571a5" }}>{item.amount}</Text>
              </View>}/>);
          })}
        </Tab>
      </View>, [selectTabs[0].amount, selectTabs[1].amount, selectTabs[2].amount, page])}
      <TabView value={page} onChange={set_page} animationType="timing" style={{ width: "100%", flex: 1 }}>
        <TabView.Item style={{ width: "100%", flex: 1 }}>
          {useMemo(() => renderItem(inboxMessage, finishInboxInit, "inbox"), [inPage, finishInboxInit])}
        </TabView.Item>
        <TabView.Item style={{ width: "100%", flex: 1 }}>
          {useMemo(() => renderItem(outboxMessage, finishOutboxInit, "outbox"), [outPage, finishOutboxInit])}
        </TabView.Item>
        <TabView.Item style={{ width: "100%", flex: 1 }}>
          {useMemo(() => renderItem(publicMailMessage, finishPublicInit, "public"), [publicPage, finishPublicInit])}
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default connect(state => ({ state }))(memo(EmailList));
