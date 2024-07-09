import Image from 'next/image';
import green from './images/green.png';
import violet from './images/violet.png';
import Link from 'next/link';

const Lk_selection = () => {
  return (
    <div className="selection-container">

        <div className="selection1-container">
            <Link href="/lk" className="image-link">
                    <Image src={green} width={120} height={65}/>
                    <span className="overlay-text1">личный кабинет</span>
            </Link>
        </div>

        <div className="selection2-container">
            <Link href="/messenger" className="image-link">
                    <Image src={violet} width={120} height={65}/>
                    <span className="overlay-text2">мессенджер</span>
            </Link>
        </div>

        <div className="selection3-container">
            <Link href="/events" className="image-link">
                    <Image src={violet} width={120} height={65}/>
                    <span className="overlay-text2">календарь мероприятий</span>
            </Link>
        </div>

    </div>
  )
};

export default Lk_selection;
