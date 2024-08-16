import { StyleSheet, Pressable, TextInput, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { addSearchLogList } from "../store/historySlice";
import { useDispatch } from "react-redux";

// 搜索框
export default function SearchInputPage(props) {
  // 搜索值
  const [searchValue, setSearchValue] = useState("");

  // dispatch
  const dispatch = useDispatch();

  // 搜索
  const handleSearch = () => {
    if (!props.homeInput) return;
    props.navigation.navigate("Search");
  };

  // 搜索结果
  const handleSearchEditing = async () => {
    dispatch(
      addSearchLogList({
        hotLabelTitle: searchValue,
        hotLabelId: null,
      })
    );
    setSearchValue("");
    props.navigation.navigate("ShowMovieList", {
      searchValue: searchValue,
    });
  };

  if (props.homeInput) {
    return (
      <Pressable style={styles.searchContainer} onPress={handleSearch}>
        <AntDesign name="search1" size={18} color="#aaa" />
        <Text style={styles.TextInput}>搜影片、影院、演出、视频、咨询</Text>
      </Pressable>
    );
  } else {
    return (
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={18} color="#aaa" />
        <TextInput
          placeholder="搜影片、影院、演出、视频、咨询"
          placeholderTextColor="#aaa"
          returnKeyType="search"
          style={styles.SearchInput}
          defaultValue={searchValue}
          onChangeText={(t) => setSearchValue(t)}
          onSubmitEditing={handleSearchEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    paddingLeft: 5,
    maxWidth: 220,
    borderRadius: 5,
  },
  SearchInput: {
    height: 30,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
    maxWidth: 210,
  },
  TextInput: {
    height: 30,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
    maxWidth: 210,
    lineHeight: 30,
    color: "#bbb",
  },
});
