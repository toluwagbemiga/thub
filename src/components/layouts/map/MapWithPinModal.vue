<template>
    <ps-modal ref="psmodal" :isClickOut="false" >
        <template #title>
            <ps-label-title> {{ $t("map_with_pin_moadl__item_location") }} </ps-label-title>
        </template>
        <template #body>
            <GoogleMap id="map" ref="map_ref" :api-key="map.key"
                :center="map.center" :zoom="map.zoom"  style="width: 100%; height: 500px">
                
                <Marker :options="mcenter" draggable="false" @drag="updateCoordinates"/>             

            </GoogleMap>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <ps-button @click="psmodal.toggle(false)"> {{ $t("map_with_pin_moadl__ok") }} </ps-button>
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
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";import PsUtils from '@/utils/PsUtils';

export default defineComponent({
    name : "MapWithPinModal",
    components: {
        PsModal,
        GoogleMap,
        Marker,
        PsLabelTitle,
        PsButton
    },
    setup() {
        const psmodal = ref();
        const map_ref = ref();

        const mcenter = ref({
            position : {
            lat: 40.876945,
            lng: 77.387978 
            },
            draggable: false
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

        function updateCoordinates(location) {
            PsUtils.log(location.latLng.lat());
            PsUtils.log(location.latLng.lng());
        }

        function openModal(lat: number, lng: number) {
            
            mcenter.value.position.lat = lat;
            mcenter.value.position.lng = lng;
            psmodal.value.toggle(true);
        }

        return {
            psmodal,
            updateCoordinates,
            mcenter,
            map,
            openModal,
            map_ref
         }
    },
})
</script>
