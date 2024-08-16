import { StyleSheet, Text, View, Pressable } from "react-native";
import TypeListShowPage from "../components/TypeListShow";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { changeLoading } from "../store/loadingSlice";
import { getMovieBySearch } from "../api/require";
import LoadingPage from "./LoadingPage";

// 结果展示页面
export default function ShowMovieListPage({ route, navigation }) {
  const { searchValue } = route.params;
  // 仓库
  const { isLoading } = useSelector((store) => store.loading);
  const dispatch = useDispatch();

  const [renderData, setRenderData] = useState([]);
  // 搜索
  const searchList = async () => {
    dispatch(changeLoading(true));
    const resp = await getMovieBySearch(searchValue);
    setRenderData(resp);
    dispatch(changeLoading(false));
  };

  useEffect(() => {
    searchList();
  }, [searchValue]);

  // 返回
  const handleBack = () => {
    navigation.goBack();
  };

  if (!isLoading && renderData.length === 0) {
    return (
      <View style={styles.container}>
        <FontAwesome5 name="sad-cry" size={80} color="black" />
        <Text style={styles.errorText}>没有查询到你的结果!</Text>
        <Pressable onPress={handleBack} style={styles.backBtn}>
          <Text>返回</Text>
        </Pressable>
      </View>
    );
  } else if (!isLoading && renderData.length !== 0) {
    return (
      <View style={styles.container}>
        <TypeListShowPage
          renderData={renderData}
          type="movie"
          navigation={navigation}
          noRefresh={true}
        />
      </View>
    );
  } else {
    return <LoadingPage />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  topTitle: {
    fontSize: 24,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#bbb",
    padding: 4,
  },
  errorText: {
    color: "#f00",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  backBtn: {
    padding: 6,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#008c8c",
  },
});
