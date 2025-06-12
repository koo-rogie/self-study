import { useReducer, useState } from "react";
import Students from "./Students";

interface IStudent {
  id: number;
  name: string;
  isHere: boolean;
}

interface IState {
  count: number;
  students: IStudent[];
}

type Action = { type: "추가"; payload: { name: string } } | { type: "삭제"; payload: { id: number } } | { type: "출석"; payload: { id: number } };

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "추가": {
      const name = action.payload.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: false,
      };
      return {
        count: state.count + 1,
        students: [...state.students, newStudent],
      };
    }
    case "삭제":
      return {
        count: state.count - 1,
        students: state.students.filter((student) => student.id !== action.payload.id),
      };
    case "출석":
      return {
        count: state.count,
        students: state.students.map((students) => {
          if (students.id === action.payload.id) {
            return { ...students, isHere: !students.isHere };
          }
          return students;
        }),
      };
    default:
      return state;
  }
};

const inittalState = {
  count: 0, // 초기값
  students: [],
};

function Attendance() {
  const [name, setName] = useState("");
  const [studentInfo, dispatch] = useReducer(reducer, inittalState);

  return (
    <>
      <h2>출석부</h2>
      <p>총학생수: {studentInfo.count}</p>
      <input
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch({ type: "추가", payload: { name } });
        }}
      >
        추가
      </button>
      {studentInfo.students.map((students) => {
        return <Students key={students.id} name={students.name} dispatch={dispatch} id={students.id} isHere={students.isHere} />;
      })}
    </>
  );
}

export default Attendance;
