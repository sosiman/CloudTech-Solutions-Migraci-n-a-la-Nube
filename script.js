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

    // Modal de diagramas
    const modal = document.getElementById('diagram-modal');
    const btn = document.getElementById('diagram-button');
    const span = document.getElementsByClassName('close-button')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    lightGallery(document.getElementById('lightgallery'), {
        plugins: [lgZoom, lgThumbnail],
        speed: 500,
    });

    // Descargar diagramas
    const downloadBtn = document.getElementById('download-diagrams-btn');
    downloadBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        const images = [
            { path: 'images/fase1_diagrama_propuesta.png', name: 'propuesta_1.png' },
            { path: 'images/fase1_diagrama_propuesta0.png', name: 'propuesta_2.png' },
            { path: 'images/fase_2_final.png', name: 'diagrama_final.png' }
        ];

        const zip = new JSZip();

        // Helper function to fetch a file as a blob
        async function fetchFile(url) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        }

        // Add files to the zip
        for (const image of images) {
            try {
                const blob = await fetchFile(image.path);
                zip.file(image.name, blob);
            } catch (error) {
                console.error(`Failed to fetch ${image.path}:`, error);
            }
        }

        // Generate the zip file and trigger the download
        zip.generateAsync({ type: 'blob' }).then(function(content) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = "diagramas.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href); // Clean up
        });
    });
});
