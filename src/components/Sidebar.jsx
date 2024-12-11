import { Link } from 'react-router-dom'
import User from '../components/User';
import Footer from '../components/Footer_sm'
import Button from '../components/Button'

function Sidebar() {
  return (
    <div className='sticky top-0 left-0 h-screen  overflow-y-auto'>
    <div className='min-w-[315px] bg-white  min-h-screen px-3 py-5'>
      <ul className="w-full text-slate-500 sm:rounded-3xl overflow-hidden">
        <li className='flex items-center hover:text-primary-color px-4 rounded-md'>
          <i className="fi fi-rr-user translate-y-0.5"></i>
          <Link className='w-full flex justify-between p-4' to='/fondateur'>
            Fondateur
            <i className="bi bi-chevron-right"></i>
          </Link>
        </li>
        <li className='flex items-center hover:text-primary-color px-4 rounded-md'>
          <i className="fi fi-rr-eye translate-y-0.5"></i>
          <Link className='w-full flex justify-between p-4' to='/vision'>
            Vision
            <i className="bi bi-chevron-right"></i>
          </Link>
        </li>
        <li className='flex items-center hover:text-primary-color px-4 rounded-md'>
          <i className="fi fi-rr-calendar translate-y-0.5"></i>
          <Link className='w-full flex justify-between p-4' to='/calendrier'>
            Calendar
            <i className="bi bi-chevron-right"></i>
          </Link>
        </li>
        <li className='flex items-center hover:text-primary-color px-4 rounded-md'>
          <i className="fi fi-rr-play translate-y-0.5"></i>
          <Link className='w-full flex justify-between p-4' to='/'>
            Media <i className="bi bi-chevron-right"></i>
          </Link>
        </li>
        <li className='flex items-center hover:text-primary-color px-4 rounded-md'>
          <i className="fi fi-rr-file translate-y-0.5"></i>
          <Link className='w-full flex justify-between p-4' to='/publications'>
            Publications <i className="bi bi-chevron-right"></i>
          </Link>
        </li>
        <li className='flex items-center hover:text-primary-color px-4 rounded-md'>
          <i className="fi fi-rr-envelope translate-y-0.5"></i>
          <Link className='w-full flex justify-between p-4' to='/'>
            Contactez-nous
            <i className="bi bi-chevron-right"></i>
          </Link></li>
      </ul>

      <div className="flex flex-col mt-5">
        <h2 className='font-bold text-xl px-3 text-slate-700 mt-5 my-2'>Top members</h2>
        <div className='flex flex-col gap-2'>
          <User />
          <User />
          <User />
          <User />
          <User />
        </div>
        <Button className='bg-slate-600 w-full mt-4'>Voir plus</Button>
      </div>

      <div className='mt-10'>
        <Footer />
      </div>

    </div>
    </div>
  )
}

export default Sidebar