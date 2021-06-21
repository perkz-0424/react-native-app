import React from "react";
import { createAppContainer } from "react-navigation";
import Routers from "./routers";
/**page**/
import NewDonghuanH5 from "../modules/NewDonghuanH5";
import Login from "../modules/Login/index";
import Person from "../modules/Person";
import ForgetPwd from "../modules/ForgetPwd";
import HomePage from "../modules/HomePage";

const routers = {
  /**中间弹出式路由**/
  centerRouters: {
    Login,
    NewDonghuanH5,
    HomePage
  },
  /**从下往上弹出路由**/
  stackBottomRouters: {
    ForgetPwd,
    Person,
  },
  /**从右往左弹出路由**/
  stackRightRouters: {},
  /**默认路由**/
  defaultRouters: {}
};

export default createAppContainer(Routers(routers, "Login"));
