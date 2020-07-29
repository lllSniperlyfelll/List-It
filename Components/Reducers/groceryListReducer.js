import {
  CREATE_NEW_GROCERY_LIST,
  DETELE_GROCERY_LIST,
  INIT_GROCERY_LIST,
} from '../Actions/ActionTypes';

initalState = {
  groceryLists: [
    {
      id: 1,
      name: 'Grocery list 1 ',
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
      name: 'Grocery list 2 ',
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

export default function (state = initalState, actions) {
  switch (actions.type) {
    case INIT_GROCERY_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_NEW_GROCERY_LIST:
      const uuid = Object.keys(state.groceryLists).length + 5;

      return {
        ...state,
        groceryLists: actions.payload,
        isLoading: false,
      };

    case DETELE_GROCERY_LIST:
      return {
        ...state,
        groceryLists: state.groceryLists.filter(
          (item) => item.id !== actions.payload,
        ),
      };
    default:
      return state;
  }
}
