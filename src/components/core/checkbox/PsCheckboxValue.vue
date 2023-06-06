<template>
    <ps-label class="select-none inline-flex items-center">  
        <input type="checkbox" 
        class="form-checkbox me-2 checked:bg-primary-500 dark:bg-primaryDark-accent" 
        :id="title" :checked="value" 
        @input="handleInput($event.target.checked)" />
        {{title}}
    </ps-label>
</template>

<script lang='ts'>
import PsLabel from "../label/PsLabel.vue";

export default {    
    name: "PsCheckboxValue",
    components: { PsLabel },
    props: {
        "value" : Boolean,
        "title" : {
            type : String,
            default : "N.A"
        }
    },
    setup(_, { emit }) {
        
        function handleInput(v) {                
            emit('update:value', v);
        }

        return {
            handleInput
        }
    }
}
</script>
