import Home from './components/Home.vue'
import Portfolio from './components/Portfolio.vue'
import Stocks from './components/Stocks.vue'

export const routes = [
    {path: '/', component: Home, name: 'home'},
    {path: '/portfolio', component: Portfolio, name: 'portfolio'},
    {path: '/stocks', component: Stocks, name: 'stocks'},
]