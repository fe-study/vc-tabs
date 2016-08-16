<template>
    <div :data-name="name">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li
                v-for="r in renderData"
                :class="{
                    'active': (r.index == active),
                    'disabled': r.disabled
                }"
                @click.prevent="handleTabListClick(r.index, r)"
                :disabled="r.disabled"
            >
                <a href="#">  
                    <slot name="header"> 
                        {{{ r.header }}}
                    </slot> 
                </a>
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
    margin-bottom: 15px
}
</style>

<script>
export default {
    props: {
        name: String,
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
        handleTabListClick: function (index, el) {
            if (!el.disabled) this.active = index
        }
    }
}
</script>
