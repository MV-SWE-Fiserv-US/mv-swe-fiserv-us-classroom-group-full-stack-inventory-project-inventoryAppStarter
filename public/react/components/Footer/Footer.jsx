import React, { useState } from "react";

export default function Footer() {

    const [click, setClick] = useState(false)

    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
            <p className="text-sm" onClick={() => setClick(!click)}> &copy; {new Date().getFullYear()} {!click ? "Vaultry. All rights reserved." : "Vaultry. All rights reserved. (JK don't sue us)"}</p>
                <div className="mt-2">
                    <a href="#" className="text-blue-400 hover:text-blue-600 mx-2">Privacy Policy</a>
                    <a href="#" className="text-blue-400 hover:text-blue-600 mx-2">Terms of Service</a>
                    <a href="#" className="text-blue-400 hover:text-blue-600 mx-2">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}