/**
 *  @Vue Component - Tab
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Date   : Mon 09 May 2016 09:11:33 PM CST
 *  Version: 0.3.1
 *
 *  @changelog
 *  0509@v0.0.1: init, 从vueStrap拿来主义
 *  0511@v0.1.0: 发现tab删减不响应bug,改成beforeDestroy时会去除$parent的renderData的最后一个数据
 *  0512@v0.2.0: 加入autoIndex属性，默认为false,只有前后台需要tabId共享时才需要设置为true,关闭内部的index自增特性
 *  0802@v0.3.0: 语义看起来相反了，将autoIndex改为默认true,即利用内部的自增index,需要前后端共享才关闭内部自增特性
 *  0802@v0.3.1: 注释添加，代码整理，代码格式优化
 *
 */
