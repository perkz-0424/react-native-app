import React, { useState, memo, useEffect, useMemo, useCallback } from "react";
import "../../../../shim";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import api, { mailAbort } from "../../../servers/Mail";
import { connect } from "react-redux";
import errorMessage from "../../../components/errorMessage";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const initialLayout = { width: "100%", flex: 1, alignItems: "center" };
const EmailList = props => {
  const userName = props.state.userMessage.message.name;//用户名
  const [selectTabs] = useState([
    { title: "收件箱", amount: 0, key: "inbox", index: 0 },
    { title: "发件箱", amount: 0, key: "outbox", index: 1 },
    { title: "系统信息", amount: 0, key: "public", index: 2 }
  ]);//amount
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
  const amountString = `${selectTabs[0].amount}-${selectTabs[1].amount}-${selectTabs[2].amount}`;
  //获取收件箱邮件
  const getInboxMessage = (page = 1) => {
    api.getInboxMessage(userName, page).then(res => {
      res["response"] && set_inboxMessage([...inboxMessage, ...res["response"]]);
      res["response"] && set_inPage(page);
    }).catch(errorTips);
  };

  const getOutboxMessage = (page = 1) => {
    api.getOutInfoMessage(userName, page).then(res => {
      res["response"] && set_outboxMessage([...outboxMessage, ...res["response"]]);
      res["response"] && set_outPage(page);
    }).catch(errorTips);
  };

  const getPublicMailMessage = (page = 1, limit = 10) => {
    api.getPublicMailMessage(page, limit).then(res => {
      res["response"] && set_publicMailMessage([...publicMailMessage, ...res["response"]]);
      res["response"] && set_publicPage(page);
    }).catch(errorTips);
  };
  //数据初始化
  const initData = () => {
    const amountInit = [...selectTabs];
    api.getInboxMessage(userName).then(res => {
      set_finishInboxInit(true);
      amountInit[0].amount = res["total_num"] ? res["total_num"] : 0;
      res["response"] && set_inboxMessage(res["response"]);
      res["response"] && set_inPage(1);
      api.getOutInfoMessage(userName).then(res => {
        set_finishOutboxInit(true);
        amountInit[1].amount = res["total_num"] ? res["total_num"] : 0;
        res["response"] && set_outboxMessage(res["response"]);
        res["response"] && set_outPage(1);
        api.getPublicMailMessage(1, 10).then(res => {
          set_finishPublicInit(true);
          amountInit[2].amount = res["total_num"] ? res["total_num"] : 0;
          res["response"] && set_publicMailMessage(res["response"]);
          res["response"] && set_publicPage(1);
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
        {!finish ? <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={{ color: "#6c6c6c", fontSize: 13 }}>加载中...</Text>
        </View> : null}
        <View style={{ flex: 1, width: "100%" }}>
          {item.length ? <View style={{ flex: 1, width: "100%" }}>
            <FlatList
              style={{ flex: 1 }}
              data={item}
              keyExtractor={(item) => `${type}${item["_id"]}`}
              renderItem={(item) => {
                return (
                  <TouchableOpacity
                    key={`${type}${item.index}`}
                    style={{ height: 100, width: "100%", backgroundColor: "#f6f6f6", marginBottom: 10 }}>
                    <Text>{item.item.title}</Text>
                  </TouchableOpacity>
                );
              }}/>
          </View> : <View style={{ flex: 1, width: "100%" }}>

          </View>}
        </View>
      </View>
    );
  };

  const screens = () => ({
    inbox: () => useMemo(() => renderItem(inboxMessage, finishInboxInit, "inbox"), [inPage, finishInboxInit]),
    outbox: () => useMemo(() => renderItem(outboxMessage, finishOutboxInit, "outbox"), [outPage, finishOutboxInit]),
    public: () => useMemo(() => renderItem(publicMailMessage, finishPublicInit, "public"), [publicPage, finishPublicInit])
  });

  const renderLabel = useCallback((item) => {
    return (
      <View key={item.route.key} style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
        <Text style={{
          fontSize: 13,
          color: item.route.index === page ? "#2f5694" : "#222",
        }}>{item.route.title}</Text>
        <Text style={{ fontSize: 11, color: "#2f5694", marginLeft: 5 }}>{item.route.amount}</Text>
      </View>
    );
  }, [page, amountString]);
  return (
    <View style={{ width: "100%", flex: 1 }}>
      {useMemo(() => <TabView
        navigationState={{ index: page, routes: selectTabs }}
        renderScene={SceneMap(screens())}
        onIndexChange={set_page}
        initialLayout={initialLayout}
        renderTabBar={(props) =>
          <TabBar
            {...props}
            pressColor="#F1F1F1"
            style={{ backgroundColor: "#FFF", width: "100%" }}
            labelStyle={{ fontSize: 13 }}
            indicatorStyle={{ backgroundColor: "#2f5694" }}
            contentContainerStyle={{ height: 38, alignItems: "center" }}
            renderLabel={renderLabel}
            scrollEnabled={false}
          />}
      />, [page, inPage, outPage, publicPage])}
    </View>
  );
};
export default connect(state => ({ state }))(memo(EmailList));
