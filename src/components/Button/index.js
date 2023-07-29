import React from "react";
import { CustomButton } from "./Button.styles";
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--small','btn--medium', 'btn--large'];

const Button = ({
  location,
  children,
  type,
  onClick,
  onKeyDown,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
      <Link to={location} className='btn-mobile' onKeyDown={onKeyDown}>
        <CustomButton>
          <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                  onClick={onClick}
                  type={type}>
             {children}
          </button>
        </CustomButton>
      </Link>
  );
};

export default Button