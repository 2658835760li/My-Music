<template>
  <div>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="card-content">
            <div class="card-left">
              <el-icon>
                <user />
              </el-icon>
            </div>
            <div class="card-right">
              <div class="card-num">{{ userCount }}</div>
              <div>用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="card-content">
            <div class="card-left">
              <el-icon>
                <headset />
              </el-icon>
            </div>
            <div class="card-right">
              <div class="card-num">{{ songCount }}</div>
              <div>歌曲总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="card-content">
            <div class="card-left">
              <el-icon>
                <mic />
              </el-icon>
            </div>
            <div class="card-right">
              <div class="card-num">{{ singerCount }}</div>
              <div>歌手数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="card-content">
            <div class="card-left">
              <el-icon>
                <document />
              </el-icon>
            </div>
            <div class="card-right">
              <div class="card-num">{{ songListCount }}</div>
              <div>歌单数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <h3>用户地理分布统计</h3>
        <el-card class="cav-info" shadow="hover" :body-style="{ padding: '10px' }" id="userGeo"
          style="height: 996px;"></el-card>
      </el-col>
      <el-col :span="12">
        <h3>用户性别比例</h3>
        <el-card class="cav-info" shadow="hover" :body-style="{ padding: '0px' }" id="userSex"></el-card>
      </el-col>
      <el-col :span="12">
        <h3>歌曲类型</h3>
        <el-card class="cav-info" shadow="hover" :body-style="{ padding: '0px' }" id="songStyle"></el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <h3>歌手性别比例</h3>
        <el-card class="cav-info" shadow="hover" :body-style="{ padding: '0px' }" id="singerSex"></el-card>
      </el-col>
      <el-col :span="12">
        <h3>歌手国籍</h3>
        <el-card class="cav-info" shadow="hover" :body-style="{ padding: '0px' }" id="country"></el-card>
      </el-col>
    </el-row>
  </div>

</template>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import * as echarts from "echarts";
import { Mic, Document, User, Headset } from "@element-plus/icons-vue";
import { HttpManager } from "@/api/index";
import chinaJSON from "@/assets/Map/China.json"


const userCount = ref(0);
const songCount = ref(0);
const singerCount = ref(0);
const songListCount = ref(0);

echarts.registerMap("china", chinaJSON as any);
const userGeo = reactive({
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2
  },
  series: [
    {
      name: '用户人数',
      type: 'map',
      map: "china",
      roam: false, //鼠标缩放
      //地图位置
      left: 40,
      top: 80,
      bottom: 20,
      right: 20,
      emphasis: {
          label: {
            show: true
          }
        },
      // 地图文字设置
      label: {
        show: false,
        color: "black",
        fontSize: 14,
      },
      zoom:1,
      data: [
        // {name:'山东省',value:"2"}
      ]
    }
  ],
  visualMap: {
    left: 'left',
    top: '5%',
    min: 0,
    max: 10,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
      ]
    },
    text: ['High', 'Low'],
    calculable: true
  },
  toolbox: {
    show: true,
    //orient: 'vertical',
    left: 'left',
    top: 'top',
    feature: {
      dataView: { readOnly: true },
      restore: {},
      saveAsImage: {}
    }
  },
});

