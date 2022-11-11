import './App.css';
import './DrumPad/DrumPad.css';
import './DrumController/DrumController.css';
import React, { useState, useEffect } from 'react';

const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Apoen-HH',
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Kick-n-Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
]


function App() {
  const [played, setPlayed] = useState('');
  const [volume, setVolume] = useState(1);

  // set the value of volume on change of input bar 'volume'
  const handleVolume = (e) => {
    setVolume(e.target.value);
  };

  // Functionality of clear button
  const handleClear = () => setPlayed('')

  // play the recording of the keys selected
  const handlePlay = () => {
    let index = 0;
    let recordingArr = played.split("");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordingArr[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, 350)
    setTimeout(() => clearInterval(interval), 350 * recordingArr.length - 1)
  }

  const handleMute = () =>{ 
    setVolume(0);
  }

  return (
    <div className='App'>
      <div id='drum-machine'>
        <div id='drum-pad'>
          {audioClips.map((clip) => {
            return <DrumPad clip={clip} key={clip.keyTrigger} setPlayed={setPlayed} volume={volume} />
          })}
        </div>
        <DrumController played={played} volume={volume} onVolumeChange={handleVolume} handleClear={handleClear} handlePlay={handlePlay} handleMute={handleMute} />
      </div>

    </div>
  );
}


function DrumPad({ clip, setPlayed, volume }) {
  const [active, setActive] = useState(false);

  //play the sound of the clicked Pad
  const handleClick = () => {
    let audioTag = document.getElementById(clip.keyTrigger);
    console.log(audioTag)
    setActive(true);
    setTimeout((() => setActive(false)), 200);
    setPlayed((prev) => prev + clip.keyTrigger + '');
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
  }

  // check if the key pressed is the same as the Pad key, if it is play the sound 
  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      handleClick()
    }
  }
  
  // when a key is pressed run the handleKeyPress callback 
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="display">
      <div className={`drum-pad ${active}`} onClick={handleClick} >
        <audio src={clip.url} id={clip.keyTrigger} ></audio>
        {clip.keyTrigger}</div>
    </div>
  )
}

function DrumController(props) {
  return (
    <div id="controller">
      <div id="nameDisplayer">
        <h2>
          {props.played}
        </h2>
      </div>
      <div id='controller-btns'>
        <button id='btn-play' className='btn btn-success' onClick={props.handlePlay}>Play</button>
        <button id='btn-clear' className='btn btn-danger' onClick={props.handleClear}>Clear</button>
      </div>
      <div id='volume'>
        <h4>Volume</h4>
        <input
          type='range'
          step='0.01'
          max='1'
          min='0'
          value={props.volume}
          onChange={props.onVolumeChange}
        >
        </input>
        <button onClick={props.handleMute} className='btn' id='mute-btn'>Mute</button>
      </div>
    </div>
  )
}

export default App;
