import { useEffect, useState } from "react";
import "./App.css";
import { CiPlay1 } from "react-icons/ci";
import { CgPlayPause } from "react-icons/cg";

function App() {

   //initialize the state variables 
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [inputMin, setInputMin] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (isActive) {
      interval = setInterval(() => {
        const remainingHours = Math.floor(totalSeconds / 3600);
        // totalSeconds = totalSeconds%3600;
        const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;

        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
        totalSeconds--;
       
        //all the states are reset to their initial values and alert is shown.
        if (totalSeconds < 0) {
          clearInterval(interval);
          alert("Countdown finished!");
          setSeconds(0);
          setHours(0);
          setMinutes(0);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive,minutes]);

 

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset=()=>{
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
  }


  //here I have implemented the debounce function which is used to delay the updates of the given inputs
  useEffect(()=>{
      
    let debouncer=setTimeout(()=>{
      
      setHours(0);
      setSeconds(0);
     
      setMinutes(inputMin);
    },500)

    return ()=>{
      clearTimeout(debouncer);
    }

  },[inputMin]);


  // here I have halndle the updates of the inputs
  const handleOnChange = (e) => {
    setInputMin( e.target.value);
   
  };

  return (
    <div className="flex justify-center flex-col space-y-14 items-center w-full h-screen">
      <div className="space-y-4 flex flex-col w-96 ">
        <label htmlFor="inputValue" className="text-lg font-semibold text-blue-400">Enter minutes</label>
        <input
          type="numeric"
          name="minutes"
          value={inputMin}
          id="inputValue"
          className="border p-2 bg-blue-300 text-lg rounded-md text-white outline-none border-blue-400"
          onChange={handleOnChange}
        />
      </div>
      <div className="space-x-10  flex justify-center items-center">
        <div className="space-x-3">
        
        <button
          className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 "
          onClick={handleToggle}
        >
          { !isActive?<CiPlay1/>:<CgPlayPause/>}
        </button>
        </div>
        <div className="">
          <p className="font-bold text-3xl text-blue-400 ">
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
        </div>
        <button
          className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 "
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
