import { useState, useRef, useEffect } from "react"
import { BsThreeDots } from "react-icons/bs";

enum STATES {
    INIT,
    GREEN,
    WAITFORGREEN,
    TOOSOON,
    RESULTS,
}
function MainGame() { 
    const [state, setState] = useState(STATES.INIT)
    const counter = useRef(0);
    const timeAtClick = useRef(0);

    useEffect(()=>{ //when state is CHANGED to this, it will run this code once
        if(state === STATES.WAITFORGREEN){
            setTimeout(()=>{setState(STATES.GREEN); counter.current = Date.now();},Math.random()*8000 + 2000) //2-10s
        }
    },[state])

    const handleClick = () => {
        switch (state){
            case STATES.INIT:
                setState(STATES.WAITFORGREEN);
                break;
            case STATES.WAITFORGREEN:
                    setState(STATES.TOOSOON)
                break;
            case STATES.TOOSOON:
                setState(STATES.WAITFORGREEN);
                break;
            case STATES.GREEN:
                timeAtClick.current = Date.now() - counter.current
                setState(STATES.RESULTS);
                break;
            case STATES.RESULTS:
                setState(STATES.WAITFORGREEN)
                break;
            default:
                break;
        }
    }

  return (
    <section className={`color-${state}`} onClick={handleClick} id="maingame">
        {state === STATES.INIT && 
        <div>init</div>
        }
        {state === STATES.GREEN &&
        <>
        <BsThreeDots/>
        <div>Click!</div>
        </> 
        }
        {state === STATES.WAITFORGREEN && 
        <>
        <BsThreeDots/>
        <div>Wait for green</div>
        </>
        }
        {state === STATES.TOOSOON && 
        <div>TOOSOON</div>
        }
        {state === STATES.RESULTS && 
        <div>RESULTS {timeAtClick.current}</div>
        }
    </section>
  )
}

export default MainGame