document.addEventListener('DOMContentLoaded', function() {

    const downloadBtn = document.getElementById('download-btn');
    const downloadModal = document.getElementById('download-modal');
    const closeModal = document.querySelector('.close-modal');
    const countdownElement = document.getElementById('countdown');
    const downloadProgress = document.getElementById('download-progress');
    const directLink = document.getElementById('direct-link');
    const launchBtn = document.getElementById('launch-btn');
    const loaderProgress = document.getElementById('loader-progress');
    const statusText = document.getElementById('status-text');
    
    let countdownInterval;
    let progressInterval;
    
    function openModal() {
        downloadModal.style.display = 'flex';
        startCountdown();
    }
    
    function closeModalFunc() {
        downloadModal.style.display = 'none';
        clearInterval(countdownInterval);
        clearInterval(progressInterval);
        countdownElement.textContent = '3';
        downloadProgress.style.width = '0';
    }
    
    // Создаем элемент частицы
    const particle = document.createElement('div');
    particle.classList.add('particle');
    document.body.appendChild(particle);

    // Отступ, чтобы центрировать частицу на курсоре
    const offsetX = 15; 
    const offsetY = 15;

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    function startCountdown() {
        let count = 3;
        countdownInterval = setInterval(() => {
            count--;
            countdownElement.textContent = count;
            
            if (count <= 0) {
                clearInterval(countdownInterval);
                startDownload();
            }
        }, 1000);
    }
    
    function startDownload() {
        let width = 0;
        progressInterval = setInterval(() => {
            width += 1;
            downloadProgress.style.width = width + '%';
            
            if (width >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    window.location.href = directLink.getAttribute('href');
                    setTimeout(() => {
                        closeModalFunc();
                    }, 1000);
                }, 500);
            }
        }, 30);
    }
    
    function simulateLaunch() {
        statusText.textContent = 'Запускается...';
        let width = 0;
        launchBtn.disabled = true;
        
        const launchInterval = setInterval(() => {
            width += 1;
            loaderProgress.style.width = width + '%';
            
            if (width === 30) {
                statusText.textContent = 'Проверка файлов...';
            } else if (width === 60) {
                statusText.textContent = 'Загрузка ядра...';
            } else if (width === 85) {
                statusText.textContent = 'Инициализация...';
            } else if (width >= 100) {
                clearInterval(launchInterval);
                statusText.textContent = 'Запущено!';
                setTimeout(() => {
                    statusText.textContent = 'Готов к запуску';
                    loaderProgress.style.width = '0';
                    launchBtn.disabled = false;
                }, 2000);
            }
        }, 30);
    }
    
    function animateCounter(element, targetNumber) {
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        const easeOutQuad = t => t * (2 - t);
        
        let frame = 0;
        let currentNumber = 0;
        
        const counter = setInterval(() => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);
            currentNumber = Math.round(targetNumber * progress);
            
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(counter);
            }
            
            element.textContent = currentNumber.toLocaleString();
        }, frameDuration);
    }
    
    function initCounters() {
        const updatesSection = document.getElementById('updates');
        const totalUpdates = document.getElementById('total-updates');
        const majorUpdates = document.getElementById('major-updates');
        const featuresAdded = document.getElementById('features-added');
        
        let animated = false;
        
        window.addEventListener('scroll', () => {
            if (!animated && isElementInViewport(updatesSection)) {
                animateCounter(totalUpdates, 27);
                animateCounter(majorUpdates, 8);
                animateCounter(featuresAdded, 142);
                animated = true;
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.top + 300 >= 0
        );
    }
    
    function updateDownloadCount() {
        const downloadCount = document.getElementById('download-count');
        let count = parseInt(downloadCount.textContent.replace(/,/g, ''));
        
        downloadBtn.addEventListener('click', () => {
            count++;
            downloadCount.textContent = count.toLocaleString();
        });
    }
    
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    function handleActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    function createParticles() {
        const body = document.body;
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 20 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.left = `${Math.random() * 100}vw`;
            
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            body.appendChild(particle);
        }
    }
    
    function initHoverEffects() {
        const featureCards = document.querySelectorAll('.feature-card');
        const buttons = document.querySelectorAll('.btn, .launcher-button');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }
    
    function initSocialLinks() {
        const discordLink = document.querySelector('.social-icon.discord').parentElement;
        const telegramLink = document.querySelector('.social-icon.telegram').parentElement;
        const vkLink = document.querySelector('.social-icon.vk').parentElement;
        
        const targetUrl = 'https://t.me/winnerclient';
        
        [discordLink, telegramLink, vkLink].forEach(link => {
            link.href = targetUrl;
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }
    
    function addParallaxEffect() {
        const heroSection = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image');
        const heroContent = document.querySelector('.hero-content');
        
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const xOffset = (x - 0.5) * 20;
            const yOffset = (y - 0.5) * 20;
            
            heroImage.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            heroContent.style.transform = `translate(${-xOffset * 0.3}px, ${-yOffset * 0.3}px)`;
        });
    }
    
    function scrollAnimation() {
        const elements = document.querySelectorAll('.feature-card, .showcase-content, .launcher-section, .update-item');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    }
    
    function addButtonGlowEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-download, .launcher-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = '0 0 15px var(--primary-color)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '';
            });
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', openModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === downloadModal) {
            closeModalFunc();
        }
    });
    
    if (launchBtn) {
        launchBtn.addEventListener('click', simulateLaunch);
    }
    
    
    if (directLink) {
        directLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            fetch(directLink.getAttribute('href'))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'WinnerClient.zip';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.error('Error downloading file:', error);
                });
        });
    }

    

    initCounters();
    updateDownloadCount();
    initSmoothScroll();
    handleActiveSection();
    createParticles();
    initHoverEffects();
    initSocialLinks();
    addParallaxEffect();
    scrollAnimation();
    addButtonGlowEffect();
}); 