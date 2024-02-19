import React from 'react';
import {Text} from "@/components/ui/text";

const Footer = () => {
    return (
        <footer>
            <hr/>
            <div className="flex justify-between items-center px-16 py-8">
                <Text element="p" as="smallText" className="p-0">Teamable Analytics, 2024.</Text>
                <Text element="p" as="smallText" className="p-0 mt-0">✨</Text>
            </div>
        </footer>
    );
};

export default Footer;