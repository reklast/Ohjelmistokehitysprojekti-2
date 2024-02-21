const EventsButton = ({ setDisplay, display }) => {
    const handleClick = () => {
      // Call setDisplay with the new value of the display state
      setDisplay(!display);
    };
  
    return (
      <button onClick={handleClick}>
        Events
      </button>
    );
  };
  
  export default EventsButton;
  