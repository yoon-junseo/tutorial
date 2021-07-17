import { createAction, ActionType, createReducer } from "typesafe-actions";

/**
 * 액션 타입 선언
 */
const ADD_TODO = "todos/ADD_TODO";
const TOGGLE_TODO = "todos/TOGGLE_TODO";
const REMOVE_TODO = "todos/REMOVE_TODO";

// let nextId = 1;

/**
 * 액션 생성 함수
 */
// export const addTodo = (text: string) => ({
//   type: ADD_TODO,
//   payload: {
//     id: nextId++,
//     text,
//   },
// });

// export const toggleTodo = (id: number) => ({
//   type: TOGGLE_TODO,
//   payload: id,
// });

// export const removeTodo = (id: number) => ({
//   type: REMOVE_TODO,
//   payload: id,
// });

export const addTodo = createAction(ADD_TODO)<Todo>();
// export const addTodo = createAction(
//   ADD_TODO,
//   (action) => (text: string) =>
//     action({
//       id: nextId++,
//       text,
//     })
// );
export const toggleTodo = createAction(TOGGLE_TODO, (id: number) => id)();
// export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();

// 모든 액션 객체들에 대한 타입 준비
// type TodosAction =
//   | ReturnType<typeof addTodo>
//   | ReturnType<typeof toggleTodo>
//   | ReturnType<typeof removeTodo>;
const actions = { addTodo, toggleTodo, removeTodo };
type TodosAction = ActionType<typeof actions>;

// 상태에서 사용 할 데이터 타입 정의
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export interface TodosState {
  todoList: Todo[];
}
// export interface TodosState {
//   todoList: {
//     id: number;
//     text: string;
//     done: boolean;
//   }[];
// }
// export type TodosState = Todo[];

// 초기상태
const initialState: TodosState = {
  todoList: [],
};

// 리듀서
// const todos = (
//   state: TodosState = initialState,
//   action: TodosAction
// ): TodosState => {
//   switch (action.type) {
//     case ADD_TODO:
//       return {
//         todoList: state.todoList.concat({
//           id: action.payload.id,
//           text: action.payload.text,
//           done: false,
//         }),
//       };
//     // return state.concat({
//     //   id: action.payload.id,
//     //   text: action.payload.text,
//     //   done: false,
//     // });
//     case TOGGLE_TODO:
//       return {
//         todoList: state.todoList.map((todo) =>
//           todo.id === action.payload ? { ...todo, done: !todo.done } : todo
//         ),
//       };
//     // return state.map((todo) =>
//     //   todo.id === action.payload ? { ...todo, done: !todo.done } : todo
//     // );
//     case REMOVE_TODO:
//       return {
//         todoList: state.todoList.filter((todo) => todo.id !== action.payload),
//       };
//     // return state.filter((todo) => todo.id !== action.payload);
//     default:
//       return state;
//   }
// };

const todos = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, action) => ({
    ...state,
    todoList: [...state.todoList, action.payload],
  }),
  [TOGGLE_TODO]: (state, { payload: id }) => ({
    ...state,
    todoList: state.todoList.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            done: !todo.done,
          }
        : todo
    ),
  }),
  [REMOVE_TODO]: (state, { payload: id }) => ({
    ...state,
    todoList: state.todoList.filter((todo) => todo.id !== id),
  }),
});

export default todos;
