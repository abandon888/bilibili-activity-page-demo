
import { makeAutoObservable } from 'mobx'
class TaskStore {
  list = [
    {
      id: 1,
      name: '学习react',
      address: "南昌"
    },
    {
      id: 2,
      name: '搞定mobx',
      address: "昌南"
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
  delTask = (id) => {
    this.list = this.list.filter(item => item.id !== id)
  }
  addTask = (task) => {
    this.list.push(task)
  }
}
export default TaskStore
