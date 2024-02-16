const Message = ({ children, color }) => {
  return (
    <>
      {color == "blue" && (
        <div
          className={`bg-blue-200 text-blue-700 border-blue-500 rounded border p-3 w-full`}
        >
          {children}
        </div>
      )}

      {color == "red" && (
        <div
          className={`bg-red-200 text-red-700 border-red-500 rounded border p-3 w-full`}
        >
          {children}
        </div>
      )}

      {color == "green" && (
        <div
          className={`bg-green-200 text-green-700 border-green-500 rounded border p-3 w-full`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Message;
