import { StyleSheet, ScrollView, Pressable, View, Text } from "react-native";
import MovieItem from "./MovieItem";
import AntDesign from "@expo/vector-icons/AntDesign";
// 电影滑动展示列表
export default function MovieScrollList(props) {
  const movieList = props.renderData.map((item, index) => {
    // 主页展示条数限制
    return index > 5 ? null : (
      <MovieItem key={item.id} data={item} navigation={props.navigation} />
    );
  });

  // 加载更多
  const handleAddMore = () => {
    let type;
    if (props.title === "近期上映") {
      type = "new";
    } else if (props.title === "即将上映") {
      type = "coming";
    } else {
      type = "hot";
    }
    props.navigation.navigate("MovieMore", {
      type,
      title: props.title,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Pressable onPress={handleAddMore}>
          <Text style={styles.moreText}>
            查看更多
            <AntDesign name="right" size={14} color="#008c8c" />
          </Text>
        </Pressable>
      </View>
      {/* 下部分 */}
      <ScrollView
        style={styles.searchContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {movieList}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  moreText: {
    color: "#008c8c",
  },
  titleText: {
    fontWeight: "900",
    fontSize: 18,
  },
});
