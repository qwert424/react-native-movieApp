import { StyleSheet, Text, View } from "react-native";
import TypeListShowPage from "../components/TypeListShow";
import { useSelector } from "react-redux";
import { useRef } from "react";
export default function MovieMorePage({ route, navigation }) {
  const type = useRef(route.params.type).current;

  // 仓库
  const movieList = useSelector((store) => store.movie);

  let Data;
  if (type === "coming") {
    Data = movieList.soonMovieList;
  } else if (type === "hot") {
    Data = movieList.hotMovieList;
  } else {
    Data = movieList.newMovieList;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>{route.params.title}</Text>
      <TypeListShowPage
        renderData={Data}
        type="movie"
        movieType={type}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  topTitle: {
    fontSize: 24,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#bbb",
    padding: 4,
  },
});
