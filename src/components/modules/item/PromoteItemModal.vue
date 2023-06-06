<template>
<div>
       <ps-modal ref="psmodal" line="hidden" maxWidth="480px" :isClickOut='false' class='h-full  ' bodyHeight="max-h-72" theme="p-6 border lg:rounded-2xl rounded-xl "> 
        <template #title>
             <!-- Item entry title -->
            <div class="ms-8 flex flex-row justify-between">
                <div class="flex flex-wrap  ">
                    <ps-label class="font-medium text-xl lg:text-3xl me-2"> {{ $t('promote_item_modal__promote') }} </ps-label>
                    <ps-label class="font-light text-sm lg:text-xl lg:mt-2.5 mt-1.5"> {{ $t('promote_item_modal__item_promotion') }} </ps-label>
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
                    
                        <!-- for Ads Start Time -->
                        <ps-label class="font-medium text-sm lg:text-base mb-2"> {{ $t('promote_item_modal__ads_start_date') }}  </ps-label>
                        <div class="flex">
                            <div class="">
                                <ps-date-picker ref="startDate" class='z-50' :pickedDateProps="pickedDate"/>
                            </div>
                            <ps-time-picker class="bg-primary-000 dark:bg-primaryDark-black" v-model:hour="startTimeH"  v-model:min="startTimeM" v-model:ampm="startTimeAmpm"/>
                        </div>                        
                        <!-- end Ads Start Time -->
                    
                        <ps-label class="font-medium lg:mt-4 mt-3 text-sm lg:text-base "> {{ $t('promote_item_modal__choose_package') }}  </ps-label>
                        <div class="flex flex-col w-full " id="r1">
                            <div v-for=" selectData in promotionSetList" :key="selectData.id"  >
                            <ps-radio-1 v-if= "selectData.empty != '1'" 
                            :key="selectData.id"  
                            :id="selectData.id"                                                                                   
                            :value="selectData" 
                            v-model:selectedValue="selectedPromotePlan"
                            class=" mt-3">

                              <template #title >
                                  <div v-if='selectData.type == 1'>                                      
                                        <ps-label class='ms-0.5 font-light text-xs lg:text-sm'>{{selectData.days}} {{ $t('promote_item_modal__days') }}, {{ $t('promote_item_modal__promotion') }}</ps-label>
                                  </div>
                                  <div v-else-if='selectData.type == 2'>
                                        <div class='flex flex-row'>
                                            <ps-input class="w-24" readonly v-if="selectedPromotePlan.id != '5' "  v-model:value="customPromoDate" />
                                            <ps-input class="w-24" v-else  v-model:value="customPromoDate" />
                                            <ps-label class='mt-3 ms-2 font-light text-xs lg:text-sm'> {{ $t('promote_item_modal__days') }}, {{ $t('promote_item_modal__promotion') }} </ps-label> 
                                        </div>                                    
                                  </div>
                              </template>

                              <template #price>
                                    <div v-if='selectData.type == 1'>
                                        <ps-label class='font-light text-xs lg:text-sm'>{{appInfoProvider?.appInfo?.data.currencySymbol}} {{ selectData.days * pricePerDay}}</ps-label>
                                    </div>
                                    <div v-else-if='selectData.type == 2'>
                                        <ps-label class=' font-light text-xs lg:text-sm'>{{appInfoProvider?.appInfo?.data.currencySymbol}} {{ customPromoDate * pricePerDay}}</ps-label>
                                    </div>                                
                              </template>
                            </ps-radio-1>
                            </div>

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

    <offline-payment-modal ref="offline_payment_modal" />
    
    <ps-error-dialog ref="ps_error_dialog" />

    <ps-loading-dialog ref="psloading"  :isClickOut='false'/> 
    <ps-warning-dialog-2 ref="ps_warning_dialog" />
    <input-email-modal ref="input_email" />
    </div>

</template>

<script lang='ts'> 

// Libs
import {defineComponent, reactive, ref } from 'vue';
import PsUtils from '@/utils/PsUtils';

