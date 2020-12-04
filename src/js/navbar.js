export const navbarAnimationOnScroll = (navbar) => {
    window.addEventListener('scroll', () => {
        let isScrolling;
        navbar.style.transform = 'translateY(-100%)';

        setTimeout(() => {
            clearTimeout(isScrolling)
            navbar.style.transform = 'translateY(0)';
        }, 1000);
    })
}