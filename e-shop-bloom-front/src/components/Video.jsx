import React from "react";

export default function Video() {
    return (
        <section className="bg-bgrosa py-10 sm:py-16 md:py-20 pb-10 sm:pb-14 md:pb-10 bg-cover bg-center bg-no-repeat text-dark "
         style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="max-w-6xl mx-auto px-2">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center mb-10 text-black">
            Mira cómo es el curso POR DENTRO
            </h2>
            <div className="flex justify-center">
            <iframe
                width="4000"
                height="500"
                src="https://www.youtube.com/embed/HcCVAWs8Mx8?si=ieLb4YiFI6egBWvJ" 
                title="Video de presentación"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg shadow-lg"
            ></iframe>
            </div>
        </div>
        </section>
    );
}