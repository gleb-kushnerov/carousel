export class Carousel {
    constructor() {
        this.createCarousel();
    }

    handleEvent(event) {
         let btnEl = event.target.closest('button');
         if (btnEl) {
             if (btnEl.dataset.id === 'prev') {
                 this.previousSlide();
             }
             if (btnEl.dataset.id === 'next') {
                 this.nextSlide();
             }
         }

         let dotEl = event.target.closest('li.dot');
         if (dotEl) {
             this.goToSlide(Number(dotEl.dataset.number));
         }
    }

    async createCarousel() {
        this.carouselEl = document.createElement('div');
        let carouselHtml = await fetch(require('./carousel-content.html')).then(result => result.text());
        this.carouselEl.innerHTML = carouselHtml;
        this.carouselEl.classList.add('carousel');
        this.carouselEl.id = 'carousel';
        document.body.append(this.carouselEl);
        this.slides = this.carouselEl.firstElementChild.children;
        this.dotsContainer = this.carouselEl.firstElementChild.nextElementSibling;
        this.dots = this.dotsContainer.children;
        this.currentSlide = 0;
        this.carouselEl.addEventListener('click', this);
        this.dotsContainer.addEventListener('click', this)


    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    previousSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    goToSlide(n) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('dot-active');
        this.currentSlide = (n+this.slides.length)%this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('dot-active');
    }
}