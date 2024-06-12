var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });

        var lyr_OSMStandard_1 = new ol.layer.Tile({
            'title': 'OSM Standard',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_Trees_2 = new ol.format.GeoJSON();
var features_Trees_2 = format_Trees_2.readFeatures(json_Trees_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Trees_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Trees_2.on('addfeature', function() {
    var totalFeatures = jsonSource_Trees_2.getFeatures().length;
    
    document.getElementById('notrees').innerText =totalFeatures;
});    

jsonSource_Trees_2.addFeatures(features_Trees_2);
var lyr_Trees_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Trees_2, 
                style: style_Trees_2,
                popuplayertitle: "Trees",
                interactive: true,
                title: '<img style="max-width:16px; max-height:16px;" src="styles/tree.svg" /> Trees'
            });

lyr_GoogleSatellite_0.setVisible(true);lyr_OSMStandard_1.setVisible(true);lyr_Trees_2.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_OSMStandard_1,lyr_Trees_2];
lyr_Trees_2.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'English_Name_Konkani_Name_Scientific_Name_': 'English_Name_Konkani_Name_Scientific_Name_', 'English_Name': 'English Name', 'Konkani_Name': 'Konkani Name', 'Botanical_Name': 'Botanical Name', 'Photo_of_the_tree': 'Photo_of_the_tree', 'Date_of_the_photo': 'Date_of_the_photo', 'Record_your_current_location': 'Record_your_current_location', '_Record_your_current_location_latitude': 'Latitude', '_Record_your_current_location_longitude': 'Longitude', '_Record_your_current_location_altitude': '_Record_your_current_location_altitude', '_Record_your_current_location_precision': '_Record_your_current_location_precision', 'Date_of_Plantation': 'Date_of_Plantation', 'Tree_height_of_the_tree_at_time_of_plantation_in_meters_': 'Tree height(m) at time of plantation', 'Presence_of_tree_guard': 'Presence_of_tree_guard', '_uuid': '_uuid', 'Date_': 'Planted on', 'Tree_Guard': 'Tree Guard', 'Photo': 'Photo', });
lyr_Trees_2.set('fieldImages', {'OBJECTID': 'TextEdit', 'English_Name_Konkani_Name_Scientific_Name_': 'TextEdit', 'English_Name': 'TextEdit', 'Konkani_Name': 'TextEdit', 'Botanical_Name': 'TextEdit', 'Photo_of_the_tree': 'TextEdit', 'Date_of_the_photo': 'DateTime', 'Record_your_current_location': 'TextEdit', '_Record_your_current_location_latitude': 'TextEdit', '_Record_your_current_location_longitude': 'TextEdit', '_Record_your_current_location_altitude': 'TextEdit', '_Record_your_current_location_precision': 'TextEdit', 'Date_of_Plantation': 'DateTime', 'Tree_height_of_the_tree_at_time_of_plantation_in_meters_': 'TextEdit', 'Presence_of_tree_guard': 'Range', '_uuid': 'TextEdit', 'Date_': 'TextEdit', 'Tree_Guard': 'TextEdit', 'Photo': 'ExternalResource', });
lyr_Trees_2.set('fieldLabels', {'OBJECTID': 'hidden field', 'English_Name_Konkani_Name_Scientific_Name_': 'hidden field', 'English_Name': 'inline label - visible with data', 'Konkani_Name': 'inline label - visible with data', 'Botanical_Name': 'inline label - visible with data', 'Photo_of_the_tree': 'hidden field', 'Date_of_the_photo': 'hidden field', 'Record_your_current_location': 'hidden field', '_Record_your_current_location_latitude': 'inline label - visible with data', '_Record_your_current_location_longitude': 'inline label - visible with data', '_Record_your_current_location_altitude': 'hidden field', '_Record_your_current_location_precision': 'hidden field', 'Date_of_Plantation': 'hidden field', 'Tree_height_of_the_tree_at_time_of_plantation_in_meters_': 'inline label - visible with data', 'Presence_of_tree_guard': 'hidden field', '_uuid': 'hidden field', 'Date_': 'inline label - visible with data', 'Tree_Guard': 'inline label - visible with data', 'Photo': 'inline label - visible with data', });
lyr_Trees_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

// Extract and prepare data
var fieldCounts = {};
features_Trees_2.forEach(function(feature) {
    var fieldValue = feature.get('English_Name_Konkani_Name_Scientific_Name_');
    if (fieldValue) {
        if (fieldCounts[fieldValue]) {
            fieldCounts[fieldValue]++;
        } else {
            fieldCounts[fieldValue] = 1;
        }
    }
});

// Prepare the data for Chart.js
var labels = Object.keys(fieldCounts);
var data = Object.values(fieldCounts);

var ctx = document.getElementById('myPieChart').getContext('2d');
var isMobileView = window.matchMedia("(max-width: 600px)").matches;

var options = {
   plugins: {
       legend: {
           display: false
       },
       tooltip: {
           enabled: true,
           position: 'nearest', // To allow tooltips to go outside the canvas boundary
           callbacks: {
               label: function(context) {
                   var label = context.label || '';
                   if (label) {
                       var value = context.parsed || 0;
                       return value + ':' + label;
                   }
                   return '';
               }
           },
           bodyFont: {
               size: isMobileView ? 7 : 10 // Set font size based on view
           }
       }
   }
};

if (isMobileView) {
   // Mobile view
   options.responsive = true;
   options.maintainAspectRatio = true;
} else {
   // Desktop view
   options.responsive = false;
   options.maintainAspectRatio = false;
}


// Function to generate a random color in hexadecimal format
function getRandomColor() {
   var letters = '0123456789ABCDEF';
   var color = '#';
   for (var i = 0; i < 6; i++) {
       color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}

// Generate 56 unique colors for background and hover background
var backgroundColors = [];
var hoverBackgroundColors = [];

for (var i = 0; i < 56; i++) {
   var color = getRandomColor();
   backgroundColors.push(color);
   hoverBackgroundColors.push(color); // For simplicity, you can use the same color for hover
}

var myPieChart = new Chart(ctx, {
   type: 'pie',
   data: {
       labels: labels,
       datasets: [{
           data: data,
           backgroundColor: backgroundColors,
           hoverBackgroundColor: hoverBackgroundColors
       }]
   },
   options: options
});
