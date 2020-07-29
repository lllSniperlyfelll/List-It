import {
  CREATE_NEW_TODO_LIST,
  DETELE_TODO_LIST,
  INIT_TODO_LIST,
} from '../Actions/ActionTypes';

initState = {
  todoLists: [
    {
      id: 1,
      name: 'Todo list 1 ',
      listItems: [
        {
          id: 1,
          name:
            'item item itemitemitemitem itemitemitemitem temitemitem itemitemitemitem',
          description: 'some discreption to the given item',
        },
        {
          id: 3,
          name: 'item',
          description: 'some discreption to the given item',
        },
        {
          id: 4,
          name: 'item',
          description: 'some discreption to the given item',
        },
      ],
    },
    {
      id: 2,
      name: 'Todo list 2 ',
      listItems: [
        {
          id: 1,
          name:
            'item item itemitemitemitem itemitemitemitem temitemitem itemitemitemitem',
          description: 'some discreption to the given item',
        },
        {
          id: 3,
          name: 'item',
          description: 'some discreption to the given item',
        },
        {
          id: 4,
          name: 'item',
          description: 'some discreption to the given item',
        },
      ],
    },
  ],
  isLoading: false,
};

export default function (state = initState, actions) {
  switch (actions.type) {
    case INIT_TODO_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_NEW_TODO_LIST:
      //const uuid = Object.keys(state.todoLists).length + 5;
      //console.log(JSON.stringify(actions.payload));
      return {
        ...state,
        todoLists: [...state.todoLists, actions.payload],
        isLoading: false,
      };

    case DETELE_TODO_LIST:
      return {
        ...state,
        todoLists: state.todoLists.filter(
          (item) => item.id !== actions.payload,
        ),
      };
    default:
      return state;
  }
}
