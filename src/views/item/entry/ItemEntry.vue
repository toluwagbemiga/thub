<template>

    <ItemUpload1 v-if="appInfoProvider.appInfo.data.frontendConfigSetting.itemUploadUi1==true" />

    <ItemUpload2 v-else-if="appInfoProvider.appInfo.data.frontendConfigSetting.itemUploadUi2==true" />

</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import ItemUpload1 from './ItemUpload1.vue'
import ItemUpload2 from './ItemUpload2.vue'

import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
// Holders
import { usePsValueHolderState } from '@/object/core/PsValueHolder';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';

export default defineComponent({
    name: "ItemEntry",
    components:{
        ItemUpload1,
        ItemUpload2
    },
    setup() {
        const appInfoProvider = usePsAppInfoProviderState();
        PsValueProvider.psValueHolder = usePsValueHolderState();
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        onMounted( async () =>{
            appInfoParameterHolder.userId = loginUserId;
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            console.log(appInfoProvider)
        })
        return {
           appInfoProvider
        }
    },
})
</script>
