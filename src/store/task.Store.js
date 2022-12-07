
import { makeAutoObservable } from 'mobx'
class TaskStore {
  list = [
    {
      id: 1,
      name: '学习react',
      isDone: false
    },
    {
      id: 2,
      name: '搞定mobx',
      isDone: false
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
  //单选功能
  singleCheck (id, isDone) {
    //找到修改的对象再进行更新isDone属性
    const item = this.list.find(item => item.id === id)
    item.isDone = isDone
  }
  allCheck (checked) {
    //直接遍历更新isDone属性(核心功能实现)
    this.list.forEach(item => {
      item.isDone = checked
    })
  }
  //计算选中状态？
  get isAll () {
    return this.list.every(item => item.isDone)
  }
  delTask = (id) => {
    this.list = this.list.filter(item => item.id !== id)
  }
  addTask = (task) => {
    this.list.push(task)
  }
  get isFinishedLength () {
    return this.list.filter(item => item.isDone).length
  }
}
export default TaskStore
