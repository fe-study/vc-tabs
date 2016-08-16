<template>
    <div role="tabpanel" class="tab-pane"
        :class="{hide: !show}"
        v-show="show"
        :transition="transition"
    >
        <slot></slot>
    </div>
</template>

<style>
.tab-content > .tab-pane {
    display: block;
}
</style>

<script>
const COMPONENT_NS = 'TAB'

export default {
    props: {
        header: { // tab标题
            type: String
        },
        id: { // 可传入id,关闭$parent的autoIndex来用外界传入的index做tab的渲染,高级用法，一般无需使用
            type: [String, Number]
        },
        disabled: { // 不响应点击事件，达到不会切换tab的disabled效果
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            index: -1 // 初始化内部index
            // show: false // 初始不显示
        }
    },
    computed: {
        show: function () { // active时才显示
            return (this.$parent.active == this.index)
        },
        transition: function () { // 动画模式
            return this.$parent.effect
        }
    },
    created: function () {
    },
    ready: function () {
        // 内部自增index
        if (this.$parent.autoIndex) {
            this.index = this.$parent.index
            this.$parent.index++
        } else {
            // 强设index
            this.index = this.id
        }

        // 给parent壮哉渲染数据
        this.$parent.renderData.push({
            index: this.index + '',
            header: this.header,
            disabled: this.disabled
        })

        var msg = {
            action: 'newTabDone',
            data: {
                val: this.header,
                id: this.id
            }
        }
        this.$dispatch(COMPONENT_NS, msg, this.$parent.name)
    },
    beforeDestroy: function () {
        // 去除渲染数据，达到响应式
        this.$parent.renderData.forEach(function (item, index) {
            if (item.index == this.index) {
                this.$parent.renderData.splice(index, 1)
            }
        }.bind(this));
    },
    watch: {
        'header': function (val) {
            if (this.$parent.autoIndex) {
                this.$parent.renderData[this.index].header = val
            } else {
                var idx = -1
                var data = this.$parent.renderData
                for (var i = 0, len = data.length; i < len; i++) {
                    if (parseInt(data[i].index, 10) === parseInt(this.index, 10)) {
                        idx = i
                    }
                }
                this.$parent.renderData[idx].header = val
            }
            var msg = {
                action:  'headerChange',
                data: {
                    val: val,
                    id: this.id
                }
            }
            this.$dispatch(COMPONENT_NS, msg, this.$parent.name)
        }
    }
}
</script>
