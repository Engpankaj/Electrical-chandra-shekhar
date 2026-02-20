// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
    };

    let counterAnimated = false;
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        const observerOptions = { threshold: 0.3 };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterAnimated) {
                    animateCounters();
                    counterAnimated = true;
                }
            });
        }, observerOptions);

        counterObserver.observe(heroSection);
    }

    // Navbar Background Change on Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    function openLightbox(imgSrc, captionText) {
        if (lightbox && lightboxImg) {
            lightbox.style.display = 'block';
            lightboxImg.src = imgSrc;
            if (lightboxCaption) {
                lightboxCaption.textContent = captionText || '';
            }
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        
        if (galleryItem) {
            const img = galleryItem.querySelector('img');
            let caption = '';
            const overlaySpan = galleryItem.querySelector('.gallery-overlay span');
            const projectOverlaySpan = galleryItem.querySelector('.project-overlay span');
            
            if (overlaySpan) {
                caption = overlaySpan.textContent;
            } else if (projectOverlaySpan) {
                caption = projectOverlaySpan.textContent;
            }
            
            if (img) {
                openLightbox(img.src, caption);
            }
        }
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });

    // Fullscreen Video Modal Functionality
    function createVideoModal() {
        if (document.getElementById('videoModal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'videoModal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            z-index: 3000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            align-items: center;
            justify-content: center;
        `;
        
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = `
            position: relative;
            width: 90%;
            max-width: 1200px;
            aspect-ratio: 16/9;
        `;
        
        const video = document.createElement('video');
        video.id = 'fullscreenVideo';
        video.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 10px;
        `;
        video.controls = true;
        video.autoplay = true;
        
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: -50px;
            right: 0;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            z-index: 3001;
        `;
        closeBtn.onclick = closeVideoModal;
        
        videoContainer.appendChild(video);
        videoContainer.appendChild(closeBtn);
        modal.appendChild(videoContainer);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeVideoModal();
            }
        });
    }

    function openVideoFullscreen(videoSrc) {
        createVideoModal();
        const modal = document.getElementById('videoModal');
        const video = document.getElementById('fullscreenVideo');
        
        video.src = videoSrc;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        video.play();
    }

    function closeVideoModal() {
        const modal = document.getElementById('videoModal');
        const video = document.getElementById('fullscreenVideo');
        
        if (video) {
            video.pause();
            video.src = '';
        }
        if (modal) {
            modal.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const video = this.querySelector('video');
            
            if (video && video.src && video.src !== window.location.href) {
                openVideoFullscreen(video.src);
            }
        });
        
        const playBtn = card.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const video = card.querySelector('video');
                if (video && video.src && video.src !== window.location.href) {
                    openVideoFullscreen(video.src);
                }
            });
        }
    });

    // Form Submission and PDF Generation
    const serviceForm = document.getElementById('serviceForm');

    if (serviceForm) {
        let storedFormData = {};

        serviceForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            storedFormData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                service: document.getElementById('service').value,
                description: document.getElementById('description').value,
                preferredDate: document.getElementById('preferredDate').value || 'Not specified',
                submissionDate: new Date().toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };

            await generatePDF(storedFormData);
        });

        async function generatePDF(data) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const primaryColor = [255, 107, 53];
            const secondaryColor = [26, 83, 92];
            const textColor = [45, 48, 71];

            // Header - Reduced from 45mm to 30mm
            doc.setFillColor(...primaryColor);
            doc.rect(0, 0, 210, 30, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text('CHANDRA SHEKHAR', 105, 12, { align: 'center' });

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text('Professional Electrician Services', 105, 19, { align: 'center' });

            doc.setFontSize(9);
            doc.text('Electrical Work | Installation | Repairs | Maintenance', 105, 25, { align: 'center' });

            // Title - Reduced spacing
            doc.setTextColor(...secondaryColor);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('SERVICE REQUEST FORM', 105, 38, { align: 'center' });

            // Divider line - moved up
            doc.setDrawColor(...primaryColor);
            doc.setLineWidth(0.5);
            doc.line(20, 42, 190, 42);

            // Form Data Section - Reduced spacing
            doc.setTextColor(...textColor);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('Customer Details', 20, 50);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);

            let yPos = 58;
            
            doc.setFont('helvetica', 'bold');
            doc.text('Name:', 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(data.name, 50, yPos);

            yPos += 7;
            doc.setFont('helvetica', 'bold');
            doc.text('Phone:', 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(data.phone, 50, yPos);

            yPos += 7;
            doc.setFont('helvetica', 'bold');
            doc.text('Address:', 20, yPos);
            doc.setFont('helvetica', 'normal');
            
            const addressLines = doc.splitTextToSize(data.address, 130);
            doc.text(addressLines, 50, yPos);
            yPos += (addressLines.length * 5) + 3;

            // Service Details Section - Reduced spacing
            yPos += 7;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text('Service Details', 20, yPos);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            yPos += 7;

            doc.setFont('helvetica', 'bold');
            doc.text('Service Required:', 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(data.service, 70, yPos);

            yPos += 7;
            doc.setFont('helvetica', 'bold');
            doc.text('Preferred Date:', 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(data.preferredDate, 70, yPos);

            yPos += 10;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text('Work Description:', 20, yPos);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            yPos += 6;
            
            const descLines = doc.splitTextToSize(data.description, 170);
            doc.text(descLines, 20, yPos);
            yPos += (descLines.length * 5) + 8;

            // Terms and Conditions - More compact
            doc.setFillColor(247, 255, 247);
            doc.rect(15, yPos, 180, 35, 'F');
            
            yPos += 7;
            doc.setTextColor(...secondaryColor);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('Terms & Conditions', 20, yPos);

            doc.setTextColor(...textColor);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            yPos += 5;
            
            const terms = [
                '1. Preliminary estimate - final charges may vary based on actual work.',
                '2. 30% advance required to confirm booking.',
                '3. Warranty as per service type (min 30 days for repairs).',
                '4. Customer to arrange materials if specified.',
                '5. Extra charges for emergency services.'
            ];

            terms.forEach(term => {
                doc.text(term, 25, yPos);
                yPos += 4.5;
            });

            // Contact Information - Reduced spacing
            yPos += 8;
            doc.setTextColor(...primaryColor);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('Contact Information', 20, yPos);

            doc.setTextColor(...textColor);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            yPos += 5;
            doc.text('Phone: +91 7078787773', 20, yPos);
            yPos += 4;
            doc.text('Email: chandrashekhar@email.com', 20, yPos);
            yPos += 4;
            doc.text('Service Area: All Over City & Surrounding Areas', 20, yPos);

            // Footer - Reduced from 27mm to 18mm
            const footerY = yPos + 8;
            doc.setFillColor(...secondaryColor);
            doc.rect(0, footerY, 210, 18, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(9);
            doc.text('Thank you for choosing Chandra Shekhar Electrical Services!', 105, footerY + 7, { align: 'center' });
            doc.setFontSize(7);
            doc.text(`Generated on: ${data.submissionDate}`, 105, footerY + 12, { align: 'center' });
            doc.text('Computer-generated document. No signature required.', 105, footerY + 16, { align: 'center' });

            const fileName = `Service_Request_${data.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);

            // Automatically share to WhatsApp after PDF is generated
            setTimeout(() => {
                shareToWhatsApp();
            }, 1000);

            // Show a brief success notification
            showSuccessNotification();
        }

        function showSuccessNotification() {
            const notification = document.createElement('div');
            notification.innerHTML = `
                <div class="success-notification">
                    <i class="fas fa-check-circle"></i>
                    <span>Form submitted! Opening WhatsApp...</span>
                </div>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #25D366;
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 4000;
                animation: slideInRight 0.3s ease;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            `;
            
            notification.querySelector('i').style.cssText = `
                font-size: 1.2rem;
            `;
            
            notification.querySelector('span').style.cssText = `
                font-size: 0.95rem;
                font-weight: 500;
            `;
            
            document.body.appendChild(notification);
            
            // Add animation styles
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            // Auto-remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
            
            serviceForm.reset();
        }

        function shareToWhatsApp() {
            const { name, phone, address, service, description, preferredDate } = storedFormData;
            
            const message = `*New Service Request*\n\n` +
                `*Customer Details:*\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Address: ${address}\n\n` +
                `*Service Details:*\n` +
                `Service Required: ${service}\n` +
                `Preferred Date: ${preferredDate}\n\n` +
                `*Work Description:*\n${description}\n\n` +
                `Please find the PDF estimate attached.`;
            
            const encodedMessage = encodeURIComponent(message);
            
            // Business phone number: 7078787773 (with country code: 917078787773)
            const businessPhone = '917078787773';
            
            const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        }
    }

    document.querySelectorAll('.video-placeholder').forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            alert('Video player would open here. Integrate with YouTube/Vimeo for actual videos.');
        });
    });
});
