<template>
    <ps-modal ref="psmodal" :isClickOut="true" >
        <template #title>
            <ps-label-title> {{ $t("map_with_pin_picker_moadl__item_location") }}  </ps-label-title>
            <ps-label class='mt-2'> {{ $t("map_with_pin_picker_moadl__drag_pin") }}  </ps-label>
        </template>
        <template #body>
            <GoogleMap id="map" ref="map_ref" :api-key="map.key"
                :center="mcenter2" :zoom="map.zoom"  style="width: 100%; height: 450px">
                
                <Marker :options="mcenter" draggable="false" ref="marker" @drag="updateCoordinates"/>             

            </GoogleMap>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <ps-button @click="pickedLocation"> {{ $t("map_with_pin_picker_moadl__pick_location") }}</ps-button>
                <ps-button @click="psmodal.toggle(false)" class='ms-2' theme='btn-second'> {{ $t("map_with_pin_picker_moadl__cancel") }} </ps-button>

            </div>
        </template>
    </ps-modal>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { GoogleMap , Marker  } from 'vue3-google-map'; 
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";import PsLabel from '@/components/core/label/PsLabel.vue';

export default defineComponent({
    name : "MapWithPinPickerModal",
    components: {
        PsModal,
        GoogleMap,
        Marker,
        PsLabelTitle,
        PsButton,
        PsLabel
    },
    setup() {
        const psmodal = ref();
        const map_ref = ref();
        const marker = ref();
        let updateLatLng : Function;
        const lat =ref();
        const lng = ref();
        const mcenter = ref({
            position : {
            lat: 40.876945,
            lng: 77.387978 
            },
            draggable: true
        });

        const mcenter2 = ref({
            lat: 40.876945,
            lng: 77.387978 
        });

        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        const map = ref({
            key: '000',
            center: mcenter.value.position,
            zoom: 15
        });
        
        async function loadData(){
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            map.value.key = appInfoProvider.appInfo.data.frontendConfigSetting.mapKey;
        }
        loadData();


        function pickedLocation() {
            updateLatLng(lat.value, lng.value);
            psmodal.value.toggle(false);
        }

        function updateCoordinates(location) {
         
            lat.value = location.latLng.lat();
            lng.value = location.latLng.lng();
            
        }

        function openModal(lat: number, lng: number, updateLocation: Function) {
            
            if(lat != 0) {
                mcenter.value.position.lat = lat;
            }

            if(lng != 0) {
                mcenter.value.position.lng = lng;
            }

            if(lat != 0 && lng != 0) {
                map.value.center = mcenter.value.position;
                mcenter2.value = mcenter.value.position;
        
                if(map_ref.value != null && map_ref.value.center != null) {
                    map_ref.value.map.setCenter(map_ref.value.map.center);
                    marker.value.marker.component.value.setPosition(mcenter.value.position);                    
                }
            }
            updateLatLng = updateLocation;

            psmodal.value.toggle(true);
        }

        return {
            psmodal,
            updateCoordinates,
            mcenter,
            map,
            openModal,
            map_ref,
            mcenter2,
            marker,
            pickedLocation
         }
    },
})
</script>
