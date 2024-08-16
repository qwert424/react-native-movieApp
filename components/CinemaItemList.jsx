import { StyleSheet, View, Text } from "react-native";

// 影院渲染组件
export default function CinemaItemListPage(props) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.topTitle} numberOfLines={1} ellipsizeMode="tail">
          {props.renderData.theaterName}
        </Text>
        <Text>
          ¥<Text style={styles.price}>{props.renderData.startPrice}</Text>起
        </Text>
      </View>
      <Text
        style={styles.addressContainer}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        地址：{props.renderData.theaterAddr}
      </Text>
      <View style={styles.labelContainer}>
        <Text
          style={[
            styles.labelItem,
            {
              backgroundColor: props.renderData.allowRefund
                ? "#008c8c"
                : "#ccc",
            },
          ]}
        >
          {props.renderData.allowRefund ? "可退款" : "不可退款"}
        </Text>
        <Text
          style={[
            styles.labelItem,
            { backgroundColor: props.renderData.endorse ? "#008c8c" : "#ccc" },
          ]}
        >
          {props.renderData.endorse ? "折扣卡" : "无折扣"}
        </Text>
        <Text
          style={[
            styles.labelItem,
            { backgroundColor: props.renderData.snack ? "#008c8c" : "#ccc" },
          ]}
        >
          {props.renderData.snack ? "有小吃" : "无小吃"}
        </Text>
        <Text
          style={[
            styles.labelItem,
            { backgroundColor: props.renderData.vipTag ? "#008c8c" : "#ccc" },
          ]}
        >
          {props.renderData.vipTag ? "VIP" : "非VIP"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topTitle: {
    fontSize: 16,
    fontWeight: "bold",
    maxWidth: 200,
  },
  price: {
    color: "#f00",
    fontSize: 18,
  },
  addressContainer: {
    marginTop: 10,
    fontSize: 14,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  labelItem: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 5,
    borderRadius: 5,
    color: "#fff",
  },
});
