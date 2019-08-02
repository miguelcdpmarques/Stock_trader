import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        funds: 12000,
        stocks: [
            {id: 1, name: 'BMW', price: 50},
            {id: 2, name: 'Google', price: 120},
            {id: 3, name: 'Apple', price: 220},
            {id: 4, name: 'Twitter', price: 60}
        ],
        portfolio: [],
    },
    getters: {
        getStock(state) {
            return name => state.stocks.filter(stock => stock.name == name)
        },
        getStockPrice(state, getters) {
            return name => getters.getStock(name)[0].price
        },
        getPortfolio(state) {
            return name => state.portfolio.filter(stock => stock.name == name)
        },
        getStockQuantityInPortfolio(state, getters) {
            return name => getters.getPortfolio(name)[0].quantity
        }
    },
    actions: {
        updateStockPrices({state, commit}) {
            state.stocks.forEach((stock) => {
                let random = 1 + (Math.random()-0.5)*0.2
                stock.price = Math.round(stock.price * random)
                commit('setStockPrice', {name: stock.name, price: stock.price})
            })
        },
        buyStock({state, getters, commit}, payload) {
            let transactionDetails = {
                name: payload.name, 
                quantity: payload.quantity,
                price: getters.getStockPrice(payload.name)
            }
            let stockInPortfolio = false
            if(state.portfolio) {
                stockInPortfolio = Boolean(getters.getPortfolio(payload.name)[0])
            } else {
                commit('initPortfolio')
            }
            if(stockInPortfolio){
                console.log("Stock in portfolio. Increasing quantity.")
                commit('incrementStockQuantityInPortfolio', transactionDetails)
            } else {
                console.log("Stock not in portfolio. Initializing stock.")
                commit('addStockToPortfolio', {name: payload.name, quantity: payload.quantity})
            }
            commit('decreaseFunds', transactionDetails)
            console.log('Funds removed from account.')
        },
        sellStock({getters, commit}, payload) {
            let transactionDetails = {
                name: payload.name, 
                quantity: payload.quantity,
                price: getters.getStockPrice(payload.name)
            }
            if(payload.quantity == getters.getStockQuantityInPortfolio(payload.name)) {
                commit('removeStockFromPortfolio', transactionDetails)
            } else {
                commit('decreaseStockQuantityInPortfolio', transactionDetails)
            }
            commit('increaseFunds', transactionDetails)
        },
        saveData({state, commit}) {
            axios.put('https://vue-http-8f5eb.firebaseio.com/data.json', state)
            .then(response => {
                console.log('Saved successfully')
            })
            .catch(error => console.log('Error', error))
        },
        loadData({state, commit}) {
            axios.get('https://vue-http-8f5eb.firebaseio.com/data.json')
            .then(response => {
                commit('loadFromDatabase', response.data)
            })
            .catch(error => console.log('Error:', error))
        }
    },
    mutations: {
        initPortfolio(state){
            state.portfolio = []
        },
        incrementStockQuantityInPortfolio(state, payload){
            let pf = state.portfolio.filter(stock => stock.name == payload.name)
            pf[0].quantity += parseInt(payload.quantity)
        },
        decreaseStockQuantityInPortfolio(state, payload){
            let pf = state.portfolio.filter(stock => stock.name == payload.name)
            pf[0].quantity -= parseInt(payload.quantity)
        },
        decreaseFunds(state, payload) {
            state.funds = state.funds - (payload.quantity * payload.price)
        },
        increaseFunds(state, payload) {
            state.funds = state.funds + (payload.quantity * payload.price)
        },
        addStockToPortfolio(state, payload) {
            state.portfolio.push(payload)
        },
        removeStockFromPortfolio(state, payload) {
            state.portfolio = state.portfolio.filter((stock) => stock.name != payload.name)
        },
        setStockPrice(state, payload) {
            let stock = state.stocks.filter(stock => stock.name == payload.name)
            stock.price = payload.price
        },
        loadFromDatabase(state, payload) {
            state.funds = payload.funds
            state.stocks = payload.stocks
            state.portfolio = payload.portfolio
        }
    }
})