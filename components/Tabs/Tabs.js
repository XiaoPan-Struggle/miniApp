// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type: Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap (e) {
      const { index } = e.currentTarget.dataset

      // 子向父传递数据由事件传递
      // 触发父组件中的自定义事件 同时传递数据给父组件
      this.triggerEvent("ItemChange",{index})
    }
  }
})