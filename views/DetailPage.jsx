import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { getMoviesById } from "../api/require";
import { useEffect, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import AntDesign from "@expo/vector-icons/AntDesign";
import MovieDetailItem from "../components/MovieDetailItem";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "./LoadingPage";
import { changeLoading } from "../store/loadingSlice";
import {
  addLove,
  addCollect,
  removeLove,
  removeCollect,
} from "../store/historySlice";

// 设备宽度
const windowWidth = Dimensions.get("window").width;

export default function DetailPage({ navigation, route }) {
  // id
  const { id } = route.params;
  // 数据
  const [movieData, setMovieData] = useState([]);
  const { isLoading } = useSelector((store) => store.loading);
  const { loveList, collectList } = useSelector((store) => store.history);

  const dispatch = useDispatch();
  // 加载数据
  const getDataById = async (id) => {
    const resp = await getMoviesById(id);
    setMovieData(resp);
    dispatch(changeLoading(false));
  };
  useEffect(() => {
    getDataById(id);
  }, [id]);

  // 购票
  const handleBuy = () => {
    navigation.navigate("Cinema", { movieData });
  };

  // 添加喜欢
  const handleLove = () => {
    if (loveList.filter((item) => item === movieData.id).length === 0) {
      dispatch(addLove(movieData.id));
    } else {
      dispatch(removeLove(movieData.id));
    }
  };

  // 添加收藏
  const handleCollect = () => {
    if (collectList.filter((item) => item === movieData.id).length === 0) {
      dispatch(addCollect(movieData.id));
    } else {
      dispatch(removeCollect(movieData.id));
    }
  };

  if (!isLoading) {
    return (
      <View style={styles.container}>
        {/* 顶部视频 */}
        <Video
          style={styles.video}
          source={{
            uri: movieData.vd,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
        {/* 中部主体 */}
        <View style={styles.mainContainer}>
          <MovieDetailItem movieData={movieData} />
        </View>
        {/* 按钮 */}
        <View style={styles.btnContainer}>
          <Pressable onPress={handleLove}>
            <View style={styles.btnItem}>
              {loveList.filter((item) => item === movieData.id).length === 0 ? (
                <AntDesign name="hearto" size={16} color="#fff" />
              ) : (
                <AntDesign name="heart" size={16} color="red" />
              )}
              <Text style={{ paddingLeft: 5, color: "#fff" }}>想看</Text>
            </View>
          </Pressable>
          <Pressable onPress={handleCollect}>
            <View style={styles.btnItem}>
              {collectList.filter((item) => item === movieData.id).length ===
              0 ? (
                <AntDesign name="staro" size={16} color="#fff" />
              ) : (
                <AntDesign name="star" size={16} color="red" />
              )}
              <Text style={{ paddingLeft: 5, color: "#fff" }}>看过</Text>
            </View>
          </Pressable>
        </View>

        {/* 底部介绍 */}
        <View style={styles.summaryContainer}>
          <ScrollView>
            <Text>
              {movieData.summary?.replace(/<p>([^<]*?)<\/p>/gi, "$1")}
            </Text>
          </ScrollView>
        </View>
        {/* 按钮 */}
        <Pressable style={styles.buyBtnContainer} onPress={handleBuy}>
          <View style={styles.buyBtn}>
            <Text style={{ color: "#fff", fontSize: 20 }}>选座 购票</Text>
          </View>
        </Pressable>
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
  video: {
    width: windowWidth,
    height: 180,
  },
  mainContainer: {
    flex: 0.4,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },
  btnContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: windowWidth,
    flex: 0.1,
  },
  btnItem: {
    width: 100,
    height: 40,
    backgroundColor: "#fba414",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  summaryContainer: {
    marginTop: 10,
    flex: 0.35,
    width: windowWidth,
    padding: 10,
  },
  buyBtnContainer: {
    flex: 0.1,
    width: windowWidth,
    alignItems: "center",
    marginTop: 15,
  },
  buyBtn: {
    width: 180,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    borderRadius: 20,
  },
});
