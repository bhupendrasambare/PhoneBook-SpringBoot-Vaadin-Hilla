import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {

    const navigate = useNavigate();

    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2 className='mt-5'>Page not found</h2>
                <p className='mt-3'>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                <a onClick={()=>navigate("/")} className="mt-2 text-light cursor-pointer">Go To Homepage</a>
            </div>
        </div>
    )
}

export default NotFound