import styled from 'styled-components';
import { Link as RouterLink } from "react-router-dom";

export const NavbarContainer = styled.nav`
  height: 50px;
  background-color: rgba(102, 16, 83, 0.69);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Logo = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

export const ListItem = styled.li`
  margin-right: 20px;
  font-weight: 500;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const StyledLink = styled(RouterLink)`
  color: inherit;
  text-decoration: none;
`;
