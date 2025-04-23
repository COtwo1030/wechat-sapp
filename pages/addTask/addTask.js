Page({
  data: {
    today: '',
    date: ''
  },

  onLoad() {
    this.setToday()
  },

  // 设置当前日期作为默认值
  setToday() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    this.setData({
      today: `${year}-${month}-${day}`,
      date: `${year}-${month}-${day}`
    })
  },

  // 日期选择变化
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  // 保存任务
  saveTask(e) {
    const { name, date } = e.detail.value
    if (!name || !date) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    // 获取现有任务
    const tasks = wx.getStorageSync('tasks') || []
    
    // 添加新任务
    tasks.push({
      id: Date.now().toString(),
      name,
      date,
      completed: false
    })

    // 保存到本地存储
    wx.setStorageSync('tasks', tasks)
    
    // 返回首页
    wx.navigateBack()
  }
})
