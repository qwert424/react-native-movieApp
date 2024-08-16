import {
  StyleSheet,
  Pressable,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
  Dimensions,
} from "react-native";
import MovieDetailItem from "./MovieDetailItem";
import CinemaItemList from "../components/CinemaItemList";
import { useState, useRef } from "react";
import { addAddressListAsync } from "../store/addressSlice";
import { addMovieListAsync, MovieListByPageAsync } from "../store/movieSlice";
import { useDispatch } from "react-redux";
const windowWidth = Dimensions.get("window").width;
import { changeLoading } from "../store/loadingSlice";
// 列表渲染组件
export default function TypeListShowPage(props) {
  const scrollViewRef = useRef(null);
  // 刷新状态
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // 打开详情
  const handleOpenDetail = (item) => {
    props.navigation.navigate("Detail", { id: item.id });
    dispatch(changeLoading(true));
  };

  // 下拉刷新
  const onRefresh = async () => {
    if (props.noRefresh) return; // 不使用刷新
    if (props.type !== "movie") {
      setRefreshing(true);
      await dispatch(addAddressListAsync());
      setRefreshing(false);
    } else {
      setRefreshing(true);
      await dispatch(addMovieListAsync(props.movieType));
      setRefreshing(false);
    }
  };

  // 上拉加载
  const handleEndReached = async (event) => {
    if (props.noRefresh) return; // 不使用刷新
    if (props.type === "movie") {
      const contentHeight = event.nativeEvent.contentSize.height;
      const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
      const scrollOffset = event.nativeEvent.contentOffset.y;
      const isEndReached =
        scrollOffset + scrollViewHeight + 250 >= contentHeight; // 是否滑动到底部
      const isContentFillPage = contentHeight >= scrollViewHeight; // 内容高度是否大于列表高度
      if (isContentFillPage && isEndReached && !isloading) {
        setIsLoading(true);
        setPage(page + 1);
        await dispatch(MovieListByPageAsync(page, 6, props.movieType));
        setIsLoading(false);
        // 这里应该用其他滚动视图调用上拉刷新
        // 这里会有点问题 就是每次上拉刷新都会回到顶部
        // const { width, height } = Dimensions.get("window");
        // scrollViewRef.current.scrollTo({ x: 0, y: height, animated: true });
      }
    } else {
      return;
    }
  };
  let renderList;
  if (props.type === "movie") {
    renderList = props.renderData.map((item, index) => {
      return (
        <Pressable
          style={styles.movieItem}
          onPress={() => handleOpenDetail(item)}
          key={index}
        >
          <MovieDetailItem movieData={item} />
        </Pressable>
      );
    });
  } else {
    renderList = props.renderData.map((item, index) => {
      return <CinemaItemList renderData={item} key={index} />;
    });
  }
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScrollEndDrag={handleEndReached}
      >
        {renderList}
      </ScrollView>
      {isloading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text
            style={{
              marginLeft: 10,
            }}
          >
            加载中...
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  movieItem: {
    borderBottomWidth: 1,
    borderColor: "#CCC",
    marginBottom: 8,
    marginTop: 8,
    paddingBottom: 8,
  },
  cinemaItem: {},
  loadingContainer: {
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
