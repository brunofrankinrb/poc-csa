import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";

const scaleFactor = 20,
  barHeight = 20;

type Payload = {
  currentTime: number;
  data: Data[];
};

type Data = {
  start: number;
  end: number;
  type: "male" | "female";
};

const buildGraph = (payload: Payload) => {
  const data = payload.data;
  const width = data[data.length - 1].end * scaleFactor;
  const graph = d3
    .select(".container")
    .attr("width", width)
    .attr("height", barHeight);

  const bar = graph
    .selectAll("g")
    .data(data);
    

  bar
    .join("g")
    //.append("g")
    .attr("transform", function (d) {
      return "translate(" + d.start * scaleFactor + ",0)";
    })
    .append("rect")
    .attr("width", function (d) {
      return (d.end - d.start) * scaleFactor;
    })
    .attr("fill", (d) => {
      const selected =
        payload.currentTime >= d.start && payload.currentTime <= d.end;
      
      if (d.type === "male") {
        if (selected === true) {
          return "blue";
        } else {
          return "lightblue";
        }
      } else {
        if (selected === true) {
          return "red";
        } else {
          return "lightpink";
        }
      }
    })
    .attr("height", barHeight - 1)
    .on("click", (_, d) => {
        console.log("click", d)
    });


  bar
    .append("text")
    .attr("x", 0)
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .attr("fill", (d) => {
        const selected =
          payload.currentTime >= d.start && payload.currentTime < d.end;
        if (selected) return "#FFFFFF";
        else return "#000000"
    })
    .text((d) => {
      return d.type;
    });
};

export type TimelineProps = {
    currentTime: number;
}

const Timeline: FC<TimelineProps> = ({ currentTime }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    console.log("buildGraph", currentTime);
    buildGraph({
      currentTime,
      data: [
        {
          start: 0,
          end: 3,
          type: "male",
        },
        {
          start: 3,
          end: 13,
          type: "female",
        },
        {
          start: 13,
          end: 20,
          type: "male",
        },
      ],
    });
  },[currentTime]);

  return (
    <svg className="container" ref={ref} width="300" height="100"></svg>
    // <div style={{display: 'flex'}}>
    //     <div style={{border: '1px solid black', width: '20px', height: '30px'}}></div>
    //     <div style={{border: '1px solid black', width: '20px', height: '30px'}}></div>
    //     <div style={{border: '1px solid black', width: '20px', height: '30px'}}></div>
    //     <div style={{border: '1px solid black', width: '20px', height: '30px'}}></div>
    // </div>
  );
};

export default Timeline;
