<template>
    <div>
       <ps-modal ref="psmodal"  line="hidden" maxWidth="480px" :isClickOut='false' class='h-full  ' bodyHeight="max-h-72" theme="p-6 border lg:rounded-2xl rounded-xl "> 
        <template #title>
             <!-- Item entry title -->
            <div class="ms-8 flex flex-row justify-between">
                <div class="flex flex-wrap  ">
                    <ps-label class="font-medium text-xl lg:text-3xl me-2"> {{ $t('limit_item_modal__limit') }} </ps-label>
                    <ps-label class="font-light text-sm lg:text-xl lg:mt-2.5 mt-1.5"> {{ $t('limit_item_modal__limit_post_buy') }} </ps-label>
                </div>
                <font-awesome-icon @click="psmodal.toggle(false)" :icon="['fas', 'times']" class="text-secondary-500 dark:text-secondaryDark-white" size="2x" />
            </div>
        </template>
        <template #body>      
            <!-- End Item entry title -->
            <!-- Start Input Field for md .. -->
            <div class="flex flex-col lg:mt-4 mt-3 px-8">
                <!-- Start Left Screen -->
                <div class="">
                    <div class="flex flex-col w-full">
                    
                        <ps-label class="font-medium lg:mt-4 mt-3 text-sm lg:text-base ">{{ $t('promote_item_modal__choose_package') }}  </ps-label>
                        <div class="flex flex-col w-full mt-2" id="r1">
                            <ps-radio-2
                            v-for="selectData in packageprovider.packageList.data" 
                            :key="selectData.packageId"
                            :value="selectData"
                            v-model:selectedValue="selected"  >
                               <template #title >
                                   
                                    <div>                                      
                                        <ps-label class='ms-2 font-light text-xs lg:text-sm'>{{selectData.title}} - {{ selectData.postCount }} {{ $t('limit_item_modal__post') }} </ps-label>
                                    </div>
                                </template>
                                <template #price>
                                    <ps-label class='font-light text-xs lg:text-sm'>{{ selectData.itemCurrency?.currencySymbol }} {{ selectData.price }}</ps-label>
                                </template>
                            </ps-radio-2>
                            
                        </div>
                        
                        <!-- end Ads days -->
                     </div>   
                </div>
                <!-- End Left Screen -->

            </div>
            <!-- End Input Field -->
          
        </template>
        <template #footer>    
            <ps-label class="ms-8 font-medium text-sm lg:text-base mb-2"> {{ $t('promote_item_modal__pay_with') }}  </ps-label>         
            <div class="px-8 flex flex-row justify-between">
                <ps-button class=" sm:w-24 w-20  py-3" @click="paymentClicked('PAYPAL')" >{{ $t('promote_item_modal__pay_with_paypal') }}</ps-button>
                <ps-button class="sm:w-24 w-20 py-3" @click="paymentClicked('STRIPE')" >{{ $t('promote_item_modal__pay_with_stripe') }}</ps-button>
                <ps-button class=" sm:w-24 w-20 py-3" @click="paymentClicked('RAZOR')" >{{ $t('promote_item_modal__pay_with_razor') }}</ps-button>                               
            </div>
            <div class="px-8 mt-2 flex flex-row justify-between">
                <ps-button class=" sm:w-24 w-20 py-3 " @click="paymentClicked('PAYSTACK')" >{{ $t('promote_item_modal__pay_with_stack') }}</ps-button>
                <ps-button class=" sm:w-24 w-20 py-3 " @click="paymentClicked('OFFLINE')" >{{ $t('promote_item_modal__pay_with_offline') }}</ps-button>
                <span class=" sm:w-24 w-20 py-3"></span>            
            </div>
        </template>
    </ps-modal>
    <stripe-payment-modal ref="stripe_payment_modal" />

    <paypal-payment-modal ref="paypal_payment_modal" />

    <ps-warning-dialog-2 ref="ps_warning_dialog" />

    <offline-payment-modal ref="offline_payment_modal" />
    
    <ps-error-dialog ref="ps_error_dialog" />
    <input-email-modal ref="input_email" />
 </div>

</template>

<script lang='ts'> 

