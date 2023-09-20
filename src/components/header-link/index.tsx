import { NavLink } from 'react-router-dom';

type HeaderLinkProps = {
  to: string;
  text: string;
  icon: JSX.Element;
  fz?: string;
  cartCount?: number;
  onClick?: () => void;
};

export default function HeaderLink({
  text,
  to,
  icon,
  fz = '14px',
  cartCount,
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
        position: 'relative',
      }}
      to={to}
    >
      {cartCount ? (
        <span
          style={{
            color: 'white',
            borderRadius: '50px',
            padding: '3px',
            background: '#fd7e14',
            fontSize: '12px',
            position: 'absolute',
            top: '10px',
            left: '-15%',
          }}
        >
          {cartCount}
        </span>
      ) : null}
      {icon}

      {text}
    </NavLink>
  );
}
