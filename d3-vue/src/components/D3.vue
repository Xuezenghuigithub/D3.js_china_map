<template>
  <div>
    <div id="svg"></div>
  </div>
</template>

<script>
export default {
  name: "D3",
  mounted() {
    const dataset = [50, 43, 120, 87, 99, 167, 142];
    const height = 400;
    const width = 600;
    const padding = { top: 50, left: 50, right: 50, bottom: 50 };
    const xAxisLength = width - padding.left - padding.right; // x轴长度
    const yAxisLength = height - padding.top - padding.bottom; // y轴长度
    const svg = d3
      .select("#svg")
      .append("svg")
      .attr("height", height)
      .attr("width", width);

    const xScale = d3 // x轴比例尺
      .scaleBand()
      .domain(dataset.map((d, i) => i)) // 返回dataset下标组成的数组
      .range([0, xAxisLength])
      .padding(0.1);
    const yScale = d3 // y轴比例尺
      .scaleLinear()
      .domain([d3.max(dataset, d => d), 0]) // 反着写倒置坐标轴
      .range([0, yAxisLength]);

    const xAxis = d3.axisBottom(xScale); // 生成x轴
    const yAxis = d3.axisLeft(yScale); // 生成y轴

    const gx = svg // 定义容器用于展示x轴
      .append("g")
      .attr(
        "transform", // 设置x轴偏移量
        `translate(${padding.left},${height - padding.bottom})`
      );
    const gy = svg // 定义容器用于展示y轴
      .append("g")
      .attr(
        "transform", // 设置y轴偏移量
        `translate(${padding.left},${height - padding.bottom - yAxisLength})`
      );
    gx.call(xAxis);
    gy.call(yAxis);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