// Libs
import {defineComponent, ref } from 'vue';
// import PsUtils from '@/utils/PsUtils';

// Compone
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsRadio2 from '@/components/core/radio/PsRadio2.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsWarningDialog2 from '@/components/core/dialog/PsWarningDialog2.vue';

// import PsInput from '@/components/core/input/PsInput.vue';
import StripePaymentModal from '@/components/modules/credit/StripePaymentModal.vue';
import PaypalPaymentModal from '@/components/modules/credit/PaypalPaymentModal.vue';
import OfflinePaymentModal from '@/components/modules/credit/OfflinePaymentModal.vue';
import InputEmailModal from '@/components/modules/email/InputEmailModal.vue';

// Providers
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import { createUserProviderState } from "@/store/modules/user/UserProvider";
import { usePackageProviderState } from "@/store/modules/package/PackageProvider";
import ItemLimitParameterHolder from '@/object/holder/ItemLimitParameterHolder';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
// import ItemPaidHistoryParameterHolder from '@/object/holder/ItemPaidHistoryParameterHolder';
// import { createItemPromotionProviderState } from '@/store/modules/promotion/ItemPromotionProvider';

import PsStatus from '@/api/common/PsStatus';
import { i18n } from '@/assets/locales/index';
import PsConst from '@/object/constant/ps_constants';
import PsConfig from '@/config/PsConfig';

