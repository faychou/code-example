export interface StateProps {
  id: number;
  text: string;
  isFinished: boolean;
}

export interface ActionProps {
  type: string;
  [key: string]: any;
}

const redecer  = (state: StateProps[], action: ActionProps) => {
  switch(action.type) {
    case 'ADDTODO':
      return [...state, action.todo];
    case 'CHANGEFINISHE':
      return state.map(item => {
        if(item.id === action.id) {
          return Object.assign({}, item, {
            isFinished: !item.isFinished
          });
        }
        return item;
      });
    default:
      return state;
  }
};

export default redecer;