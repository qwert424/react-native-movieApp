import { StyleSheet, Pressable, View, Image, Text } from "react-native";
import { useDispatch } from "react-redux";
import { changeLoading } from "../store/loadingSlice";

// 电影Item组件
export default function MovieItem(props) {
  const dispatch = useDispatch();

  // 打开电影详情
  const OpenMovieDetail = () => {
    if (props.data.id) {
      props.navigation.navigate("Detail", { id: props.data.id });
      dispatch(changeLoading(true));
    }
  };
  return (
    <Pressable onPress={OpenMovieDetail}>
      <View style={styles.container}>
        <Image
          source={{
            uri: props.data.movieImg,
          }}
          style={styles.movieImg}
        />
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {props.data.title}
        </Text>
        {(props.data.average !== "0" && (
          <Text style={styles.averageText}>
            电影评分:
            <Text style={styles.averageNumber}>{props.data.average}</Text>
          </Text>
        )) || <Text style={styles.noAverage}>暂无评分</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    maxWidth: 150,
    width: 150,
    height: 200,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
  },
  movieImg: {
    height: 140,
    width: 140,
    resizeMode: "contain",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  averageText: {
    fontSize: 14,
  },
  averageNumber: {
    color: "#fba414",
    fontSize: 18,
  },
  noAverage: {
    color: "#fba414",
  },
});
