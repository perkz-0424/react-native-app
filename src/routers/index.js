import React from "react";
import { createAppContainer } from "react-navigation";
import StackNavigator from "../components/Navigator/StackNavigator/index";
/**page**/
import NewDonghuanH5 from "../modules/NewDonghuanH5";
import Login from "../modules/Login/index";
import Person from "../modules/Person";

const routers = {
  NewDonghuanH5,
  Login,
  Person,
};

const Routers = StackNavigator(routers);
export default createAppContainer(Routers);
