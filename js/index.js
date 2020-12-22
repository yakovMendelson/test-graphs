// 'https://raw.githubusercontent.com/yakovMendelson/testCsv/main/phase-example.csv'
// 'https://raw.githubusercontent.com/yakovMendelson/testCsv/main/treatment-example.csv'

fetch('https://raw.githubusercontent.com/yakovMendelson/testCsv/main/data_example.csv')
	.then(function (response) {
		return response.text();
	})
	.then(function (text) {
		let series = csvToSeries(text);
		
		renderChart(series);
	})
	.catch(function (error) {
		console.log(error);
	});

function csvToSeries(text) {
	let dataAsJson = JSC.csv2Json(text);
	let MovementFast = [], rpm = [], ObjectDistance = [];
	dataAsJson.forEach(function (row) {
		rpm.push({ x: new Date(row.TimeStamp), y: row.RPM });
		MovementFast.push({ x: new Date(row.TimeStamp), y: row.MovementFast });
		ObjectDistance.push({ x: new Date(row.TimeStamp), y: row.ObjectDistance });
	});
	return [
		{ name: 'RPM', points: rpm },
		{ name: 'Movement_Fast', points: MovementFast },
		{ name: 'distance', points: MovementFast },
	];
}

function renderChart(series) {
	
	series.forEach((data) => {
	  let chart= JSC.Chart(`${data.name}`, {
			title_label_text: `graph of ${data.name}`,
			debug: true, 
			legend_visible: false, 
			axisToZoom: 'x', 
			xAxis_scale_zoomLimit: 1, 
			annotations: [{
				label_text: '',
				position: 'bottom left',
				label_text: 'Click-Drag the chart area to zoom.'
			}],
			legend_visible: false,
			xAxis_crosshair_enabled: true,
			defaultSeries_firstPoint_label_text: '<b>%seriesName</b>',
			defaultPoint_tooltip: '%seriesName <b>%yValue</b>',
			series: [data]
		})
		
		
		
		
	}

	);
}
