import { makeAutoObservable, makeObservable, observable, action, runInAction } from "mobx";

export interface StateProps {
  id: number;
  text: string;
  isFinished: boolean;
}

class TodoStore {
  todoList: StateProps[] = [];

  constructor() {
    // 自动将普通对象转化为可观察对象
    makeAutoObservable(this);

    // makeObservable(this, {
    //   todoList: observable,
    //   addAction: action,
    //   changeAction: action
    // })
  }

  addAction(todo: StateProps) {
    this.todoList.push(todo);
  }

  // async addAsyncAction(todo: StateProps) { // 异步操作
  //   const result: StateProps = await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(todo)
  //     }, 1000)
  //   });

  //    // 获取数据后，将赋值操作放到 runInAction 中
  //    runInAction(() => {
  //     this.todoList.push(result);
  //   });
  // }

  changeAction = (id: number) => { // 解决调用时 store 解构出现 this 报 undefined 的错误
    this.todoList = this.todoList.map(item => {
      if(item.id === id) {
        return Object.assign({}, item, {
          isFinished: !item.isFinished
        });
      }
      return item;
    })
  }
}

export default new TodoStore();