const userSex = reactive({
  series: [
    {
      type: "pie",
      label: {
        normal: {
          formatter: '{b}:{c}: ({d}%)',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 15
          }
        }
      },
      data: [

      ],
    },
  ],
});
const songStyle = reactive({
  xAxis: {
    type: "category",
    data: ["华语", "粤语", "欧美", "日韩", "BGM", "轻音乐", "乐器"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      type: "bar",
      barWidth: "40%",
      label: {
        show: true, //开启显示
        position: 'top', //在上方显示
        // formatter: '{c}%',//显示百分号
        textStyle: { //数值样式
          color: 'black',//字体颜色
          fontSize: 10//字体大小
        }
      }
    },
  ],
});
const singerSex = reactive({
  series: [
    {
      type: "pie",
      label: {
        normal: {
          formatter: '{b}:{c}: ({d}%)',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 15
          }
        }
      },
      data: [
        // {
        //   value: 0,
        //   name: "男",
        // },
        // {
        //   value: 0,
        //   name: "女",
        // },
      ],
    },
  ],
});
const country = reactive({
  xAxis: {
    type: "category",
    data: [
      "中国",
      "韩国",
      "意大利",
      "新加坡",
      "美国",
      "马来西亚",
      "西班牙",
      "日本",
      "瑞典"
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      type: "bar",
      barWidth: "40%",
      label: {
        show: true, //开启显示
        position: 'top', //在上方显示
        // formatter: '{c}%',//显示百分号
        textStyle: { //数值样式
          color: 'black',//字体颜色
          fontSize: 10//字体大小
        }
      }
    },
  ],
});

function setSex(sex, arr) {
  let value = 0;
  const name = sex === 0 ? "女" : "男";
  for (let item of arr) {
    if (sex === item.sex) {
      value++;
    }
  }
  return { value, name };
}
HttpManager.getAllUser().then((res) => {
  const result = res as ResponseBody;
  userCount.value = result.data.length;
  userSex.series[0].data.push(setSex(0, result.data));
  userSex.series[0].data.push(setSex(1, result.data));

  const userSexChart = echarts.init(document.getElementById("userSex"));
  userSexChart.setOption(userSex, true);

  let locations = result.data.map(item => item.location);

  // 去重
  let uniqueLocations = [...new Set(locations)];

  // 统计每个location的数量
  let counts = uniqueLocations.map(location => {
    return locations.filter(l => l === location).length;
  });

  // 创建新的对象并添加到data数组中
  for (let i = 0; i < uniqueLocations.length; i++) {
    let obj = {
      name: uniqueLocations[i],
      value: counts[i].toString()
    };
    userGeo.series[0].data.push(obj);
  }
  
  const userGeoChart = echarts.init(document.getElementById("userGeo"))
  userGeoChart.setOption(userGeo);
});

HttpManager.getAllSong().then((res) => {
  songCount.value = (res as ResponseBody).data.length;
});
HttpManager.getSongList().then((res) => {
  const result = res as ResponseBody;
  songListCount.value = result.data.length;
  for (let item of result.data) {
    for (let i = 0; i < songStyle.xAxis.data.length; i++) {
      if (item.style.includes(songStyle.xAxis.data[i])) {
        songStyle.series[0].data[i]++;
      }
    }
  }
  const songStyleChart = echarts.init(document.getElementById("songStyle"));
  songStyleChart.setOption(songStyle);
});

HttpManager.getAllSinger().then((res) => {
  const result = res as ResponseBody;
  singerCount.value = result.data.length;
  singerSex.series[0].data.push(setSex(0, result.data));
  singerSex.series[0].data.push(setSex(1, result.data));
  const singerSexChart = echarts.init(document.getElementById("singerSex"));
  singerSexChart.setOption(singerSex);

  for (let item of result.data) {
    for (let i = 0; i < country.xAxis.data.length; i++) {
      if (item.location.includes(country.xAxis.data[i])) {
        country.series[0].data[i]++;
      }
    }
  }
  const countryChart = echarts.init(document.getElementById("country"));
  countryChart.setOption(country);
});
</script>

<style scoped>
.card-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 150px;
  padding-left: 20%;
  text-align: center;
}

.card-left {
  display: flex;
  font-size: 3rem;
}

.card-right {
  flex: 1;
  font-size: 14px;
}

.card-num {
  font-size: 30px;
  font-weight: bold;
}

h3 {
  margin: 10px 0;
  text-align: center;
}

.cav-info {
  border-radius: 6px;
  overflow: hidden;
  height: 250px;
  background-color: white;
}
</style>
