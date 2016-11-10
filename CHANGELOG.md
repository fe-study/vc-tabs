<h1 align="center">vc-tabs - @changelog</h1>

## 0.5.0

`2016-10-17`

- 子组件挂载化: `vcTabs.vcTab`

## 0.4.0

`2016-08-23`

- 增加 `trigger` 属性，点击切换or悬浮切换

## 0.3.1

`2016-08-02`

- 注释添加，代码整理，代码格式优化

## 0.3.0

`2016-08-02`

- 语义看起来相反了，将autoIndex改为默认true,即利用内部的自增index,需要前后端共享才关闭内部自增特性

## 0.2.0

`2016-05-12`

- 加入autoIndex属性，默认为false,只有前后台需要tabId共享时才需要设置为true,关闭内部的index自增特性

## 0.1.0

`2016-05-11`

- 发现tab删减不响应bug,改成beforeDestroy时会去除$parent的renderData的最后一个数据

## 0.0.1

`2016-05-09`

- init 从vueStrap拿来主义