// Compone
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsTimePicker from '@/components/core/picker/PsTimePicker.vue';
import PsDatePicker from '@/components/core/picker/PsDatePicker.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsRadio1 from '@/components/core/radio/PsRadio1.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import StripePaymentModal from '@/components/modules/credit/StripePaymentModal.vue';
import PaypalPaymentModal from '@/components/modules/credit/PaypalPaymentModal.vue';
import OfflinePaymentModal from '@/components/modules/credit/OfflinePaymentModal.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsWarningDialog2 from '@/components/core/dialog/PsWarningDialog2.vue';
import InputEmailModal from '@/components/modules/email/InputEmailModal.vue';

// Providers
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import { createUserProviderState } from "@/store/modules/user/UserProvider";
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import ItemPaidHistoryParameterHolder from '@/object/holder/ItemPaidHistoryParameterHolder';
import { createItemPromotionProviderState } from '@/store/modules/promotion/ItemPromotionProvider';

import PsStatus from '@/api/common/PsStatus';
import { i18n } from '@/assets/locales/index';
import PsConst from '@/object/constant/ps_constants';
import PsConfig from '@/config/PsConfig';

import PaystackPop from '@paystack/inline-js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes)
export default defineComponent({
    name: "PromoteItemModal",
    components: {
        PsModal,
        PsLabel,
        PsButton,
        PsTimePicker,
        PsDatePicker,
        PsErrorDialog,
        PsRadio1,
        PsInput,
        StripePaymentModal,
        PaypalPaymentModal,
        OfflinePaymentModal,
        PsLoadingDialog,
        PsWarningDialog2,
        InputEmailModal
    },
   setup() {
        const psmodal = ref();
        const psloading = ref();
        const ps_warning_dialog = ref();
        const stripe_payment_modal = ref();
        const paypal_payment_modal = ref();
        const offline_payment_modal = ref();
        const startDate = ref();
        const startTimeH = ref('0');
        const startTimeM = ref('0');
        const startTimeAmpm = ref('1');
        const pickedDate = ref(new Date());
        const ps_error_dialog = ref();
        const input_email = ref();
        const customPromoDate = ref(1);
        let promoteitemId = '';

        // Init Provider
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        const userProvider = createUserProviderState();
        const promoteParameterHolder = new ItemPaidHistoryParameterHolder();
        const provider = createItemPromotionProviderState();
        const loginUserId = PsValueProvider.psValueHolder.getLoginUserId();
        appInfoParameterHolder.userId = loginUserId;
      
        const radioSelectedList = reactive({id:2, name:"Apple"});
        
        // Price Per Day
        const pricePerDay = ref(0);
        const razorKey = ref('');
        const razorId = ref('');

        const promotionSetList = reactive([
                {
                    id:"1", days:7, type:1, empty : '1'
                },
                {
                    id:"2", days:14, type:1, empty : '1'
                },
                {
                    id:"3", days:30, type:1, empty : '1'
                },
                {
                    id:"4", days:60, type:1, empty : '1'
                },
                {
                    id:"5", days:1, type:2, empty : '0'
                }
            ]);
        const selected = {id:"1", days:7, type:1};
        const selectedPromotePlan = reactive(selected);
     
        async function openModal(itemIdStr) { 

            promoteitemId = itemIdStr;
            psmodal.value.toggle(true);
            await loadUserData();
                        
        }
       

        async function loadUserData() {
            const info = await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            if(appInfoProvider.appInfo.data.frontendConfigSetting.promoteFirstChoiceDay == '' || appInfoProvider.appInfo.data.frontendConfigSetting.promoteFirstChoiceDay == '0'){
                promotionSetList[0].empty = '1';
            }else{
                promotionSetList[0].empty = '0';
                promotionSetList[0].days = parseInt(appInfoProvider.appInfo.data.frontendConfigSetting.promoteFirstChoiceDay);
            }

            if(appInfoProvider.appInfo.data.frontendConfigSetting.promoteSecondChoiceDay == '' || appInfoProvider.appInfo.data.frontendConfigSetting.promoteSecondChoiceDay == '0'){
                promotionSetList[1].empty = '1';
            }else{
                promotionSetList[1].empty = '0';
                promotionSetList[1].days = parseInt(appInfoProvider.appInfo.data.frontendConfigSetting.promoteSecondChoiceDay);
            }
            if(appInfoProvider.appInfo.data.frontendConfigSetting.promoteThirdChoiceDay == '' || appInfoProvider.appInfo.data.frontendConfigSetting.promoteThirdChoiceDay == '0'){
                promotionSetList[2].empty = '1';
            }else{
                promotionSetList[2].empty = '0';
                promotionSetList[2].days = parseInt(appInfoProvider.appInfo.data.frontendConfigSetting.promoteThirdChoiceDay);
            }
            if(appInfoProvider.appInfo.data.frontendConfigSetting.promoteFourthChoiceDay == '' || appInfoProvider.appInfo.data.frontendConfigSetting.promoteFourthChoiceDay == '0'){
                promotionSetList[3].empty = '1';
            }else{
                promotionSetList[3].empty = '0';
                promotionSetList[3].days = parseInt(appInfoProvider.appInfo.data.frontendConfigSetting.promoteFourthChoiceDay);
            }
            
          
            razorKey.value = info.data.razorKey;
            if(info.status == PsStatus.SUCCESS) {
                pricePerDay.value = parseInt(info.data.oneDay, 10);
            }else {
                pricePerDay.value = 0;
            }
        }

        function stripeClicked() {
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            let m = parseInt(startTimeM.value, 10);
            let s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();
        
            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('', 
                i18n.global.t('promote_item_modal__date_invalid_error'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate);
                if(selectedPromotePlan.type == 1) {
                    amountStr = ( selectedPromotePlan.days * pricePerDay.value ).toString();
                    daysStr = selectedPromotePlan.days.toString();
                    
                } else {
                    amountStr = ( customPromoDate.value * pricePerDay.value ).toString();
                    daysStr = customPromoDate.value.toString();
             
                }
              
                psmodal.value.toggle(false);
                
                stripe_payment_modal.value.openModal(
                    () => {
                        const payment = PsConst.PAYMENT_STRIPE_METHOD.toString();
                        doPayment(payment,
                                promoteitemId,
                                amountStr,
                                daysStr,
                                startDateTimeStr,
                                startDateTimestampStr);
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
            }
        }

        async function doPayment(payment,promoteitemId,amountStr,daysStr,startDateTimeStr,startDateTimestampStr) {
            psloading.value.openModal();
            promoteParameterHolder.itemId = promoteitemId;
            promoteParameterHolder.amount = amountStr;
            promoteParameterHolder.startDate = startDateTimeStr;
            promoteParameterHolder.howManyDay = daysStr;
            promoteParameterHolder.paymentMethod = payment;
            promoteParameterHolder.paymentMethodNounce = localStorage.paymentNonce || '';
            promoteParameterHolder.razorId = razorId.value || '';
            promoteParameterHolder.startTimeStamp = startDateTimestampStr;
            
            const paiditem = await provider.postItemPromotion(promoteParameterHolder);
            psloading.value.closeModal();
            psmodal.value.toggle(false);
            if(paiditem.status == PsStatus.ERROR) {
                ps_error_dialog.value.openModal('', provider.paiditem.message);
            } else {
                location.reload();
            }
        }

        function paymentClicked(value){
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            let m = parseInt(startTimeM.value, 10);
            let s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();
        
            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('', 
                i18n.global.t('promote_item_modal__date_invalid_error'));
            }else {
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
            
        }
      
        function paypalClicked() {
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            const m = parseInt(startTimeM.value, 10);
            const s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();
        
            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('', 
                i18n.global.t('promote_item_modal__date_invalid_error'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate);
                if(selectedPromotePlan.type == 1) {
                    amountStr = ( selectedPromotePlan.days * pricePerDay.value).toString();
                    daysStr = selectedPromotePlan.days.toString();
                } else {
                    amountStr = ( customPromoDate.value * pricePerDay.value).toString();
                    daysStr = customPromoDate.value.toString();
                }

                psmodal.value.toggle(false);

                paypal_payment_modal.value.openModal(
                    () => {
                        const payment = PsConst.PAYMENT_PAYPAL_METHOD.toString();
                        doPayment(payment,
                                promoteitemId,
                                amountStr,
                                daysStr,
                                startDateTimeStr,
                                startDateTimestampStr);
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
                
            }
        }

        async function razorClicked() {
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            let m = parseInt(startTimeM.value, 10);
            let s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();
        
            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('', 
                i18n.global.t('promote_item_modal__date_invalid_error'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate);
           
                if(selectedPromotePlan.type == 1) {
                    amountStr = (selectedPromotePlan.days * pricePerDay.value).toString();
                    daysStr = selectedPromotePlan.days.toString();
                } else {
                    amountStr = (customPromoDate.value * pricePerDay.value).toString();
                    daysStr = customPromoDate.value.toString();
                }
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
                        // Submit response.razorpay_payment_id to your server
                        razorId.value =  response.razorpay_payment_id;
                        const payment = PsConst.PAYMENT_RAZOR_METHOD.toString();
                        doPayment(payment,
                                promoteitemId,
                                amountStr,
                                daysStr,
                                startDateTimeStr,
                                startDateTimestampStr);
                    },
                };
                const rzp1 = new (window as any).Razorpay(options);
                rzp1.open();
                rzp1.on('payment.failed', function (response)
                {            
                    alert(response.error);     
                });
            }
           
        }

        async function paystackClicked() {
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            const m = parseInt(startTimeM.value, 10);
            const s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();
        
            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('', 
                i18n.global.t('promote_item_modal__date_invalid_error'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate);
               
                if(selectedPromotePlan.type == 1) {
                    amountStr = (selectedPromotePlan.days * pricePerDay.value).toString();
                    daysStr = selectedPromotePlan.days.toString();
                } else {
                    amountStr = (customPromoDate.value * pricePerDay.value).toString();
                    daysStr = customPromoDate.value.toString();
                }
               
                appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
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
                                amount: amountStr,
                                callback: async function(response){
                                    PsUtils.log(response);
                                    // Payment complete! Reference: ' + response.reference;
                                    const payment = PsConst.PAYMENT_PAY_STACK_METHOD.toString();
                                    doPayment(payment,
                                            promoteitemId,
                                            amountStr,
                                            daysStr,
                                            startDateTimeStr,
                                            startDateTimestampStr);
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
                        } );
                }else{
                    const paystack = PaystackPop.setup({
                        key: appInfoProvider?.appInfo?.data.payStackKey,
                        email: email,
                        amount: amountStr,
                        callback: async function(response){
                            PsUtils.log(response);
                            // Payment complete! Reference: ' + response.reference;
                            const payment = PsConst.PAYMENT_PAY_STACK_METHOD.toString();
                            doPayment(payment,
                                    promoteitemId,
                                    amountStr,
                                    daysStr,
                                    startDateTimeStr,
                                    startDateTimestampStr);
                        },
                        onClose: function(){
                            alert("close");
                            // user closed popup
                        }

                    });
                    paystack.openIframe();
                }
                
            }
        }

        function offlineClicked() {
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            const m = parseInt(startTimeM.value, 10);
            const s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();
        
            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('', 
                i18n.global.t('promote_item_modal__date_invalid_error'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate).toString();
                if(selectedPromotePlan.type == 1) {
                    amountStr = (selectedPromotePlan.days * pricePerDay.value).toString();
                    daysStr = selectedPromotePlan.days.toString();
                } else {
                    amountStr = ( customPromoDate.value * pricePerDay.value ).toString();
                    daysStr = customPromoDate.value.toString();
                }

                psmodal.value.toggle(false);
                offline_payment_modal.value.openModal(
                    () => {
                        const payment = PsConst.PAYMENT_OFFLINE_METHOD.toString();
                        doPayment(payment,
                                promoteitemId,
                                amountStr,
                                daysStr,
                                startDateTimeStr,
                                startDateTimestampStr);
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
            }
        }

        return {
            appInfoProvider,
            psmodal,
            openModal,
            psloading,
            startDate,
            startTimeH,
            startTimeM,
            startTimeAmpm,
            pickedDate,
            ps_error_dialog,
            promotionSetList,
            radioSelectedList,
            customPromoDate,
            pricePerDay,
            selectedPromotePlan,
            stripe_payment_modal,
            paypal_payment_modal,
            offline_payment_modal,
            ps_warning_dialog,
            paymentClicked,
            input_email
        }
    },
})
</script>
