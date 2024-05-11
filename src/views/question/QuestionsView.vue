<template>
  <div id="questionsView">
    <a-form
      :model="searchParams"
      layout="inline"
      style="justify-content: center; align-content: center; margin: 25px"
    >
      <a-form-item field="title" label="名称" style="min-width: 180px">
        <a-input v-model="searchParams.title" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 180px">
        <a-input-tag v-model="searchParams.tags" placeholder="输入后回车确认" />
      </a-form-item>
      <a-form-item field="difficulty" label="难度" style="min-width: 180px">
        <a-input-tag
          v-model="searchParams.difficulty"
          placeholder="请输入难度级别"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="outline" @click="doSubmit" shape="round">搜索</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="outline" @click="doCreate" shape="round">创建</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      style="text-align: center; align-items: center; justify-content: center"
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
        showJumper: true,
      }"
      @page-change="onPageChange"
    >
      <template #status="{ record }">
        <a-space wrap>
          <a-tag v-if="record.status === 1" style="background: #ffffff">
            <icon-font type="icon-duihao" :size="14" />
          </a-tag>
          <a-tag v-if="record.status === 0" />
        </a-space>
      </template>
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptRate="{ record }">
        {{
          `${((record.acceptNum / record.submitNum) * 100 || 0).toFixed(2)}%`
        }}
      </template>
      <!--      <template #createTime="{ record }">-->
      <!--        {{ moment(record.createTime).format("YYYY-MM-DD") }}-->
      <!--      </template>-->
      <template #optional="{ record }">
        <a-space>
          <a-button
            type="primary"
            @click="toQuestionPage(record)"
            shape="round"
          >
            做题
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>

  <!-- 右边框-->
  <div
    class="rightItem"
    style="
      width: 33%;
      height: 100vh;
      float: right;
      /*设置边框阴影*/
      padding: 5px;
      box-shadow: 0px 0px 5px rgba(35, 7, 7, 0.21);
      border-radius: 10px;
    "
  >
    <h3 style="text-align: center; top: -60px">当前进度</h3>
    <!-- 进度图表 -->
    <!--    <div-->
    <!--      class="container-schedule"-->
    <!--      style="-->
    <!--        /*padding: 5px;*/-->
    <!--        /*box-shadow: 0px 0px 5px rgba(35, 7, 7, 0.21);*/-->
    <!--        /*border-radius: 10px;*/-->
    <!--        /*width: 100%;*/-->
    <!--        text-align: center;-->
    <!--        margin-top: 0;-->
    <!--      "-->
    <!--    >-->
    <!-- 添加一个div用于ECharts图表，包含在具有伸缩特性的容器内 -->
    <div
      ref="echartsContainer"
      class="echart"
      style="
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        left: 30px;
        top: -220px;
        /*margin-top: -230px;*/
        margin-bottom: 0;
        width: 400px;
        height: 731px;
        padding: 0 0;
      "
    ></div>

    <hr style="margin-top: -375px" />

    <h3 style="text-align: center">雷达分布图</h3>
    <!--    </div>-->
    <!-- 雷达分布图 -->
    <!--    <div-->
    <!--      class="container-radar"-->
    <!--      style="-->
    <!--        position: absolute;-->
    <!--        right: 17px;-->
    <!--        padding: 5px;-->
    <!--        box-shadow: 0px 0px 5px rgba(35, 7, 7, 0.21);-->
    <!--        border-radius: 10px;-->
    <!--        width: 31.5%;-->
    <!--        top: 510px;-->
    <!--        text-align: center;-->
    <!--      "-->
    <!--    >-->
    <!-- 添加一个div用于ECharts图表，包含在具有伸缩特性的容器内 -->
    <div
      ref="radarEchartsContainer"
      class="echartRadar"
      style="
        display: flex;
        position: relative;
        width: 100%;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        top: -235px;
        height: 100%; /* 使div占据整个视口高度 */
      "
    ></div>
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const IconFont = Icon.addFromIconFontCn({
  src: "https://at.alicdn.com/t/c/font_4402305_mkpdx3zmjcr.js",
});

// 定义一个ref来持有图表容器的引用
const radarEchartsContainer = ref(null);
// onMounted(() => {
//
// });
// 定义一个ref来持有图表容器的引用
const echartsContainer = ref(null);

onMounted(() => {
  // 这是雷达分布图
  var radarChartDom = radarEchartsContainer.value;
  var myRadarChart = echarts.init(radarChartDom);
  var optionRadar;

  optionRadar = {
    legend: {
      data: ["Allocated Budget", "Actual Spending"],
      // 垂直显示 || 水平显示
      orient: "vertical",
      top: "45%",
      left: "80%",
      show: true,
    },
    radar: {
      // shape: "circle",
      indicator: [
        { name: "Sales", max: 6500 },
        { name: "Administration", max: 16000 },
        { name: "Information Technology", max: 30000 },
        { name: "Customer Support", max: 38000 },
        { name: "Development", max: 52000 },
        { name: "Marketing", max: 25000 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "Allocated Budget",
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "Actual Spending",
          },
        ],
      },
    ],
  };

  optionRadar && myRadarChart.setOption(optionRadar);

  // 这是ECharts图表
  var chartDom = echartsContainer.value;
  var myChart = echarts.init(chartDom);
  var option;

  console.log(myChart);

  const gaugeData = [
    {
      value: 20,
      name: "Easy",
      title: {
        offsetCenter: ["-60%", "108%"],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ["-60%", "120%"],
      },
    },
    {
      value: 40,
      name: "Medium",
      title: {
        offsetCenter: ["0%", "108%"],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ["0%", "120%"],
      },
    },
    {
      value: 60,
      name: "Hard",
      title: {
        offsetCenter: ["60%", "108%"],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ["60%", "120%"],
      },
    },
  ];
  option = {
    series: [
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646",
          },
        },
        axisLine: {
          lineStyle: {
            width: 40,
          },
        },
        splitLine: {
          show: true,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          distance: 50,
        },
        data: gaugeData,
        title: {
          fontSize: 12,
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 20,
          borderWidth: 1,
          formatter: "{value}%",
        },
      },
    ],
  };
  setInterval(function () {
    gaugeData[0].value = +(0.1 * 100).toFixed(2);
    gaugeData[1].value = +(0.2 * 100).toFixed(2);
    gaugeData[2].value = +(0.3 * 100).toFixed(2);
    myChart.setOption({
      series: [
        {
          data: gaugeData,
          pointer: {
            show: false,
          },
        },
      ],
    });
  }, 2000);

  option && myChart.setOption(option);
});

import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import { Icon } from "@arco-design/web-vue";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  difficulty: "",
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost({
    ...searchParams.value,
    sortField: "id",
    sortOrder: "ascend",
  });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
    // console.log(6666);
    // console.log(res.data.records);
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "状态",
    slotName: "status",
    align: "center",
  },
  {
    title: "题目名称",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "标签",
    slotName: "tags",
    align: "center",
  },
  {
    title: "通过率",
    slotName: "acceptRate",
    align: "center",
  },
  // {
  //   title: "创建时间",
  //   slotName: "createTime",
  //   align: "center",
  // },
  {
    title: "难度",
    dataIndex: "difficulty",
    align: "center",
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

/**
 * 创建题目，重定向至创建界面路由
 */
const doCreate = () => {
  router.push({
    path: `/add/question`,
  });
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#questionsView {
  float: left;
  padding: 5px;
  box-shadow: 0px 0px 5px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
  width: 64.5%;
}

.container-schedule {
  width: 34%;
  height: 400px;
  float: right;
}
</style>
