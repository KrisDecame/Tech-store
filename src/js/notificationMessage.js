export const showNotificationMessage = (message) => {
    const messageElement = document.querySelector('.message');
    messageElement.innerHTML = message;
    messageElement.style.transform = 'translateX(0)';
    setTimeout(() => {
        messageElement.style.transform = 'translateX(-100%)';
    }, 2000);
}