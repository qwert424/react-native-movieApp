import moviesData from "./movies.json";
import theatreData from "./theatre.json";
import cityData from "./city.json";

// 本地模拟 导出 各种方法

// 获取最近上映、即将上映、推荐电影
export const getNewMovies = (type, length = 6, isNew = false) => {
    const moviesList = moviesData.filter(data => data.state === type);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            isNew ? resolve(moviesList.slice(20, 26)) : resolve(moviesList.slice(0, length))
        }, 2000)
    })
}

// 获取电影通过id
export const getMoviesById = (id) => {
    const moviesList = moviesData.filter(data => data.id === id);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(moviesList[0])
        }, 2000)
    })
}

// 获取影院地址
export const getAddressList = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(theatreData)
        }, 2000)
    })
}

// 模拟下拉刷新 随机加两个地址
export const addAddressList = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(theatreData.slice(0, 2))
        }, 2000)
    })
}

// 模拟下拉刷新 随机加两个影片
export const addTwoMovieList = (type) => {
    const newType = type === 'new' ? "coming" : type
    const moviesList = moviesData.filter(data => data.state === newType);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(moviesList.slice(20, 22))
        }, 2000)
    })
}

// 分页获取电影数据
export const getMoviesByPage = (page, count, type) => {
    const newType = type === 'new' ? "coming" : type
    const moviesList = moviesData.filter(data => data.state === newType);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(moviesList.slice(page * count, (page + 1) * count))
        }, 2000)
    })
}

// 获取热门标签
export const getHotLabel = () => {
    const moviesList = moviesData.filter(data => data.state === "hot");

    const hotLabelArr = new Array(10).fill(0).map((item, index) => {
        return { hotLabelTitle: moviesList[index].title, hotLabelId: moviesList[index].id }
    })
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(hotLabelArr)
        }, 2000)
    })
}

// 获取搜索电影
export const getMovieBySearch = (title) => {
    const moviesList = moviesData.filter(data => new RegExp(title, 'i').test(data.title));
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(moviesList)
        }, 2000)
    })
}

