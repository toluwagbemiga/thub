<template>
    <div v-if="notify"> 
        <div id="notification-box" class="flex items-center w-mobile sm:w-median lg:w-64 justify-between leading-none lg:px-2 py-1 px-1  bg-primary-000 dark:bg-primaryDark-black rounded-t-xl lg:rounded-t-2xl top-0 fixed" @click="clicked(flag)">
            <a href="#" id="notification-close" @click="closed()" title="close">x</a>
            <div class="flex flex-row items-center no-underline text-black">
                <div class="me-2 w-8 sm:w-10 my-auto">
                    <img alt="Placeholder" class="rounded-md w-auto sm:h-10 h-8 cursor-pointer object-cover" width="50px" height="50px" src="@/assets/images/fbs_icon.png" >
                </div>
                
                <p class="ms-2 mt-1 text-sm flex-grow">
                    <span class="flex">
                        <ps-label class="truncate lg:text-sm text-xs font-medium" > {{title}} </ps-label>
                    </span>
                    <ps-label class=" font-medium text-xxs lg:text-xs " textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{subject}}  </ps-label>
                </p>
            </div>
        </div> 
    </div>
 
</template>

<script>
import firebase from "firebase/app";
import "firebase/messaging";
import router from '@/router';
import PsLabel from '@/components/core/label/PsLabel.vue';
import { createProductProviderState } from '@/store/modules/item/ProductProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import PsConst from '@/object/constant/ps_constants';

export default {
    name: "PsNotificationBox",

    components: {
        PsLabel
    },
 
    data() {
        
        return {
            title: "Test",
            subject: "Test",
            flag: "Test",
            messaging: firebase.messaging.isSupported() ? firebase.messaging() : null,
            currentMessage: "Test",
            requireInteraction: true,
            notify: false,
        };
    },

    methods: {
        closed(){
            this.notify = false;
        },
        async clicked(value){
            if(value == 'fe_broadcast') {
                router.push({ name : "notification-list"});
            }
            if(value == 'review') {
                router.push({name : 'review-list', query: { user_id: localStorage.loginUserId } });
            }
            if(value == 'chat' || value == 'bought') {
                const itemProvider = createProductProviderState();
                const psValueHolder = PsValueProvider.psValueHolder;
                const loginUserId = psValueHolder.getLoginUserId();
                const itemId = this.currentMessage.data.item_id;
                const item = await itemProvider.loadItem(itemId, loginUserId);
                let chatFlag = PsConst.CHAT_FROM_BUYER.toString();
                if(loginUserId == this.currentMessage.data.buyer_id){
                    chatFlag = PsConst.CHAT_FROM_SELLER.toString();
                }
                router.push({
                    name : 'chat', 
                    query: { 
                        buyer_user_id : this.currentMessage.data.buyer_id,
                        seller_user_id : this.currentMessage.data.seller_id,
                        item_name : item.data.title ,
                        item_id : this.currentMessage.data.item_id,
                        item_image_name : item.data.defaultPhoto.imgPath,
                        item_price : item.data.price,
                        currency : item.data.itemCurrency.currencySymbol,
                        condition : item.data.conditionOfItem.name,
                        chat_flag : chatFlag

                    }
                });
            }
            if(value == "subscribe") {
                const itemProvider = createProductProviderState();
                const psValueHolder = PsValueProvider.psValueHolder;
                const loginUserId = psValueHolder.getLoginUserId();
                const itemId = this.currentMessage.data.item_id;
                const item = await itemProvider.loadItem(itemId, loginUserId);
                router.push({
                    name: 'item',
                    params: {
                        itemName: item.data.title.split(' ').join('-').toLowerCase(), 
                    },
                    query: {
                        item_id: this.currentMessage.data.item_id,
                        item_name: item.data.title.split(' ').join('-').toLowerCase()
                    }
                });
               
            }
          
        },
        receiveMessage() {
            try {
                if(!this.messaging) return;
                this.messaging.onMessage((payload) => {
                    // debugger
                    this.currentMessage = payload;
                    console.log("Message received. ", this.currentMessag);
                   
                    this.setNotificationBoxForm(
                        payload.notification.title,
                        payload.notification.body,
                        payload.data.flag,
                    );
                   
                    this.notify = true;
                    setTimeout(() => {
                        this.notify = false;
                    }, 10000);
                });

            } catch (e) {
                console.log(e);
            }
        },
      
        setNotificationBoxForm(title, subject, flag) {
            this.title = title;
            this.subject = subject;
            this.flag = flag;
        },
    },

    created() {
        this.receiveMessage();
    },

    validations: function () {
        return {};
    },

    computed: {},
};
</script>

<style>
#notification-box {
    display: flex;
    position: absolute;
    right: 5px;
    height: 100px;
    background-color: #fff;
    z-index: 1;
    border: 1px dotted black;
    border-radius: 12px;
}
#notification-close {
    position: absolute;
    color: #777;
    font: 14px;
    right: 10px;
    text-decoration: none;
    text-shadow: 0 1px 0 #fff;
    top: 6px;
    z-index: 10;
    cursor: pointer;
}

img{
    width: 50px;
}
</style>