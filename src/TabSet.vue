<template>
    <div :data-name="name">
        <!-- Nav tabs -->
        <ul v-el:header class="nav nav-tabs" role="tablist">
            <li
                v-for="r in renderData"
                :class="{
                    'tabset-list-item': true,
                    'active': (r.index == active),
                    'disabled': r.disabled
                }"
                @click.prevent="handleTabListClick(r.index, r)"
                @mouseover.prevent="handleTabListMouseover(r.index, r)"
                :disabled="r.disabled"
            >
                <a href="#">  
                    <slot name="header"> 
                        {{{ r.header }}}
                    </slot> 
                </a>
                <span v-if="r.index == active && removeable" @click="remove(r)" class="remove-tab">&times;</span>
            </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content" v-el:tab-content>
            <slot></slot>
        </div>
    </div>
</template>

<style>
.nav-tabs {
    margin-bottom: 15px;
}
.nav-tabs .remove-tab {
    position: absolute;
    top: -3px;
    right: 5px;
    font-size: 16px;
    opacity: .5;
    cursor: pointer;
}
.tabset-list-item:hover,
.tabset-list-item:focus {
    background-color: #fff;
    outline: none;
}
.tabset-list-item a:focus,
.tabset-list-item a:hover {
    background-color: #fff;
    border-color: #fff;
    outline: none;
}
</style>

<script>
export default {
    name: 'vc-tabSet',
    props: {
        name: String,
        removeable: {
            type: Boolean,
            default: false
        },
        trigger: {
            type: String,
            default: 'click'
        },
        delay: {
            type: [Number, String],
            default: 120 
        },
        effect: {
            type: String,
            default: 'fadein'
        },
        active: {
            type: [Number, String],
            default: 0
        },
        autoIndex: {
            type: Boolean,
            default: true 
        }
    },
    data: function () {
        return {
            renderData: [],
            index: 0,
        }
    },
    methods: {
        remove (tabItem) {
            this.renderData.$remove(tabItem)
        },
        handleTabListClick: function (index, el) {
            if (this.trigger === 'click') {
                if (!el.disabled) this.active = index
            }
        },
        handleTabListMouseover: function (index, el) {
            if (this.trigger === 'hover') {
                var oldTriggerId = this.triggerId
                clearTimeout(oldTriggerId)
                this.triggerId = setTimeout(() => {
                    if (!el.disabled) this.active = index
                }, this.delay)
            }
        }
    }
}
</script>
