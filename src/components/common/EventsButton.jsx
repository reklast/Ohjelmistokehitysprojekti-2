
'use client'
const EventsButton = ({ setDisplay, display }) => {
    const handleClick = () => {
      // Call setDisplay with the new value of the display state
      setDisplay(!display);
    };
  
    return (
      <button className="text-base" onClick={handleClick}>
        Tapahtumat
      </button>
    );
  };
  
  export default EventsButton;
  