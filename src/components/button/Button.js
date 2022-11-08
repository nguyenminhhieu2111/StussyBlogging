import React from 'react';
import styled,{css} from 'styled-components';
import PropTypes, { string } from 'prop-types'
import LoadingSpiner from '../loading/LoadingSpiner';
import { NavLink } from 'react-router-dom';


const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  height: ${(props) => props.height || "60px"};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width:450px) {
    font-size: 14px;
    height: 30px;
  }
  ${props => props.pinker === "secondary" && css`
  color:${props => props.theme.primary};
  background-color:white;
  `};
  ${props => props.pinker === "primary" && css`
  
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  pinker="primary",
  ...props
}) => {
  const { isLoading,to } = props;
  const child = !!isLoading ? <LoadingSpiner></LoadingSpiner> : children;
  if(to !== "" && typeof to === 'string'){
    return(
      <NavLink to={to} style={{display:"inline-block"}}>
         <ButtonStyles type={type} pinker={pinker}  {...props}>
      {child}
    </ButtonStyles>
      </NavLink>
    )
  }
  return (
    <ButtonStyles type={type} pinker={pinker}  {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.prototype = {
  type: PropTypes.oneOf(["button","submit"]).isRequired,
  isLoading: PropTypes.bool,
  onclick: PropTypes.func,
  children: PropTypes.node,
  pinker:PropTypes.oneOf(["primary","secondary"])
}
export default Button;