import { StyleSheet, Pressable, Text, View } from "react-native";
import { useState } from "react";

// 选择框
export default function ChangeSelectPage({ navigation }) {
  // 状态
  const [selectedValue, setSelectedValue] = useState("cinema");
  // 切换选择
  const handleSelect = (value) => {
    setSelectedValue(value);
    navigation.setParams({ selected: value });
  };
  return (
    <View style={styles.selectContainer}>
      <Pressable onPress={() => handleSelect("movie")}>
        <Text
          style={[
            styles.movieItem,
            selectedValue === "movie" && styles.selected,
          ]}
        >
          电影
        </Text>
      </Pressable>
      <Pressable onPress={() => handleSelect("cinema")}>
        <Text
          style={[
            styles.cinemaItem,
            selectedValue === "cinema" && styles.selected,
          ]}
        >
          影院
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
  },
  cinemaItem: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: "#008c8c",
    borderLeftWidth: 0,
  },
  movieItem: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    color: "#008c8c",
    borderWidth: 1,
    borderColor: "#008c8c",
  },
  selected: {
    backgroundColor: "#008c8c",
    color: "#fff",
  },
});
