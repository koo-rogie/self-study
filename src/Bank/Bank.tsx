import { useReducer, useState } from "react";

interface BankAction {
  type: "예금" | "출금";
  payload: number;
}
// reducer - state를 업데이트하는 역할
// dispatch - state 업데이트를 위한 요구
// action - 요구의 내용
const reducer = (state: number, action: BankAction) => {
  console.log("reducer가 일을 함", state, action);
  switch (action.type) {
    case "예금":
      return state + action.payload;

    case "출금":
      return state - action.payload;

    default:
      return state;
  }
  //
};

function Bank() {
  const [number, setNumber] = useState(0);
  const [money, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <h2>useRebucer 은행에 오신것을 환영합니다</h2>
      <p>잔고: {money}원</p>
      <input
        type="number"
        value={number}
        onChange={(e) => {
          setNumber(parseInt(e.target.value));
        }}
        step="1000"
      />
      <button
        onClick={() => {
          dispatch({ type: "예금", payload: number });
        }}
      >
        예금
      </button>
      <button
        onClick={() => {
          dispatch({ type: "출금", payload: number });
        }}
      >
        출금
      </button>
    </>
  );
}

export default Bank;
