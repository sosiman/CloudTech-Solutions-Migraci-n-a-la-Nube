document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('animated-text');
    const textToAnimate = "CloudTech Solutions es una startup en crecimiento que desarrolla aplicaciones web para clientes del sector educativo. Hasta ahora, han operado con servidores locales, pero la demanda de sus aplicaciones ha aumentado y necesitan una infraestructura escalable y segura en la nube.";
    let index = 0;

    function type() {
        if (index < textToAnimate.length) {
            textElement.innerHTML += textToAnimate.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    type();

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
