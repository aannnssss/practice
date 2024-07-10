import Messenger_selection from '../components/Messenger_selection';
import Header from '../components/Header';

export const metadata = {
    title: "Messenger",
    description: "Мессенджер"
  };

export default function Messenger() {
  return (
    <main>
        <Messenger_selection/>
        <Header text ="Мессенджер"/>
    </main>
  );
}