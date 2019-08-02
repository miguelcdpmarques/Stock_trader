<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-component">
        <router-link class="navbar-brand" :to="{name: 'home'}">Stock Trader</router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'portfolio'}">Portfolio</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'stocks'}">Stocks</router-link>
                </li>
            </ul>
        </div>
        <div class="navbar-right">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" @click="updatePrices">End Day</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Save and Load
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item nav-link" @click="saveData">Save Data</a>
                    <a class="dropdown-item nav-link" @click="loadData">Load Data</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Funds: ${{ funds | formatNumber }}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'

export default {
    computed: {
        funds() {
            return this.$store.state.funds
        }
    },
    methods: {
        updatePrices() {
            this.$store.dispatch('updateStockPrices')
        },
        saveData() {
            const config = {
                headers: {
                    'Accept': 'application/json'
                }
            }
            this.$store.dispatch('saveData')
        },
        loadData() {
            this.$store.dispatch('loadData')
        }
    },
}
</script>

<style>
.navbar-component {
    border: 1px solid lightgray;
    margin-bottom: 2rem;
}
.nav-link {
    cursor: pointer;
}
</style>
