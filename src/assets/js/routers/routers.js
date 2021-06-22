/**
 * 用法:(因不适合嵌套路由所以已弃用)
 * import { createAppContainer } from "react-navigation";
 * import Routers from "./singeRouter/routers";
 * ...
 * const routers = {
 *   centerRouters: {
 *      Login,
 *   }
 *   stackBottomRouters:{},
 *   stackRightRouters: {},
 *   defaultRouters: {}
 * }
 *
 * export default createAppContainer(Routers(routers, "Login"));
 * **/
import DefaultNavigator from "../../../components/Navigator/DefaultNavigator";
import StackNavigator from "../../../components/Navigator/StackNavigator";

/**路由配置**/
const Routers = (routers, initialRouteName) => {
  return DefaultNavigator({
      StackRightRouters: {
        screen: StackNavigator({
          StackBottomRouters: {
            screen: StackNavigator({
              CenterRouters: {
                screen: StackNavigator({
                  ...routers.centerRouters
                }, initialRouteName, "ScaleFromCenterAndroid")
              },
              ...routers.stackBottomRouters
            }, "CenterRouters", "FadeFromBottomAndroid")
          },
          ...routers.stackRightRouters
        }, "StackBottomRouters", "SlideFromRightIOS")
      },
      ...routers.defaultRouters
    }, "StackRightRouters",
  );
};

export default Routers;
