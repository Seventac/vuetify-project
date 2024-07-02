import { defineStore } from 'pinia';
// TODO api接口编写 目前postId数据为字符串：john.doe@doe.com@test.com
// TODO 从后端获取点赞数和分享数需要获取postId后再次请求后端返回数据
// TODO 这里的发送请求只是通知后端数据库往哪个账户的点赞数加一，不带数据返回功能
export const usePostStore = defineStore('post', {
  state: () => ({
    likes: 0,
    shares: 0,
    id: null,
  }),
  actions: {
    setPostId(id) {
      this.id = id;
    },
    // 发送get请求到后端获取点赞数
    async getLikesAndShares(postId) {
      // 假设返回点赞数
      const response = await fetch(`http://127.0.0.1:4523/m1/4275276-0-default/api/get/${postId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("这里是返回数据"+data)
        this.likes = data.likes; // 更新本地状态
        this.shares = data.shares;
      } else {
        throw new Error('Failed to fetch post');
      }
    },
    // 发送请求到后端增加点赞数
    async likePost(postId) {
      // 假设返回新的点赞数
      const response = await fetch(`http://127.0.0.1:4523/m1/4275276-0-default/api/post/likes/${postId}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log("点赞成功")
        this.likes += 1; // 更新本地状态
      } else {
        throw new Error('Failed to like the post');
      }
    },
    // 发送请求到后端增加分享数
    async sharePost(postId) {

      // 假设返回新的分享数
      const response = await fetch(`http://127.0.0.1:4523/m1/4275276-0-default/api/post/shares/${postId}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        this.shares += 1; // 更新本地状态
      } else {
        throw new Error('Failed to share the post');
      }
    },
  },
});
