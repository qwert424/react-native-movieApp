import AntDesign from "@expo/vector-icons/AntDesign";

// 导入路由
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 导入仓库
import { store } from './store/store';
import { Provider } from 'react-redux';

// 导入页面
import HomePage from './views/HomePage'
import CinemaPage from './views/CinemaPage'
import DetailPage from './views/DetailPage'
import LoadingPage from './views/LoadingPage'
import MovieMorePage from './views/MovieMorePage'
import SearchPage from './views/SearchPage'
import ShowMoviePage from './views/ShowMoviePage'

// 导入组件
import SearchInput from './components/SearchInput'
import SelectAddress from './components/SelectAddress'
import ChangeSelect from './components/ChangeSelect'

import { Pressable, Text } from 'react-native';
// 栈
const NativeStack = createNativeStackNavigator();

export default function App({ navigation }) {

  // 搜索
  const handleSearch = (navigation) => {
    navigation.navigate("Search", {
      toSearch: true
    })
  }

  // 回退
  const handleback = (navigation) => {
    navigation.goBack()
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeStack.Navigator>
          <NativeStack.Screen name="Home" component={HomePage} options={({ navigation, route }) => {
            return {
              headerRight: () => (
                <SearchInput navigation={navigation} route={route} homeInput={true} />
              ),
              headerLeft: () => (
                <SelectAddress />
              ),
              headerTitle: "",
            }
          }} />
          <NativeStack.Screen name="Cinema" component={CinemaPage} options={({ navigation }) => {
            return {
              headerRight: () => (
                <Pressable onPress={() => handleSearch(navigation)}>
                  <AntDesign name="search1" size={18} color="#aaa" />
                </Pressable>
              ),
              headerLeft: () => (
                <SelectAddress />
              ),
              headerTitle: () => (
                <ChangeSelect navigation={navigation} />
              ),
            }
          }} >
          </NativeStack.Screen>
          <NativeStack.Screen name="Detail" component={DetailPage} options={
            { headerTitle: "电影详情" }
          } />
          <NativeStack.Screen name="Loading" component={LoadingPage} />
          <NativeStack.Screen name="MovieMore" component={MovieMorePage} options={
            { headerTitle: "电影列表" }
          } />
          <NativeStack.Screen name="Search" component={SearchPage} options={({ navigation, route }) => {
            return {
              headerBackTitle: null,
              headerTitle: "",
              headerRight: () => (
                <Pressable onPress={() => handleback(navigation)}>
                  <Text>取消</Text>
                </Pressable>
              ),
              headerLeft: () => (
                <SearchInput navigation={navigation} route={route} homeInput={false} />
              ),
            }
          }} />
          <NativeStack.Screen name="ShowMovieList" component={ShowMoviePage} options={({ navigation }) => {
            return {
              headerTitle: "搜索结果",
            }
          }} />
        </NativeStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
