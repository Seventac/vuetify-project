<template>
  <div ref="pieChartContainer" class="pie-chart-container"></div>
</template>

<script>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import * as echarts from 'echarts';
import {getEchartsList} from "../../api/data";
import axios from "axios";

export default {
  name: 'HomeEchart',
  setup() {
    const loading = ref(false);
    const error = ref(null);
    const pieChartContainer = ref(null);
    let chartInstance = null;

    // 假设 getEchartsList 返回如下结构：[{ name: 'Label', value: 123 }, ...]
    const chartData = ref([]);

    const getEcharts = async () => {
      loading.value = true;
      error.value = null;

      try {
        chartData.value = await getEchartsList();
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('GetEcharts request canceled', e.message);
        } else {
          error.value = e.message;
        }
      } finally {
        loading.value = false;
      }

      // 当数据获取完成后，立即更新图表
      updateChart();
    };

    // 初始化图表
    onMounted(() => {
      getEcharts();
      chartInstance = echarts.init(pieChartContainer.value);

      chartInstance.on('click', (params) => {
        console.log('Clicked:', params);
        // 在这里添加更新中心文字的逻辑
      });

      window.addEventListener('resize', resizeChart);
    });

    // 窗口大小变化时调整图表大小
    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    // 组件卸载前清理
    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.dispose();
        window.removeEventListener('resize', resizeChart);
      }
    });

    // 更新图表数据及配置
    function updateChart() {
      if (chartInstance) {
        chartInstance.setOption({
          legend: {
            orient: 'vertical',
            x: 'right',
            data: chartData.value.map(item => item.name)
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              labelLine: {
                show: false
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              data: chartData.value.map(item => ({ name: item.name, value: item.value }))
            }
          ]
        });
      }
    }

    // 返回需要暴露给模板的引用
    return {
      pieChartContainer
    };
  }
};
</script>

<style scoped>
.pie-chart-container {
  width: 100%;
  height: 275px; /* 或者你需要的任何高度 */
}
</style>
