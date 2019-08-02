<template>
    <div class="stocks-component row">
        <div v-for="stock in stocks" :key="stock.id" class="col-sm-6">
            <stock-element :stock="stock" :owned="owned"></stock-element>
        </div>
    </div>
</template>

<script>
import stockElement from './StockElement.vue'

export default {
    data(){
        return {
            owned: false
        }
    },
    computed: {
        stocks(){
            return this.$store.state.stocks
        }
    },
    components: {
        stockElement
    }
}
</script>

<style>

</style>
