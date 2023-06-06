<template>
    <div class="flex items-center">
        <div @click="rate(star)" v-for="star in maxStars" :class="{ 'active': star <= stars }" :key="star" class="star">  
            <font-awesome-icon :icon="['fas', 'star']" v-if="star <= stars" class="text-primary-500 dark:text-primaryDark-accent " size="lg" />
            <font-awesome-icon :icon="['far', 'star']" v-else class="text-primary-500 dark:text-primaryDark-accent  " size="lg" />
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as farSrar } from '@fortawesome/free-solid-svg-icons';
library.add(fasStar, farSrar)

export default {
    name: 'RatingSelected',
    components : {
       
    },
    props: {
        'grade': {
            type : Number,
            default : 0
        },  
        'maxStars': {
            type : Number,
            default : 0
        }, 
        'hasCounter': {
            type : Boolean,
            default : true
        }, 
    },
    data() {
        return {
            stars: this.grade
        }
    },
    methods: {
        rate(star) {
            if (typeof star === 'number' && star <= this.maxStars && star >= 0) {
                this.stars = this.stars === star ? star - 1 : star;
            }
        },
        getRating() {
            return this.stars;
        }
    },
}
</script>