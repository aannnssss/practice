import styles from "./page.css";
import Header from './components/Header';
import Registration_form from './components/Registration_form';


export default function Home() {
    return (
        <main>
            <Header text="Social platform" />
            <Header text="for 8 Institute" />
  
            <div className="container">
                <div className="rectangle">
                    <Registration_form />
                </div>
            </div>
        </main>
    );
}