import PaystackPop from '@paystack/inline-js';
import PsUtils from '@/utils/PsUtils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes)
export default defineComponent({
    name: "LimitItemModal",
    components: {
        PsModal,
        PsLabel,
        PsButton,
        PsErrorDialog,
        PsRadio2,
        StripePaymentModal,
        PaypalPaymentModal,
        OfflinePaymentModal,
        PsWarningDialog2,
        InputEmailModal
    },
   setup() {
        const psmodal = ref();
        const stripe_payment_modal = ref();
        const paypal_payment_modal = ref();
        const offline_payment_modal = ref();
        const ps_error_dialog = ref();
        const input_email = ref();
        const ps_warning_dialog = ref();
        const selected = ref();
        const loginUserId = PsValueProvider.psValueHolder.getLoginUserId();
        const packageprovider = usePackageProviderState();
        const itemLimitParameterHolder = new ItemLimitParameterHolder();
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        const userProvider = createUserProviderState();

        // Price Per Day
        const pricePerDay = ref(0);
        const razorKey = ref('');
        const razorId = ref('');

        async function openModal() { 

            psmodal.value.toggle(true);
            await packageprovider.resetPackageList();

            const info = await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
          
            razorKey.value = info.data.razorKey;
            if(info.status == PsStatus.SUCCESS) {
                pricePerDay.value = parseInt(info.data.oneDay, 10);
            }else {
                pricePerDay.value = 0;
            }
                        
        }

        function paymentClicked(value){
            if(PsConfig.is_demo){
                ps_warning_dialog.value.openModal(
                    i18n.global.t('payment__warning_title'), 
                    i18n.global.t('payment__confirm_message'),
                    i18n.global.t('payment__ok'),
                    i18n.global.t('credit_card_modal__cancel'),
                    () => {
                        if(value == 'PAYPAL'){
                            paypalClicked();
                        }else if(value == 'STRIPE'){
                            stripeClicked();
                        }else if(value == 'RAZOR'){
                            razorClicked();
                        }else if(value == 'PAYSTACK'){
                            paystackClicked();
                        }else if(value == 'OFFLINE'){
                            offlineClicked();
                        }
                    },
                    () => {
                        PsUtils.log("Cancel");
                    });
                
                
            }else{
                if(value == 'PAYPAL'){
                    paypalClicked();
                }else if(value == 'STRIPE'){
                    stripeClicked();
                }else if(value == 'RAZOR'){
                    razorClicked();
                }else if(value == 'PAYSTACK'){
                    paystackClicked();
                }else if(value == 'OFFLINE'){
                    offlineClicked();
                }
            }
            
        }

        function stripeClicked() {
         
            psmodal.value.toggle(false);
                
            stripe_payment_modal.value.openModal( 
                () => {
                    const payment = PsConst.PAYMENT_STRIPE_METHOD.toString();
                    doPayment(payment);
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );
           
        }

        async function doPayment(payment) {
            itemLimitParameterHolder.userId = loginUserId;
            itemLimitParameterHolder.packageId = selected.value.packageId;
            itemLimitParameterHolder.paymentMethod = payment;
            itemLimitParameterHolder.paymentMethodNounce = localStorage.paymentNonce || '';
            itemLimitParameterHolder.price = selected.value.price;
            itemLimitParameterHolder.razorId = razorId.value || '';
            console.log("payment method");
            console.log(itemLimitParameterHolder);
            const limititem = await packageprovider.postPackageBought(itemLimitParameterHolder);
            psmodal.value.toggle(false);
            if(limititem.status == PsStatus.ERROR) {
                ps_error_dialog.value.openModal('', packageprovider.limititem.message);
            } else {
                localStorage.paymentNonce = "";
                location.reload();
            }
        }
      
        function paypalClicked() {
            psmodal.value.toggle(false);
            paypal_payment_modal.value.openModal( 
                () => {
                    const payment = PsConst.PAYMENT_PAYPAL_METHOD.toString();
                    doPayment(payment);
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );    
        }

        async function razorClicked() {
            const returnData = await userProvider.getUser(loginUserId);
            const userInfo = returnData.data[0];
            //for razor ui
            const options = 
            {
                "key": razorKey.value, // Enter the Key ID generated from the Dashboard 
                "name": "Test Company", 
                "prefill": {
                    "name": userInfo.userName,
                    "email": userInfo.userEmail,
                    "contact": userInfo.userPhone
                },
                "theme": {
                    "color": "#0e9f6e"
                },
                // This handler function will handle the success payment
                "handler": async function (response) {
                    razorId.value =  response.razorpay_payment_id;
                    // Submit response.razorpay_payment_id to your server
                    doPayment(PsConst.PAYMENT_RAZOR_METHOD.toString())
                   
                },
            };
            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
            rzp1.on('payment.failed', function (response)
            {            
                alert(response.error);     
            });
           
        }

        async function paystackClicked() {
            const returnData = await userProvider.getUser(loginUserId);
            const userInfo = returnData.data[0];
            let email = userInfo.userEmail;
            if(userInfo.userEmail == "" || userInfo.userEmail == null){
                input_email.value.openModal(
                    (emailStr) => { 
                         email = emailStr; 
                        const paystack = PaystackPop.setup({
                            key: appInfoProvider?.appInfo?.data.payStackKey,
                            email: email,
                            amount: selected.value.price,
                            callback: async function(response){
                                PsUtils.log(response);
                                // Payment complete! Reference: ' + response.reference;
                                doPayment(PsConst.PAYMENT_PAY_STACK_METHOD.toString());
                                
                            },
                            onClose: function(){
                                alert("close");
                                // user closed popup
                            }

                        });
                        paystack.openIframe();
                    },
                     () => {
                         console.log('cancel'); 
                    }  );
            }else{
                const paystack = PaystackPop.setup({
                key: appInfoProvider?.appInfo?.data.payStackKey,
                email: email,
                amount: selected.value.price,
                callback: async function(response){
                    PsUtils.log(response);
                    // Payment complete! Reference: ' + response.reference;
                    doPayment(PsConst.PAYMENT_PAY_STACK_METHOD.toString());
                    
                },
                onClose: function(){
                    alert("close");
                    // user closed popup
                }

            });
            paystack.openIframe();
            }
            
        }

        function offlineClicked() {
            psmodal.value.toggle(false);
                
            offline_payment_modal.value.openModal(
                () => {
                    const payment = PsConst.PAYMENT_OFFLINE_METHOD.toString();
                    doPayment(payment);
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );
        }

        return {
            psmodal,
            openModal,
            packageprovider,
            ps_error_dialog,
            // selectedPackagePlan,
            stripe_payment_modal,
            paypal_payment_modal,
            offline_payment_modal,
            selected,
            ps_warning_dialog,
            paymentClicked,
            input_email
        }
    },
})
</script>
