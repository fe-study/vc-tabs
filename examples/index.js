import Vue from 'vue'
import { vcTabset, vcTab } from '../dist/build.js'

new Vue({
	el: '#app',
	data () {
		return {
            active: 0,
            autoIndex: true,
            renderData: null,
            header0: 'header0',
            header1: 'header1',
            header2: 'header2'
		}
	},
    ready () {
        this.renderData = this.$refs.tabs.renderData
    },
    methods: {
        deleteTheTab () {
            this.renderData.splice(0, 1)
        }
    },
	components: {
        vcTabset,
        vcTab
	}
})
