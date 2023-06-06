<template>
    <ps-modal ref="psmodal" maxWidth="650px" :isClickOut='false' class="z-50" >
        <template #title>
            <ps-label-title> {{ $t('privact_modal__privacy_policy') }} </ps-label-title>
        </template>
        <template #body>
            <ps-label v-html="aboutUsProvider.aboutus?.data?.privacypolicy"> </ps-label>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <ps-button @click="userAction(true)"> {{ $t('privact_modal__accept') }} </ps-button>
                <ps-button @click="userAction(false)" class='ms-4' theme="btn-second">  {{ $t('privact_modal__reject') }} </ps-button>
            </div>
        </template>
    </ps-modal>
</template>


<script lang='ts'>

import { defineComponent,ref } from 'vue';
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import { createAboutUsProviderState } from "@/store/modules/aboutus/AboutUsProvider";

export default defineComponent({
    name: "PrivacyModel",
    components : {
        PsModal,
        PsLabel,
        PsLabelTitle,
        PsButton
    },
    setup() {
        const psmodal = ref();
        const aboutUsProvider = createAboutUsProviderState();
        aboutUsProvider.loadAboutUs();
        let isAccept;
        function openModal(isAcceptFun?) {

            psmodal.value.toggle(true);
            isAccept = isAcceptFun;
        }

        function userAction(status: Boolean) {
            isAccept(status);
            closeModal();
        }

        function closeModal() {
            psmodal.value.toggle(false);
        }
        return {
            psmodal,
            openModal,
            closeModal,
            aboutUsProvider,
            userAction
        }
    },
})
</script>
