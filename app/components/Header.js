import './Header.css';

const Header = ({text}) => {
  return (
    <div className="header">
      <h1 className="heading" data-text={text}>{text}</h1>
    </div>
  );
};

export default Header;
