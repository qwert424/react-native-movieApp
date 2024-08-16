import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddressListAsync } from "../store/addressSlice";
import { getMovieListAsync } from "../store/movieSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import LoadingPage from "./LoadingPage";
// 导入路由
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// 栈
const Tab = createMaterialTopTabNavigator();

// 导入组件
import TypeListShowPage from "../components/TypeListShow";

export default function CinemePage({ route, navigation }) {
  // 获取传递过来的参数
  const [selected, setSelected] = useState("cinema");
  // 仓库
  const address = useSelector((store) => store.address);
  const movieList = useSelector((store) => store.movie);
  const { isLoading } = useSelector((store) => store.loading);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (address.addressList.length === 0) {
      dispatch(getAddressListAsync());
    }
    if (movieList.soonMovieList.length === 0) {
      dispatch(getMovieListAsync("coming", 6));
    }
    if (movieList.hotMovieList.length === 0) {
      dispatch(getMovieListAsync("hot", 6));
    }
    if (movieList.newMovieList.length === 0) {
      dispatch(getMovieListAsync("hot", 6, true));
    }
  }, []);

  useEffect(() => {
    if (route.params.selected === "cinema" || !route.params.selected) {
      setSelected("cinema");
    } else {
      setSelected(route.params.selected);
    }
  }, [route]);

  if (!isLoading) {
    if (selected === "cinema") {
      return (
        <View style={styles.container}>
          {/* 上部分 */}
          <View style={styles.changeCinemaTypeContainer}>
            <View style={styles.changeCinemaTypeItem}>
              <Text>
                全城
                <AntDesign name="caretdown" size={12} color="black" />
              </Text>
              <Text>
                筛选
                <AntDesign name="caretdown" size={12} color="black" />
              </Text>
            </View>
            <View
              style={[
                styles.changeCinemaTypeItem,
                { justifyContent: "flex-end" },
              ]}
            >
              <Text>
                综合排序
                <AntDesign name="caretdown" size={12} color="black" />
              </Text>
            </View>
          </View>
          <TypeListShowPage
            renderData={address.addressList}
            type={selected}
            navigation={navigation}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.changeMovieTypeContainer}>
            <Tab.Navigator>
              <Tab.Screen
                name=" 正在热映"
                component={() => (
                  <TypeListShowPage
                    renderData={movieList.hotMovieList}
                    type={selected}
                    navigation={navigation}
                    movieType="hot"
                  />
                )}
              />
              <Tab.Screen
                name="即将上映"
                component={() => (
                  <TypeListShowPage
                    renderData={movieList.soonMovieList}
                    type={selected}
                    navigation={navigation}
                    movieType="coming"
                  />
                )}
              />
            </Tab.Navigator>
          </View>
        </View>
      );
    }
  } else {
    return <LoadingPage />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  changeMovieTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alginItems: "center",
    padding: 5,
    flex: 1,
  },
  changeCinemaTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  changeCinemaTypeItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    padding: 5,
  },
});
