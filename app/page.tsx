import Image from 'next/image'
import Qrcode from './Qrcode';

export default function Home() {
  return (
     <div className="relative min-h-[100vh] h-full flex justify-center items-center" >
       <Qrcode/>
       <Image
       src="/glass.png"
       width={1500}
       height={1200}
       alt='glass png'
       className='fixed top-0 left-0 w-full h-full object-cover z-0  pointer-events-none'
       />

        
     </div>
  );
}
