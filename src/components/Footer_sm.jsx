const Footer = () => {

    // Copyright year
    const year = new Date().getFullYear()
  
    return (
        <footer>
            <div className="flex flex-col gap-3 border-t border-slate-200 pt-5">
                <div className="text-sm flex md:justify-start justify-center text-slate-500">
                    <ul className='hidden  flex-wrap gap-4'>
                        <li><a className=''>Privacy</a></li>
                        <li><a className=''>Terms</a></li>
                        <li><a className=''>Cookies</a></li>
                    </ul>
                    <ul className='flex flex-wrap gap-4'>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact</a></li>
                        <li><a href="">Help</a></li>
                    </ul>
                </div>
                <small className="block text-slate-400 md:text-left text-center"> Burundi buhire &copy; {year}, All Rights Reserved <br /> Design and Developed by <span className="text-slate-600">Akeza Creations</span></small>
            </div>
        </footer>
        
    )
  }
  
  export default Footer