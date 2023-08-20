import { NavLink } from 'react-router-dom';

type HeaderLinkProps = {
  to: string;
  text: string;
  icon: JSX.Element;
};

export default function HeaderLink({ text, to, icon }: HeaderLinkProps) {
  return (
    <NavLink
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        columnGap: '10px',
        fontSize: '14px',
      }}
      to={to}
    >
      {icon}
      {' '}
      {text}
    </NavLink>
  );
}
