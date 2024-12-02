const backButton = document.querySelector("#backButton");
const greetings = document.querySelector(".greetings");

backButton.addEventListener("click", (e) => {
    window.location.href = "../login/login.html";
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUsername");
});

const newDate = new Date();
let time = newDate.getHours();

if (time >= 0 && time < 12) {
    greetings.innerText = `Good Morning, ${localStorage.getItem("currentUsername")}`;
} else if (time >= 12 && time < 17) {
    greetings.innerText = `Good Afternoon, ${localStorage.getItem("currentUsername")}`;
} else if (time >= 17 && time < 24) {
    greetings.innerText = `Good Evening, ${localStorage.getItem("currentUsername")}`;
}


const margin = { top: 70, right: 30, bottom: 40, left: 100 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([0, height]);

const svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.bottom + margin.top)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const dataset = [
  { date: new Date("2024-01-01"), value: 200 },
  { date: new Date("2024-02-01"), value: 100 },
  { date: new Date("2024-05-01"), value: 343 },
];

x.domain(d3.extent(dataset, (d) => d.date));
y.domain([0, d3.max(dataset, (d) => d.value)]); // Ensure the y-axis starts from 0

svg
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(
    d3  
      .axisBottom(x)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat("%b %Y"))
  );

svg.append("g").call(d3.axisLeft(y));

const line = d3
  .line()
  .x((d) => x(d.date))
  .y((d) => y(d.value));

svg
  .append("path")
  .data([dataset]) // Make sure it's an array of data
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1)
  .attr("d", line);
