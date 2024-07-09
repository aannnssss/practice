import Image from 'next/image';
import myImage from './images/logo.png';

const Logo = () => {
  return (
    <div className="logo-container">
        <Image src={myImage} width={75} height={40}/>
    </div>
  );
};

export default Logo;