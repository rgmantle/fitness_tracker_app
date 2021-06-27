import NavButton from './nav_button';

const NavBar = ({ navItems, title, complaints }) => {
  return (
    <nav
      style={{
        display: 'flex',
        fontSize: '1.5em',
        borderBottom: 'solid 1px black',
        padding: '3px',
      }}
    >
      {title}
      &nbsp;|&nbsp;
      <NavButton name={'Complaints'} />
      {
        navItems.map((departmentName, idx) => {
          return (
            <NavButton name={departmentName} key={idx} />
          );
        })
      }
    </nav>
  )
}

export default NavBar;