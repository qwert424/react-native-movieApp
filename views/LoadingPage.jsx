import { StyleSheet, ActivityIndicator, View, Text } from "react-native";

export default function LoadingPage() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#008c8c" />
      <Text
        style={{
          marginTop: 20,
        }}
      >
        数据加载中...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
