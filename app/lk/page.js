import Lk_selection from '../components/Lk_selection';
import Header from '../components//Header';

export const metadata = {
  title: "Personal account",
  description: "Личный кабинет"
};

export default function Lk() {
  return (
    <main>
        <Lk_selection/>
        <Header text ="Личный кабинет"/>
    </main>
  );
}