<template>
    <div class="stock-element-component card">
        <div class="card-header" 
            :class="{'bg-lightgreen': !owned, 'bg-lightblue': owned}">
            {{ stock.name }}
            <small>(Price: {{ getStockPrice(stock.name) }}<span v-if="owned"> | Quantity: {{ stock.quantity }}</span>)
            </small>
        </div>
        <div class="card-body">
            <form>
                <input v-model.number="quantity" class="form-control-sm" type="number" placeholder="Quantity">
                <button  
                    class="btn align-right" 
                    :class="owned ? 'btn-danger' : 'btn-success'"
                    @click.prevent="owned ? sellStock(stock) : buyStock(stock)">
                    {{ owned ? 'Sell' : 'Buy' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            quantity: 0,
        }
    },
    props: ['stock', 'owned'],
    computed: {
        ...mapGetters(['getStockPrice']),
        funds() {
            return this.$store.state.funds
        },
    },
    methods: {
        buyStock(stock) {
            let stockToPurchase = {
                name: stock.name, 
                quantity: this.quantity,
                price: this.getStockPrice(stock.name)
            }
            console.log('Validate if enough funds')
            if(this.funds >= (stockToPurchase.quantity * stockToPurchase.price)) {
                console.log('Buying stock', stockToPurchase.name)
                this.$store.dispatch('buyStock', stockToPurchase)
                this.quantity = 0
            } else {
                alert('Insufficient funds')
            }
        },
        sellStock(stock) {
            console.log('Selling stock', stock.name)
            let stockToSell = {
                name: stock.name,
                quantity: this.quantity,
                price: this.$store.getters.getStockPrice(stock.name)
            }
            if(stock.quantity >= this.quantity) {
                this.$store.dispatch('sellStock', stockToSell)
                this.quantity = 0
            } else {
                alert("You don't have that stock quantity available to sell.")
            }
        }
    }    
}

</script>

<style>
.stock-element-component {
    margin: 1rem;
}
.align-right {
    float: right;
}
.bg-lightgreen {
    background-color: rgba(0, 255, 0, 0.2);
}
.bg-lightblue {
    background-color: rgba(178, 229, 245, 0.2);
}
</style>
