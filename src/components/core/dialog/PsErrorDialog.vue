<template>
    <ps-modal ref="psmodal" maxWidth="350px" :isClickOut='false' >
        <template #title>
            <ps-label-title> {{title}} </ps-label-title>
        </template>
        <template #body>
            <ps-label> {{message}} </ps-label>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <ps-button @click="psmodal.toggle(false)"> Ok </ps-button>
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
import { i18n } from '@/assets/locales/index';

export default defineComponent({
    name: "PsErrorDialog",
    components : {
        PsModal,
        PsLabel,
        PsLabelTitle,
        PsButton
    },
    setup() {
        const psmodal = ref();
        const title = ref(i18n.global.t('ps_error_dialog__error'));
        const message = ref(i18n.global.t('ps_error_dialog__error_message'));
        
        function openModal(titleStr, messageStr) {
            if(titleStr != null && titleStr.trim() != '') {
                title.value = titleStr;
            }

            if(messageStr != null && messageStr.trim() != '') {
                message.value = messageStr;
            }
            psmodal.value.toggle(true);           
        }

        function closeModal() {
            psmodal.value.toggle(false);
        }
        
        return {
            psmodal,
            openModal,
            closeModal,
            title,
            message
        }
    },
})
</script>
