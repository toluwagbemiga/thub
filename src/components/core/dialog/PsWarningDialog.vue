<template>
    <ps-modal ref="psmodal" maxWidth="350px" :isClickOut='false' class=" z-50" >
        <template #title>
            <ps-label-title class="flex flex-auto "> 
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="text-yellow-300 mt-1 me-2" size="sm" />
                {{ title }}
            </ps-label-title>
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
library.add(faExclamationTriangle);

export default defineComponent({
    name: "PsWarningDialog",
    components : {
        PsModal,
        PsLabel,
        PsLabelTitle,
        PsButton,
    },
    setup() {
        const psmodal = ref();
        const title = ref(i18n.global.t('ps_warning_dialog__warning'));
        const message = ref(i18n.global.t('ps_warning_dialog__warning_message'));
        
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