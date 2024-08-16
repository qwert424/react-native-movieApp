import { StyleSheet, View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

// 选择地区
// 没实际效果 这里不再做修改
export default function SelectAddressPage() {
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.addressText}>成都</Text>
      <AntDesign name="caretdown" size={12} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    maxWidth: 40,
    paddingLeft: 5,
  },
  addressText: {
    fontWeight: "400",
    paddingRight: 3,
    fontSize: 14,
  },
});
