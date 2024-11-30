import { Banner } from "./components/Banner";
import Header from "./components/Header";

export default function Home() {
  return (


    <div className='relative bg-gradient-to-b pb-8'>
      <Header />

      <main className='relative lg:space-y-24'>
        <Banner
        />
      </main>
    </div>
  );
}
