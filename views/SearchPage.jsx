import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import LoadingPage from "./LoadingPage";
import { changeLoading } from "../store/loadingSlice";
import { getHotLabelAsync } from "../store/movieSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addSearchLogList, removeSearchLogList } from "../store/historySlice";

const windowWidth = Dimensions.get("window").width;

export default function SearchPage({ navigation }) {
  // 仓库
  const { isLoading } = useSelector((store) => store.loading);
  const { hotLabel } = useSelector((store) => store.movie);
  const { searchLogList } = useSelector((store) => store.history);
  const dispatch = useDispatch();

  // 获取标签
  const getHotLabelList = async () => {
    dispatch(getHotLabelAsync());
  };

  useEffect(() => {
    if (hotLabel.length === 0) {
      getHotLabelList();
    }
  }, []);
  // 点击热门标配
  const handleHotLabel = (item) => {
    dispatch(
      addSearchLogList({
        hotLabelTitle: item.hotLabelTitle,
        hotLabelId: item.hotLabelId,
      })
    );
    if (item.hotLabelId) {
      navigation.navigate("Detail", { id: item.hotLabelId });
      dispatch(changeLoading(true));
    } else {
      navigation.navigate("ShowMovieList", {
        searchValue: item.hotLabelTitle,
      });
    }
  };

  // 删除标签历史
  const handledeleteHistory = (item) => {
    Alert.alert("提醒", "你确定要删除这条搜索记录吗？", [
      {
        text: "取消",
        style: "cancel",
      },
      {
        text: "确定",
        onPress: () => dispatch(removeSearchLogList(item.hotLabelTitle)),
      },
    ]);
  };

  if (!isLoading) {
    return (
      <View style={styles.container}>
        {/* 上部分 */}
        <View style={styles.labelContainer}>
          <View style={styles.labelTitle}>
            <Text style={styles.title}>搜 索 记 录</Text>
          </View>
          <View
            style={[styles.hotLabelContainer, styles.historyLabelContainer]}
          >
            {searchLogList.length === 0
              ? null
              : searchLogList.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Pressable onPress={() => handleHotLabel(item)}>
                        <Text
                          style={[styles.hotLabelItem, styles.historyLabelItem]}
                          numberOfLines={1}
                          ellipsizeMode="middle"
                        >
                          {item.hotLabelTitle}
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => handledeleteHistory(item)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <AntDesign
                          name="minuscircle"
                          size={18}
                          color="red"
                          style={styles.deleteItem}
                        />
                      </Pressable>
                    </View>
                  );
                })}
          </View>
        </View>

        {/* 下部分 */}
        <View style={styles.labelContainer}>
          <View style={styles.labelTitle}>
            <Text style={styles.title}>热 门 标 签 推 荐</Text>
          </View>
          <View style={styles.hotLabelContainer}>
            {hotLabel.map((item, index) => {
              return (
                <Pressable onPress={() => handleHotLabel(item)} key={index}>
                  <Text
                    style={styles.hotLabelItem}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {item.hotLabelTitle}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
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
  labelContainer: {
    flex: 0.5,
  },
  labelTitle: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#008c8c" },
  hotLabelContainer: {
    flex: 0.9,
    width: windowWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  hotLabelItem: {
    maxWidth: windowWidth / 2 - 20,
    height: 30,
    backgroundColor: "#fff",
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
    lineHeight: 30,
    borderRadius: 5,
    backgroundColor: "#008c8c",
    color: "#fff",
    position: "relative",
  },
  historyLabelContainer: {
    justifyContent: "flex-start",
  },
  deleteItem: {
    position: "absolute",
    left: -20,
    top: -25,
  },
  historyLabelItem: {
    marginRight: 10,
  },
});
