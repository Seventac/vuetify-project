<template>
  <!--  TODO 侧边栏收缩时出现页面容器大小不匹配问题-->
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="ma-2">
          <v-card
            class="mx-auto text-white card-frosted"
            color="rgba(50, 100, 150, 0.5)"
            max-width="600"
            prepend-icon="mdi-twitter"
            title="Account"
          >
            <v-card-actions>
              <v-list-item class="w-100">
                <template v-slot:prepend>
                  <v-container
                    style="height: 50px"
                    fluid
                  >
                    <v-row justify="center">
                      <v-menu
                        min-width="150px"
                        rounded
                      >
                        <template v-slot:activator="{ props }">
                          <v-btn
                            v-bind="props"
                          >
                            <v-avatar
                              color="brown"
                              size="large"
                            >
                              <span class="text-h5">{{ user.initials }}</span>
                            </v-avatar>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-text>
                            <div class="mx-auto text-center">
                              <v-avatar
                                color="brown"
                              >
                                <span class="text-h5">{{ user.initials }}</span>
                              </v-avatar>
                              <h3>{{ user.fullName }}</h3>
                              <p class="text-caption mt-1">
                                {{ user.email }}
                              </p>
                              <v-divider class="my-3"></v-divider>
                              <v-btn
                                variant="text"
                                rounded
                              >
                                编辑账户
                              </v-btn>
                              <v-divider class="my-3"></v-divider>
                              <v-btn
                                variant="text"
                                rounded
                              >
                                注销账户
                              </v-btn>
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-menu>
                    </v-row>
                  </v-container>
                </template>
                <v-list-item-title>名称：Admin</v-list-item-title>
                <v-list-item-subtitle>角色：管理员</v-list-item-subtitle>
                <template v-slot:append>
                  <div class="justify-self-end">
                    <!-- 点赞功能 -->
                    <v-icon class="me-1" icon="mdi-heart" @click="likePost"></v-icon>
                    <span class="subheading me-2">{{ likes }}</span>
                    <span class="me-2"></span>
                    <!-- 分享功能 -->
                    <v-icon class="me-1" icon="mdi-share-variant" @click="sharePost"></v-icon>
                    <span class="subheading">{{ shares }}</span>
                  </div>
                </template>
              </v-list-item>
            </v-card-actions>
            <template v-slot:prepend>
              <v-icon size="x-large"></v-icon>
            </template>
            <!--  消息开启方式 snackbar=true  -->
            <v-snackbar
              v-model="snackbar"
            >
              {{ text }}
              <template v-slot:actions>
                <v-btn
                  color="pink"
                  variant="text"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>

            <v-textarea
              v-model="personalIntroduction"
              :readonly="!isEditable"
              class="text-h5 py-2 ma-5 max-height-area"
              placeholder="请输入个人简介（最多50字）"
              :maxLength="maxLength"
              @input="onInput"
            ></v-textarea>

            <v-row class="ma-1 justify-end">
              <v-btn class="ma-1" color="primary" @click="editIntroduction" v-if="!isEditable">
                Change
              </v-btn>
              <v-btn class="ma-1" color="success" @click="saveIntroduction" v-if="isEditable">
                Save
              </v-btn>
            </v-row>
          </v-card>
        </v-sheet>
      </v-col>

