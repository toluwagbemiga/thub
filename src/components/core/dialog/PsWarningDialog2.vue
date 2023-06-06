<template>
    <ps-modal ref="psmodal" maxWidth="400px" :isClickOut='false' theme=" lg:px-8 px-6 py-6 lg:rounded-2xl rounded-xl" class=' z-20'>
        <template #title>
            <div class="w-full text-center flex flex-auto justify-center">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="text-yellow-300 mt-1 me-2" size="lg" />
                <ps-label class="font-medium text-lg lg:text-xl"> {{title}} </ps-label>
            </div>
        </template>
        <template #body>
            <div class="w-full text-center ">
                <ps-label class="font-light text-xs lg:text-sm"> {{message}} </ps-label>
            </div>
        </template>
        <template #footer>
            <div class=" flex flex-row justify-between">
                <ps-button @click="actionClicked('no')" textSize="text-xxs lg:text-sm" class="py-3 " theme="bg-secondary-300 dark:bg-secondaryDark-grey text-textLight dark:text-primaryDark-white"> {{cancelButton}} </ps-button>  
                <ps-button @click="actionClicked('yes')" textSize="text-xxs lg:text-sm" class="py-3"  > {{okButton}} </ps-button>                 
            </div>
        </template>
    </ps-modal>
</template>

<script lang='ts'>
import { defineComponent,ref } from 'vue';
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import { i18n } from '@/assets/locales/index';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
library.add(faExclamationTriangle);

export default defineComponent({
    name : "PsConfirmDialog",
    components : {
        PsModal,
        PsLabel,
        PsButton
    },
    setup() {
        const psmodal = ref();
        const title = ref(i18n.global.t('ps_warning_dialog__warning'));
        const message = ref(i18n.global.t('ps_warning_dialog__warning_message'));
        const okButton = ref(i18n.global.t('ps_confirm_dialog__yes'));
        const cancelButton = ref(i18n.global.t('ps_confirm_dialog__no'));
        let okClicked: Function;
        let cancelClicked: Function;

        function actionClicked(status) {
            if(status == 'yes') {
                okClicked();
            }else {
                cancelClicked();
            }
            psmodal.value.toggle(false);
        }

        function openModal(
                titleString, 
                messageString, 
                okString,
                cancelString,
                okClickedAction: Function, 
                cancelClickedAction: Function) {
            title.value = titleString;
            message.value = messageString.toString();
            okButton.value = okString;
            cancelButton.value = cancelString;
            psmodal.value.toggle(true);
            okClicked = okClickedAction;
            cancelClicked= cancelClickedAction;        
        }

        return {
            psmodal,
            title,
            message,
            openModal,
            actionClicked,
            okButton,
            cancelButton
        }
    },
})
</script>
