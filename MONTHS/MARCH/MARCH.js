let chartCreated = false;

/* background color zones */
const backgroundZones = {
  id: 'backgroundZones',
  beforeDraw(chart) {

    const {ctx, chartArea, scales} = chart;
    const y = scales.y;

    const zones = [
      {min:0, max:2, color:"#852e47"},
      {min:2, max:4, color:"#c2441c"},
      {min:4, max:6, color:"rgb(74, 90, 48)"},
      {min:6, max:8, color:"#0d244d"},
      {min:8, max:10, color:"#5e3c5d"}
    ];

    ctx.save();

    zones.forEach(zone => {

      const yTop = y.getPixelForValue(zone.max);
      const yBottom = y.getPixelForValue(zone.min);

      ctx.fillStyle = zone.color;
      ctx.globalAlpha = 0.25;

      ctx.fillRect(
        chartArea.left,
        yTop,
        chartArea.right - chartArea.left,
        yBottom - yTop
      );

    });

    ctx.restore();
  }
};

document.getElementById("showChart").addEventListener("click", function(){

  const container = document.getElementById("chartContainer");

  if(container.style.display === "block"){
    container.style.display = "none";
    return;
  }

  container.style.display = "block";

  if(!chartCreated){

    const cells = document.querySelectorAll(".cell .hours");

    let days = [];
    let hours = [];

    cells.forEach((cell, index) => {
      let text = cell.innerText.trim();
      let total = 0; // Default to 0 hours

      // Only run the split and math if the cell is not empty ("-")
      if (text !== "-") {
        let h = parseInt(text.split("h")[0]);
        let m = parseInt(text.split("h")[1].split("min")[0]);
        total = h + (m / 60);
      }

      days.push(index + 1);
      hours.push(total);
    });

    new Chart(document.getElementById("studyChart"), {
      type: "line",
      data: {
        labels: days,
        datasets: [{
          label: "Study Hours",
          data: hours,
          borderColor: "#ffffff",
          backgroundColor: "transparent",
          pointBackgroundColor: "#ffffff",
          pointRadius: 3,
          tension: 0.3,
          borderWidth: 1.5,
          pointHoverRadius: 4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 10
          }
        }
      },
      plugins: [backgroundZones]
    });

    chartCreated = true;
  }

});