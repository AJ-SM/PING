import { Button } from "./Button";



export function InputBox({ref,onClick}) {
  return (
    <div className="flex absolute sticky bottom-3 my-3 p-2">
      <input
        type="  text"
        ref={ref}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        placeholder="Message"
        className=" font-mono p-3 flex border-2 border-gray-400 justify-center w-200 h-10 bg-[#343a40] tracking-normal ease-in duration-75  placeholder-[#adb5bd] text-white rounded-md mr-1 "
      />
      <Button text="Send" size="md" onClick={onClick} />
    </div>
  );
}
