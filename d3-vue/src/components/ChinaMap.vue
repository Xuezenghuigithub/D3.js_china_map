<template>
  <div>
    <div id="svg"></div>
    <div id="hover"></div>
  </div>
</template>

<script>
import * as geo from "d3-geo";
import * as d3Color from "d3-scale-chromatic";
export default {
  name: "ChinaMap",
  mounted() {
    const width = 1024;
    const height = 600;
    var svg = d3
      .select("#svg")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "#000");

    const projection = geo
      .geoMercator() // 球形墨卡托投影
      .scale(550) // 投影的比例因子，可按比例放大投影
      .center([105, 38]) // 设置中心点的经纬度为中国地图中心点
      .translate([width / 2, height / 2]); // 将投影偏移至设SVG中心

    const path = geo.geoPath(projection); // 创建地理路径生成器

    const colors = d3.scaleOrdinal(d3Color.schemeBrBG[11]); // 创建颜色比例尺

    async function getJson() {
      // 使用d3.json()方法拿到GeoJSON数据
      const result = await d3.json("/api/allData");
      // const result = await d3.json("../../static/china.json"); // d3.json()不可访问本地文件
      const data = result.result; // 拿到数据，Object类型
      console.log(data);
      return data;
    }

    //  绘制地图
    getJson().then(data => {
      svg
        .selectAll("path")
        .data(data.features) // 绑定地理特征数据
        .enter()
        // .append("path") // 不能使用append
        .insert("path", "g") // 在g元素之后插入path元素
        .attr("d", path) // 添加path路径，每个path为一个省
        .attr("fill", function(d, i) {
          // 加入颜色比例尺
          return colors(i);
        })
        .attr("stroke", "rgba(255, 255, 255, 1") // 边框
        .attr("stroke-width", 1)
        .attr("class", "path");
    });

    // 定位城市坐标，log经度，lat纬度
    const places = [
      { name: "北京制作中心", log: "116.54", lat: "39.82" },
      { name: "西安制作中心", log: "108.84", lat: "34.21" },
      { name: "沈阳制作中心", log: "123.39", lat: "41.86" }
    ];
    const location = svg
      .selectAll("g")
      .data(places)
      .enter()
      .append("g")
      .attr("transform", d => {
        const coord = projection([d.log, d.lat]); // 将经纬度转化为页面坐标
        console.log("coord", coord);
        return `translate(${coord[0]},${coord[1]})`;
      });
    location
      .append("circle")
      .attr("r", 4)
      .attr("fill", "yellow");

    // 加入动画
    const hover = d3.select("#hover");
    location
      .on("mouseover", function(d) {
        hover
          .html(d.name)
          .style("position", "fixed")
          .style("color", "blue")
          .style("left", d3.event.pageX - 45 + "px")
          .style("top", d3.event.pageY - 40 + "px")
          .style("opacity", 1);

        d3.select(this)
          .select("circle")
          .transition()
          .duration(500)
          .attr("r", 8);
      })
      .on("mouseout", function() {
        hover.style("opacity", 0);
        d3.select(this)
          .select("circle")
          .transition()
          .duration(1000)
          .attr("r", 4);
      });
  }
};
</script>

<style scoped>
</style>
