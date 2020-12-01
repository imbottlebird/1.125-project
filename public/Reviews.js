function getReviews(){
    /**
   * ---------------------------------------
   * This demo was created using amCharts 4.
   * 
   * For more information visit:
   * https://www.amcharts.com/
   * 
   * Documentation is available at:
   * https://www.amcharts.com/docs/v4/
   * ---------------------------------------
   */

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create map instance
  var chart = am4core.create("chartdiv", am4maps.MapChart);

  // Set map definition
  chart.geodata = am4geodata_usaLow;

  // Set projection
  chart.projection = new am4maps.projections.AlbersUsa();

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  //Set min/max fill color for each area
  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: chart.colors.getIndex(12).brighten(1),
    max: chart.colors.getIndex(14).brighten(-0.3)
  });

  // Make map load polygon data (state shapes and names) from GeoJSON
  polygonSeries.useGeodata = true;

  // Set heatmap values for each state

  let results;
  const url = "./preprocessed_reviews.csv";

  Papa.parse(url, {
        dynamicTyping: true,
        download: true,
        header: true,
        comments: "*=",
        complete: function(data) {
          results = data.data
          console.log("results: ",results)
          polygonSeries.data = results;
        },
        crossOrigin: null
  });

setTimeout(()=> {
}, 1500);

  

  // Set up heat legend
  let heatLegend = chart.createChild(am4maps.HeatLegend);
  heatLegend.series = polygonSeries;
  heatLegend.align = "right";
  heatLegend.valign = "bottom";
  heatLegend.width = am4core.percent(20);
  heatLegend.marginRight = am4core.percent(4);
  heatLegend.minValue = 0;
  heatLegend.maxValue = 40000000;

  // Set up custom heat map legend labels using axis ranges
  var minRange = heatLegend.valueAxis.axisRanges.create();
  minRange.value = heatLegend.minValue;
  minRange.label.text = "Less rating";
  var maxRange = heatLegend.valueAxis.axisRanges.create();
  maxRange.value = heatLegend.maxValue;
  maxRange.label.text = "More rating!";

  // Blank out internal heat legend value axis labels
  heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function(labelText) {
    return "";
  });

  // Configure series tooltip
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "State: {name}, Review count: {0}, Avg star: {0.0}";
  polygonTemplate.tooltipText = "State: {name}, Review count: {review_count}, Avg star: {value}";
  polygonTemplate.nonScalingStroke = true;
  polygonTemplate.strokeWidth = 0.5;

  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#34495E");
}