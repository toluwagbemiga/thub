<template>
    <div class="relative inline-block  text-left text-secondary-500 " ref="dropdown" >
        <div @click="clicked"  >
            <slot name="select"   />                
        </div>
            <transition
                enter-active-class="transition ease-out duration-100"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <div v-if="isMenuOpen" 
                
                    class="absolute mt-2 rounded-md shadow-lg text-sm overflow-hidden border z-20 overflow-y-scroll bg-background dark:bg-backgroundDark"
                    :class="[align == 'right' && psValueHolder.languageCode != 'ar' ? 'origin-top-right right-0' : 'origin-top-left left-0', h]">
                        <div class="flex flex-col">
                            <slot name="filter" />
                            <div @click="isMenuOpen = !isMenuOpen" > 
                                <slot name="list"  />
                            </div>
                            <slot name="loadmore" />
                        </div>
                </div>
                <!--  -->
            </transition>
        
    </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';

export default {
    name:"PsDropdown",
    props: {
        align : { 
            type : String,
            default : 'right'
        },
        h: {
            type : String,
            default : ' h-56 '
        }        
    },
    emits : [
        'on-click'
    ],
    setup(_, { emit }) {

        const psValueHolder = PsValueProvider.psValueHolder;
        
        const isMenuOpen = ref(false);
        function hide() {
            if(isMenuOpen.value) {
                isMenuOpen.value = !isMenuOpen.value;
            }
        }
        
        const dropdown = ref();
        function close(e) {
            if(!dropdown.value.contains(e.target)) {
                hide();
            }
        }

        onMounted(() => {
            document.addEventListener('click', close)
        });

        onUnmounted(() => {
            document.removeEventListener('click', close)
        });

        function clicked() {
            
            isMenuOpen.value = !isMenuOpen.value;
            emit('on-click');
            
        }

        return {
            isMenuOpen,
            dropdown,
            hide,
            clicked,
            psValueHolder
        }
    }
}
</script>