import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";
import MovieScrollList from "../components/MovieScrollList"; // 引入电影列表组件
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getMovieListAsync } from "../store/movieSlice";
import LoadingPage from "./LoadingPage";
// 首页 展示最近上映、即将上映、推荐电影
export default function HomePage({ navigation }) {
  // 获取仓库数据
  const movieList = useSelector((store) => store.movie);
  const { isLoading } = useSelector((store) => store.loading);
  const dispatch = useDispatch();

  // 数据判断
  useEffect(() => {
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

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#c04851" />
        <ScrollView>
          <MovieScrollList
            renderData={movieList.newMovieList}
            title="近期上映"
            navigation={navigation}
          />
          <MovieScrollList
            renderData={movieList.soonMovieList}
            title="即将上映"
            navigation={navigation}
          />
          <MovieScrollList
            renderData={movieList.hotMovieList}
            title="推荐电影"
            navigation={navigation}
          />
        </ScrollView>
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
  },
});
