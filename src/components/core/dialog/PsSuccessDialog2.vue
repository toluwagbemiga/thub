<template>
    <ps-modal ref="psmodal" line="hidden" maxWidth="370px" :isClickOut='false' theme=" lg:px-12 px-10 py-6 lg:rounded-2xl rounded-xl" class=' z-20'>
        <template #title>
            <div class="w-full text-center">
                <ps-label class="font-medium text-lg lg:text-xl"> {{title}} </ps-label>
            </div>
        </template>
        <template #body>
            <div class="w-full text-center mt-4">
                <ps-label class="font-light text-xs lg:text-sm"> {{message}} </ps-label>
            </div>
        </template>
        <template #footer>
            <div class=" flex justify-end">
                <div class="flex-grow-0"> 
                    <ps-button @click="actionClicked()" textSize="text-xxs lg:text-sm" class="py-3"  > {{okButton}} </ps-button>                 
                </div>
                
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
export default defineComponent({
    components : {
        PsModal,
        PsLabel,
        PsButton
    },
    setup() {
        const psmodal = ref();
        const title = ref(i18n.global.t('ps_success_dialog__success'));
        const message = ref(i18n.global.t('ps_success_dialog__success_message'));
        const okButton = ref(i18n.global.t('ps_confirm_dialog__yes'));
        let okClicked: Function;

        function actionClicked() {
            okClicked();
            psmodal.value.toggle(false);
        }

        function openModal(
                titleString, 
                messageString, 
                okString,
                okClickedAction: Function, ) {
            title.value = titleString;
            message.value = messageString.toString();
            okButton.value = okString;
            psmodal.value.toggle(true);
            okClicked = okClickedAction;      
        }

        return {
            psmodal,
            title,
            message,
            openModal,
            actionClicked,
            okButton,
        }
    },
})
</script>
