interface IStudentProps {
  id: number;
  name: string;
  isHere: boolean;
  dispatch: React.Dispatch<{
    type: "삭제" | "출석";
    payload: { id: number };
  }>;
}

const Students = ({ name, dispatch, id, isHere }: IStudentProps) => {
  return (
    <div>
      <span
        style={{
          textDecoration: isHere ? "line-through" : "none",
          color: isHere ? "gray" : "#eee",
        }}
        onClick={() => {
          dispatch({ type: "출석", payload: { id } });
        }}
      >
        {name}
      </span>
      <button
        onClick={() => {
          dispatch({ type: "삭제", payload: { id } });
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Students;
