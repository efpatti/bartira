import React from 'react';
import './Footer.css'; // Arquivo de estilos CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} INDÚSTRIA DE MÓVEIS BARTIRA LTDA. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
