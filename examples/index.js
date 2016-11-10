import Vue from 'vue'
import vcTabs from '../src/Tabs.vue'
const vcTab = vcTabs.vcTab

new Vue({
	el: '#app',
	data () {
		return {
            active: 0,
            trigger: 'hover',
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
        vcTabs,
        vcTab
	}
})
