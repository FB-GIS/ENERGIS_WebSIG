import { Link } from "react-router-dom"

const Contact = (props) => {
    return (
        <main className="contact-main">
        
            <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d185113.20864456796!2d5.0760764856028855!3d43.53583067499962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c98da304b91259%3A0x5cb953bec8b688a3!2sAix-en-Provence!5e0!3m2!1sfr!2sfr!4v1747815139018!5m2!1sfr!2sfr" height="350" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
                
            <section >
                
            <h1>Contact</h1>
            <div className="contact">
                
                <div>
                    <p>Société ENERGIS</p>
                </div>
                
                <div>
                    <p>13100 AIX-EN-PROVENCE</p>
                </div>
                
                <div>
                    <Link to="tel:0601010101">06.01.01.01.01</Link>
                </div>
                
                <div>
                    <Link to= "mailto:energis@gmail.com">energis@gmail.com</Link>
                </div>
            </div>
        </section>
    </main>
    )
}

export default Contact
