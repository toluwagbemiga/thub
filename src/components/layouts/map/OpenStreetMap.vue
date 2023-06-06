<template>
  <div id="mapContainer"></div>
</template>

<script lang='ts'>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted } from "vue";

export default {
  name: "LeafletMap",
  props: {
    lat :{ 
      type: Number,
      default :0
    },
    lng: { 
      type: Number,
      default :0
    },
    onChange : Function,
    dragValue: { 
      type: Boolean,
      default : true
    } 
  },
  setup(props) {
    let map = null;

    onMounted(() => {
      map = L.map("mapContainer").setView([props.lat == null || isNaN(props.lat) ? 0 : props.lat, props.lng == null || isNaN(props.lng) ? 0 : props.lng], 5);
      var marker_a;
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      if(props.dragValue) {
        marker_a = new L.Marker([ 40.876945, 77.387978], {draggable: props.dragValue}).addTo(map);
        marker_a.on('dragstart', dragStartHandler);
      } else {
        marker_a = new L.Marker([ props.lat, props.lng]).addTo(map);
        marker_a.on('dragstart');
      }
      
      function dragStartHandler(e) {
       
        var latlng = e.target.getLatLng();
        console.log(latlng);
        if(props.onChange != undefined){
          props.onChange(latlng);
        }
      }

    });

  }
 
};
</script>

<style scoped>
#mapContainer {
    z-index: 0 !important;
    width: 100%;
}
</style>