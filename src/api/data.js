import {isCancel} from 'axios';
import request from '../utils/request';
// 封装搜索请求的函数
export async function getLinkList(cancelToken) {
  try {
    // 发送搜索请求
    const response = await request.get('http://127.0.0.1:4523/m1/4275276-0-default/api/search', {
      cancelToken,
    });

    // 返回搜索结果
    return response.data;
  } catch (error) {
    // 如果请求被取消，则不抛出错误
    if (isCancel(error)) {
      console.log('Search request canceled', error.message);
    } else {
      // 否则，抛出原始错误
      throw error;
    }
  }
}

export async function getDeveloperList({ offset = 0, limit = 10 }) {
  try {
    // 发送搜索请求，使用offset和limit作为查询参数
    const response = await request.get('http://127.0.0.1:4523/m1/4275276-0-default/api/getDeveloperList', {
      params: {
        offset, // 起始索引
        limit, // 请求的记录数
      },
    });

    // 假设API返回的数据结构有一个logs数组和一个total字段（如果API不提供total，则可能需要手动计算或省略）
    const { logs, total } = response.data;

    // 返回结果，包括当前页的日志列表和可能的总记录数
    return { logs, total };
  } catch (error) {
    // 如果请求被取消，则不抛出错误
    if (isCancel(error)) {
      console.log('Search request canceled', error.message);
    } else {
      // 否则，抛出原始错误
      throw error;
    }
  }
}


// 封装搜索请求的函数
export async function getEchartsList() {
  try {
    // 发送搜索请求
    const response = await request.get('http://127.0.0.1:4523/m1/4275276-0-default/api/home_echart');
    // 返回搜索结果
    return response.data;
  } catch (error) {
    // 如果请求被取消，则不抛出错误
    if (isCancel(error)) {
      console.log('Search request canceled', error.message);
    } else {
      // 否则，抛出原始错误
      throw error;
    }
  }
}


