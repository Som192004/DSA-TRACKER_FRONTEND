import React, { useState, useEffect } from 'react';
import Button from './Header/Button';

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [msgOnBtn, setMsgOnBtn] = useState('Select the Role');

  const options = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
  ];

  const handleOptionClick = (e , option) => {
    e.preventDefault(); 
    setSelectedOption(option);
    setMsgOnBtn(option.name); // Update button label with the option name
    setShowMenu(false); // Close the dropdown after selection
    localStorage.setItem("role" , option.name)
  };

  const handleButtonClick = (e) => {
    e.preventDefault()
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !document.querySelector('.dropdown-button').contains(event.target) &&
        !document.querySelector('.dropdown-menu')?.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <Button
        type='button'
        className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none dropdown-button"
        onClick={(e) => handleButtonClick(e)}
      >
        {msgOnBtn}
      </Button>
      {showMenu && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu">
          {options.map((option) => (
            <div
              key={option.id}
              className={`block px-4 py-2 text-sm cursor-pointer ${
                selectedOption?.id === option.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={(e) => handleOptionClick(e , option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
