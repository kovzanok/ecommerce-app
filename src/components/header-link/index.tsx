import { NavLink } from 'react-router-dom';

type HeaderLinkProps = {
  to: string;
  text: string;
  icon: JSX.Element;
  fz?: string;
  onClick?: () => void;
};

export default function HeaderLink({
  text,
  to,
  icon,
  fz = '14px',
  onClick,
}: HeaderLinkProps) {
  return (
    <NavLink
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        columnGap: '10px',
        fontSize: fz,
      }}
      to={to}
    >
      {icon}
      {' '}
      {text}
    </NavLink>
  );
}
