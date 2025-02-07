import { useState, useRef } from "react"

enum STATES {
    INIT,
    GREEN,
    WAITFORGREEN,
    TOOSOON,

}
function MainGame() { 
    const [state, setState] = useState(STATES.INIT)
    const counter = useRef(0);

    const handleClick = () => {
        switch (state){
            case STATES.INIT:
                setState(STATES.WAITFORGREEN);
                break;
            case STATES.WAITFORGREEN:
                if(counter.current > 0){ //if counting
                    setState(STATES.GREEN)
                }
                else{
                    setState(STATES.TOOSOON)
                }
                break;
            case STATES.TOOSOON:
                setState(STATES.WAITFORGREEN);
                break;
            default:
                break;
        }
    }

  return (
    <section onClick={handleClick} id="maingame">
        {state === STATES.INIT && 
        <div>init</div>
        }
        {state === STATES.GREEN && 
        <div>GREEN</div>
        }
        {state === STATES.WAITFORGREEN && 
        <div>WAITFORGREEN</div>
        }
        {state === STATES.TOOSOON && 
        <div>TOOSOON</div>
        }
    </section>
  )
}

export default MainGame