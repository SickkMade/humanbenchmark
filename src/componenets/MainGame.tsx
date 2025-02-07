import { useState, useRef, useEffect } from "react"
import { BsThreeDots } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { MdError } from "react-icons/md";


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
    const timesCorrect = useRef<number>(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const currentTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(()=>{ //when state is CHANGED to this, it will run this code once
        if(state === STATES.WAITFORGREEN){
            currentTimeout.current = setTimeout(()=>{setState(STATES.GREEN); counter.current = Date.now();},Math.random()*2000 + 3000) //3-7s
        }
        else if(state===STATES.GREEN){
            timesCorrect.current += 1;
        }
        else if (state ===STATES.RESULTS && timesCorrect.current >= 2){
            playVideo();
        }
        else if(state === STATES.TOOSOON){
            if(currentTimeout.current != null){
                clearTimeout(currentTimeout.current);
            }
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

    const playVideo = () => {
        try {
            if (videoRef.current) {
                if (videoRef.current.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                }
                videoRef.current.play();
            }
        } catch (error) {
            console.error('Error playing fullscreen video:', error);
        }
    };
    
    const handleVideoEnd = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        window.location.reload();
    }

  return (
    <section className={`color-${state}`} onClick={handleClick} id="maingame">
        <div>
                <video
                    ref={videoRef}
                    id="app--video"
                    playsInline
                    onEnded={handleVideoEnd}
                >
                    <source src="https://github.com/SickkMade/monkescare/raw/refs/heads/main/public/video1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        {state === STATES.INIT && 
        <>
        <svg width="75" height="100" viewBox="0 0 100 128" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" className="pulse-faint"><path d="M0.719527 59.616L32.8399 2.79148C33.8149 1.06655 35.6429 0 37.6243 0H94.4947C98.9119 0 101.524 4.94729 99.0334 8.59532L71.201 49.357C68.7101 53.0051 71.3225 57.9524 75.7397 57.9524H82.2118C87.3625 57.9524 89.6835 64.4017 85.7139 67.6841L14.34 126.703C9.85287 130.413 3.43339 125.513 5.82845 120.206L25.9709 75.5735C27.6125 71.936 24.9522 67.8166 20.9615 67.8166H5.50391C1.29539 67.8166 -1.35146 63.2798 0.719527 59.616Z" fill="currentcolor"></path></svg>
        <div>Reaction Time Test</div>
        <span>When the red box turns green, click as quickly as you can.</span>
        <span>Click anywhere to start.</span>
        </>
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
        <>
        <MdError/>
        <div>Too soon!</div>
        <span>Click to try again.</span>
        </>
        }
        {state === STATES.RESULTS && 
        <>
        <FaClock size={75}/>
        <div>{timeAtClick.current} ms</div>
        <span>Click to keep going</span>
        </>
        }
    </section>
  )
}

export default MainGame