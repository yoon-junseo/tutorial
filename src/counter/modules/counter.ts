import { createAction, ActionType, createReducer } from "typesafe-actions";

/**
 * 액션 타입
 */
// const INCREASE = "counter/INCREASE" as const;
// const DECREASE = "counter/DECREASE" as const;
// const INCREASE_BY = "counter/INCREASE_BY" as const;
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_BY = "counter/INCREASE_BY";

/**
 * 액션 생성 함수
 */
// export const increase = () => ({
//   type: INCREASE,
// });

// export const decrease = () => ({
//   type: DECREASE,
// });

// export const increaseBy = (diff: number) => ({
//   type: INCREASE_BY,
//   payload: diff,
// });

export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>(); // payload 타입을 제네릭으로 설정

// 모든 액션 객체들에 대한 타입
// type CounterAction =
//   | ReturnType<typeof increase>
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy>;

const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

// 리덕스 모듈에서 관리 할 상태의 타입
interface CounterState {
  count: number;
}

// 초기상태
const initialState: CounterState = {
  count: 0,
};

// 리듀서
// const counter = (
//   state: CounterState = initialState,
//   action: CounterAction
// ): CounterState => {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         count: state.count + 1,
//       };
//     case DECREASE:
//       return {
//         count: state.count - 1,
//       };
//     case INCREASE_BY:
//       return {
//         count: state.count + action.payload,
//       };
//     default:
//       return state;
//   }
// };
const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state) => ({ count: state.count + 1 }),
  [DECREASE]: (state) => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, { payload: number }) => ({
    // ...state,
    count: state.count + number,
  }),
});

export default counter;
