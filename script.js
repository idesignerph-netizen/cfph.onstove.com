document.addEventListener('DOMContentLoaded', function () {

    // BOOKMARK SAFE
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    let isBookmarked = false;

    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function () {
            isBookmarked = !isBookmarked;

            if (isBookmarked) {
                bookmarkBtn.style.fill = '#FF6B35';
                bookmarkBtn.style.color = '#FF6B35';
            } else {
                bookmarkBtn.style.fill = 'none';
                bookmarkBtn.style.color = '#b0b0b0';
            }
        });
    }

    // HEADER SAFE
    const header = document.querySelector('.stove-header');

    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        if (!header) return;

        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

});
