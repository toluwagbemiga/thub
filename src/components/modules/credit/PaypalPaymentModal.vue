<template>
    
    <ps-modal ref="psmodal"  line="hidden"  :isClickOut='false' > 
        <template #body> 
            <div id="dropin-container"></div>
            <div class="flex justify-center mx-auto">
                <ps-button id="submit-button">{{ $t('paypal_credit_card_modal__submit_payment') }}</ps-button>
                <ps-button theme="btn-second" class="text-center mx-4" @click="psmodal.toggle(false)" > {{ $t('paypal_credit_card_modal__close') }} </ps-button>
            </div>
        </template>
    </ps-modal>
    <ps-loading-dialog ref="psloading"  :isClickOut='false'/> 

    <ps-error-dialog ref="ps_error_dialog" />
</template>

<script lang='ts'>
import { defineComponent, ref} from 'vue';

import PsModal from '@/components/core/modals/PsModal.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';

import { createTokenProviderState } from '@/store/modules/token/TokenProvider';

import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import { i18n } from '@/assets/locales/index';

export default defineComponent({
    name : 'PaypalPaymentModal',
    components : {
        PsModal,
        PsButton,
        PsErrorDialog,
    },
     setup() {
        const psmodal = ref();
        const ps_error_dialog = ref();
        const tokenProvider = createTokenProviderState();

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

        async function openModal(
                okClickedAction: Function, 
                cancelClickedAction: Function) {
            
                psmodal.value.toggle(true);
                okClicked = okClickedAction;
                cancelClicked= cancelClickedAction;  
                //for braintree paypal dropin 
                const returnData = await tokenProvider.loadToken(); 
                const button = document.querySelector('#submit-button');
                const dropin = require('braintree-web-drop-in');
                
                dropin.create({
                    authorization: returnData.data.message,
                    container: '#dropin-container',
                    paypal: {
                        flow: 'vault',
                    }
                }, function (createErr, instance) {
                    button?.addEventListener('click', function () {
                        if (instance.isPaymentMethodRequestable()) {
                            setTimeout(function() {
                                instance.requestPaymentMethod(async function (err, payload) {
                                    if(err) {
                                        ps_error_dialog.value.openModal('', 
                                        i18n.global.t('paypal_credit_card_modal__error_paid_ad'));
                                        return;
                                    }
                                    // Submit payload.nonce to your server
                                    localStorage.paymentNonce = payload.nonce;
                                    actionClicked('yes');

                                });
                            }, 200);
                        }
                  
                    });
                });
        }

        return {
            psmodal,
            ps_error_dialog,
            openModal,
            actionClicked,
        }
    },
})
</script>