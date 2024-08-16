import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

// 设备宽度
const windowWidth = Dimensions.get("window").width;

export default function MovieDetailItemPage(props) {
  return (
    <View style={styles.mainContainer}>
      {/* 左边 */}
      <Image
        source={{
          uri: props.movieData.movieImg,
        }}
        style={styles.movieImg}
      />
      {/* 右边 */}
      <View style={styles.detailContainer}>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {props.movieData.title}
        </Text>
        {(props.movieData.average !== "0" && (
          <Text style={styles.text}>
            电影评分:
            <Text style={styles.averageNumber}>{props.movieData.average}</Text>
          </Text>
        )) || <Text style={styles.noAverage}>暂无评分</Text>}
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          上映时间:
          <Text>{props.movieData.year}</Text>
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {props.movieData.genres}
        </Text>
        <Text style={styles.text}>
          导演:
          <Text>{props.movieData.directors}</Text>
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          主演:
          <Text>{props.movieData.casts}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },
  detailContainer: {
    width: 150,
    height: 140,
    paddingRight: 10,
    justifyContent: "flex-start",
  },
  movieImg: {
    height: 140,
    width: 140,
    resizeMode: "contain",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    fontSize: 14,
    color: "#bbb",
  },
  averageNumber: {
    color: "#fba414",
    fontSize: 18,
  },
  noAverage: {
    color: "#fba414",
  },
});
