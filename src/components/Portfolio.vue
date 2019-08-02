<template>
    <div class="stocks-component row">
        <div v-if="isTherePortfolio" v-for="stock in portfolio" class="col-sm-6">
            <stock-element :stock="stock" :owned="owned"></stock-element>
        </div>
        <div class="col-sm-6" v-if="!isTherePortfolio">
            <p>There is currently no stock in the Portfolio.</p>
        </div>
    </div>
</template>

<script>
import stockElement from './StockElement.vue'

export default {
    data(){
        return {
            owned: true
        }
    },
    computed: {
        portfolio() {
            return this.$store.state.portfolio
        },
        isTherePortfolio() {
            if(this.$store.state.portfolio == undefined) {
                return false
            } 
            return this.$store.state.portfolio.length > 0
        }
    },
    components: {
        stockElement
    }
}
</script>

<style>

</style>
