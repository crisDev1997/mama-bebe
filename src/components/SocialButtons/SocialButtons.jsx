import './SocialButtons.css'

export default function SocialButtons(){
    return (
        <div className="social">
            <div className="social-buttons">
            <button className="social-tiktok">
            <a href="https://www.instagram.com"><i className="fa-brands fa-tiktok"></i></a>
            </button>
            <button className="social-facebook">
            <a href="https://www.facebook.com"><i className="fa-brands fa-facebook"></i></a>
            </button>
            <button className="social-instagram">
            <a href="https://www.instagram.com"><i className="fa-brands fa-instagram"></i></a>
            </button>
        </div>
        </div>
    )
}