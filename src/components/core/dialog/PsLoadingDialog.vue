<template>
    <ps-modal ref="psmodal" maxWidth="350px" :isClickOut='false' class="z-50" >
        <template #title>
            <ps-label-title> {{ $t("ps_loading_dialog__please_wait") }} </ps-label-title>
        </template>
        <template #body>
            <ps-label> {{ message }} </ps-label>
        </template>
        <template #footer>            
        </template>
    </ps-modal>
</template>

<script lang='ts'>
import { defineComponent,ref } from 'vue';
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import { i18n } from '@/assets/locales/index';

export default defineComponent({
    components : {
        PsModal,
        PsLabel,
        PsLabelTitle
    },
    setup() {
        const psmodal = ref();
        const message = ref(i18n.global.t('ps_loading_dialog__loading'));
        
        function openModal() {
            psmodal.value.toggle(true);           
        }

        function closeModal() {
            psmodal.value.toggle(false);
        }

        function setMessage(messageStr) {
            message.value = messageStr;
        }
        return {
            psmodal,
            openModal,
            closeModal,
            message,
            setMessage
        }
    },
})
</script>
