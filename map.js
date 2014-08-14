L.mapbox.accessToken = 'pk.eyJ1IjoiaGVsc2lua2kiLCJhIjoia1lFZVlNZyJ9.dVxyXwMZWRmnrXnmOuWAMQ';
var map = L.mapbox.map('map', 'chinaenvforum.map-cvdwgvbn', {
    minZoom: 4,
    maxZoom: 8,
    maxBounds: [[10,60],    //[[min-y, min-x],
              [46.5,130]]   //[max-y, max-x]],
    //zoomControl: false,
    //attributionControl: false
})
    .addLayer(L.mapbox.tileLayer('chinaenvforum.watershed_labels_cn'))
    .setView([30.0, 98.0], 6);



var dams = L.mapbox.featureLayer()
    .loadURL('china_key_dams_working_copy_en_cn.geojson')
    .setFilter(function(dam){
        return dam.properties['WTRSHED_EN'] === 'Lancang River (Mekong)';
    })
    .on('layeradd', function(d){
        var dam = d.layer,
            iconSize = [25,25],
            shadowSize = [18,12],
            iconOptions = {
                iconSize: iconSize,
                iconAnchor: [iconSize[0]*0.5,iconSize[1]],
                shadowUrl: 'icon/icon_shadow_30px_a50.png',
                shadowSize: shadowSize,
                shadowAnchor: [shadowSize[0]*0.5,shadowSize[1]*0.7]
            };

        // console.log(dam.feature.properties.STATUS_EN);
        if(dam.feature.properties.STATUS_EN === 'Existing Dam'){
            iconOptions['iconUrl'] = 'icon/wwc_blue.svg';
            dam.setIcon(L.icon(iconOptions));
        }else if(dam.feature.properties.STATUS_EN === 'Under Construction'){
            iconOptions['iconUrl'] = 'icon/wwc_red_stripe.svg';
            dam.setIcon(L.icon(iconOptions));
        }else if(dam.feature.properties.STATUS_EN === 'Proposed'){
            iconOptions['iconUrl'] = 'icon/wwc_l_orange_stripe.svg';
            dam.setIcon(L.icon(iconOptions));
        }else if(dam.feature.properties.STATUS_EN === 'Unknown'){
            iconOptions['iconUrl'] = 'icon/wwc_yellow_hollow.svg';
            dam.setIcon(L.icon(iconOptions));
        }else if(dam.feature.properties.STATUS_EN === 'Cancelled'){
            iconOptions['iconUrl'] = 'icon/wwc_gray_dashed_hollow.svg';
            dam.setIcon(L.icon(iconOptions));
        }
    })
    .addTo(map);




