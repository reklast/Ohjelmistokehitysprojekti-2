
'use client'
const EventsButton = ({ setDisplay, display }) => {
    const handleClick = () => {
      // Call setDisplay with the new value of the display state
      setDisplay(!display);
    };
  
    return (
      <button className="underline underline-offset-1" onClick={handleClick}>
        Tapahtumat
      </button>
    );
  };
  
  export default EventsButton;
  