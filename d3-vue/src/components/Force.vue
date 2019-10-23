<template>
  <div id="svg"></div>
</template>

<script>
export default {
  name: "Force",
  mounted() {
    const nodes = [
      { name: "Zander" }, // 0
      { name: "Annie" }, // 1
      { name: "Anna" }, // 2
      { name: "Doris" }, // 3
      { name: "Linda" }, // 4
      { name: "Censek" }, // 5
      { name: "Paul" } // 6
      //   { name: "Jack" } // 7
    ];
    const edges = [
      { source: 0, target: 4, relation: "Cherry组队友" },
      { source: 0, target: 6, relation: "上下属" },
      { source: 1, target: 3, relation: "Alice组队友" },
      { source: 1, target: 6, relation: "上下属" },
      { source: 2, target: 6, relation: "上下属" },
      { source: 2, target: 5, relation: "Aaron组队友" },
      { source: 3, target: 6, relation: "上下属" },
      { source: 4, target: 6, relation: "上下属" },
      { source: 5, target: 6, relation: "上下属" },
      { source: 2, target: 4, relation: "相爱相杀" },
      { source: 3, target: 5, relation: "室友" }
    ];

    const height = 800;
    const width = 800;
    const padding = { top: 50, left: 50, bottom: 50, right: 50 };

    // svg画布
    let svg = d3
      .select("#svg")
      .append("svg")
      .attr("height", height)
      .attr("width", width);

    // 设置力导向图布局和参数
    let force = d3
      .forceSimulation() // 指定为力导向图布局
      .nodes(nodes) // 设置节点
      .force("link", d3.forceLink(edges).distance(200)) // 设置连线和连线的长度
      .force("charge", d3.forceManyBody) // 添加多体力（吸力、斥力等组合起来的高阶函数）
      .force(
        "center", // 设置力中心点
        d3
          .forceCenter() // 创建一个力中心
          .x((width - padding.left - padding.right) / 2) // x坐标
          .y((height - padding.top - padding.bottom) / 2) // y坐标
      );

    console.log(nodes);

    // 绘制节点
    var circles = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .style("fill", "yellow");

    // 绘制连线
    var lines = svg
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .style("stroke", "green")
      .style("stroke-width", 1);

    // 添加描述
    var text = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .style("font-size", "12px")
      .style("fill", "#000")
      .attr("dx", 0)
      .attr("dy", 0)
      .text(d => d.name);
    
    // 添加关系
    var relations = svg
      .selectAll(".relation")
      .data(edges)
      .enter()
      .append("text")
      .style("fill", "red")
      .style("font-size", "11px")
      .attr("class", "relation")
      .attr("dx", 0)
      .attr("dy", 0)
      .text(d => d.relation);

    force.on("tick", () => { // 监听力导向图每运动一帧
      lines
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      circles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .call( // 将拖拽行为加入到节点上
          d3
            .drag() // 设置拖拽行为
            .on("start", dragStarted) // 拖拽开始
            .on("drag", dragging) // 拖拽中
            .on("end", dragEnded) //拖拽结束
        );
      text.attr("x", d => d.x).attr("y", d => d.y);
      relations
        .attr("x", d => (d.source.x + d.target.x) / 2) // x坐标为连线中间点x坐标
        .attr("y", d => (d.source.y + d.target.y) / 2); // y坐标为连线中间点y坐标
    });

    function dragStarted(d) {
      // 拖拽开始事件处理函数
      if (!d3.event.active) force.alphaTarget(0.3).restart(); // 设置力的衰减系数α（范围[0, 1]，值越大移动速度越高，并重新布局该区域
      d.fx = d.x; // d.fx为静止时的位置，d.x初识位置
    }
    function dragging(d) {
      // 拖拽中事件处理函数
      d.fx = d3.event.x; // d3.event.x为拖动时的坐标
      d.fy = d3.event.y;
    }
    function dragEnded(d) {
      // 拖拽结束事件处理函数
      if (!d3.event.active) force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }
};
</script>

<style lang="" scoped>
</style>
