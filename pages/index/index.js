Page({
  data: {
    currentDate: '',
    tasks: []
  },

  onLoad() {
    this.setCurrentDate()
    this.loadTasks()
  },

  // 设置当前日期
  setCurrentDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    this.setData({
      currentDate: `${year}年${month}月${day}日`
    })
  },

  // 加载任务列表
  loadTasks() {
    const tasks = wx.getStorageSync('tasks') || []
    this.setData({ tasks })
  },

  // 打卡任务
  checkTask(e) {
    const id = e.currentTarget.dataset.id
    const tasks = this.data.tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    this.setData({ tasks }, () => {
      wx.setStorageSync('tasks', tasks)
      this.forceUpdate() // 强制更新视图
    })
  },

  // 跳转到添加任务页面
  navigateToAdd() {
    wx.navigateTo({
      url: '/pages/addTask/addTask'
    })
  },

  // 显示删除确认对话框
  showDeleteConfirm(e) {
    const id = e.currentTarget.dataset.id
    const task = this.data.tasks.find(t => t.id === id)
    
    wx.showModal({
      title: '删除任务',
      content: `确定要删除任务"${task.name}"吗？`,
      success: (res) => {
        if (res.confirm) {
          this.deleteTask(id)
        }
      }
    })
  },

  // 删除任务
  deleteTask(id) {
    const tasks = this.data.tasks.filter(task => task.id !== id)
    this.setData({ tasks })
    wx.setStorageSync('tasks', tasks)
    wx.showToast({
      title: '删除成功',
      icon: 'success'
    })
  }
})
