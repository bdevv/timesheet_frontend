import React from "react";
const DialButton = ({ text, handleInput }) => {
  return (
    <button
      className="w-[50px] h-[50px] bg-slate-700 text-white hover:bg-slate-500 col-span-1 rounded-full"
      onClick={() => handleInput(text)}
    >
      {text}
    </button>
  );
};
const DialPadComponent = ({ handleInput }) => {
  return (
    <div className="w-[180px] h-[240px] grid grid-cols-3 gap-4">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
        (item, index) => (
          <DialButton text={item} handleInput={handleInput} key={index} />
        )
      )}
    </div>
  );
};

export default DialPadComponent;