<!-- 账号设置模块    -->
      <v-col>
        <v-sheet class="ma-2">
          <v-card
            class="mx-auto"
            subtitle="账号设置"
            title="Settings"
          >
            <template v-slot:prepend>
              <v-icon color="primary" icon="mdi-account">
              <!-- 账号头像 -->
              </v-icon>
            </template>
            <template v-slot:append>
              <v-icon color="success" icon="mdi-check">

              </v-icon>
            </template>
            <v-card-text>

              <settings></settings>
              个性化设置；
              账号密码修改；
              账号注销；
              账号注销确认；
              账号删除；
              账号删除确认；
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <v-sheet class="ma-2">
          <v-card
            class="mx-auto"
            subtitle="账号绑定"
            title="Bindings"
          >
            <template v-slot:prepend>
              <v-icon color="primary" icon="mdi-account"></v-icon>
            </template>
            <template v-slot:append>
              <v-icon color="success" icon="mdi-check"></v-icon>
            </template>
            <v-card-text>电话号码绑定，邮箱绑定，身份认证</v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="ma-2">
          <v-card
            class="mx-auto"
            subtitle="个人资料"
            title="Profile"
          >
            <template v-slot:prepend>
              <v-icon color="primary" icon="mdi-account"></v-icon>
            </template>
            <template v-slot:append>
              <v-icon color="success" icon="mdi-check"></v-icon>
            </template>
            <v-card-text>个人介绍，对外展示：个人资料</v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="ma-2">
          <v-card
            class="mx-auto"
            subtitle="账号安全"
            title="Security"
          >
            <template v-slot:prepend>
              <v-icon color="primary" icon="mdi-account"></v-icon>
            </template>
            <template v-slot:append>
              <v-icon color="success" icon="mdi-check"></v-icon>
            </template>
            <v-card-text>账号安全设置，密码锁设置</v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="4">
        <v-sheet class="ma-2">
          <v-card
            class="mx-auto"
            subtitle="账号状态"
            title="account state"
          >
            <template v-slot:prepend>
              <v-icon color="primary" icon="mdi-account"></v-icon>
            </template>
            <template v-slot:append>
              <v-icon color="success" icon="mdi-check"></v-icon>
            </template>
            <v-card-text>当前登录状态展示；账号安全性检测图表展示</v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="ma-2">
          <v-card
            class="mx-auto"
            subtitle="账号登录记录"
            title="Login status"
          >
            <template v-slot:prepend>
              <v-icon color="primary" icon="mdi-account"></v-icon>
            </template>
            <template v-slot:append>
              <v-icon color="success" icon="mdi-check"></v-icon>
            </template>
            <v-card-text>账号异地登录记录；账号登录频率检测图表展示</v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {ref, watch, computed, onMounted} from "vue";
import {usePostStore} from "../../stores/postStore";
import Settings from "../../views/account/components/Settings"
export default {
  name: "Account",
  components: {Settings},
  setup() {
    const personalIntroduction = ref(null);
    const isEditable = ref(false);
    const snackbar = ref(false);
    const maxLength = 50;
    const errorMessages = ref([]);
    const text = ref(`输入字符超出长度，请将输入字符控制在${maxLength}个以内`);
    const user = ref({
      initials: 'JD',
      fullName: 'John Doe',
      email: 'john.doe@doe.com',
    });
    const editIntroduction = () => {
      isEditable.value = true;
    };
    const saveIntroduction = () => {
      isEditable.value = false;
    };
    // TODO 从前台传递用户id，服务前缀加邮箱地址加客户端后缀
    const postId = ref('john.doe@doe.com@test.com');
    const postStore = usePostStore();
    // 使用计算属性来获取state，确保响应性
    const likes = computed(() => postStore.likes);
    const shares = computed(() => postStore.shares);

    function getPost() {
      postStore.setPostId(postId.value);
      postStore.getLikesAndShares(postId.value);
    }

    function likePost() {
      postStore.likePost(postId.value);
    }

    function sharePost() {
      postStore.sharePost(postId.value);
    }

    watch(personalIntroduction, (newValue) => {
        // 当输入的字符长度超过50时，显示snackbar
        if (newValue && newValue.length >= 50) {
          snackbar.value = true;
          text.value = `输入字符超出长度，请将输入字符控制在${maxLength}个以内`;

          setTimeout(() => {
            snackbar.value = false;
          }, 2000);
        } else {
          // 如果字符数恢复到50以内，则关闭snackbar
          snackbar.value = false;
          errorMessages.value = [];
        }
      },
      {immediate: true}
    );

    // 处理输入事件，阻止超过最大长度的输入
    function onInput(event) {
      const {length} = event.target.value;
      if (length > maxLength) {
        event.preventDefault();
        return;
      }
    }

    onMounted(() => {
      getPost();
    });

    return {
      personalIntroduction,
      isEditable,
      maxLength,
      editIntroduction,
      saveIntroduction,
      user,
      snackbar,
      text,
      onInput,
      likes,
      shares,
      likePost,
      sharePost,
    }
  }
}
</script>

<style lang="scss">
.max-height-area {
  max-height: 100px;
  overflow-y: hidden;
}
.card-frosted {
  /* 设置背景色和背景模糊效果 */
  backdrop-filter: blur(10px); /* 应用背景模糊效果 */
  border-radius: 10px; /* 可选：添加圆角 */
  overflow: hidden; /* 确保模糊效果不会溢出卡片 */
}
</style>
