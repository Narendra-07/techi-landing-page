const carousels = document.querySelectorAll<HTMLElement>("[data-carousel]");

carousels.forEach((carousel) => {

    const viewport = carousel.querySelector<HTMLElement>("[data-carousel-viewport]");
    const track = carousel.querySelector<HTMLElement>("[data-carousel-track]");
    const prevBtn = carousel.querySelector<HTMLButtonElement>("[data-carousel-prev]");
    const nextBtn = carousel.querySelector<HTMLButtonElement>("[data-carousel-next]");

    if (!viewport || !track || !prevBtn || !nextBtn) return;

    const slides = Array.from(track.children) as HTMLElement[];

    if (slides.length < 2) return;

    let index = 0;
    let startX = 0;
    let dragging = false;

    const getStep = () => slides[1].offsetLeft - slides[0].offsetLeft;

    const getTrackWidth = () => {
        const last = slides[slides.length - 1];
        return last.offsetLeft - slides[0].offsetLeft + last.offsetWidth;
    };

    const getMaxOffset = () => Math.max(0, getTrackWidth() - viewport.clientWidth);

    const getMaxIndex = () => {
        const step = getStep();
        return step > 0 ? Math.ceil(getMaxOffset() / step) : 0;
    };

    const isDesktop = () => window.matchMedia("(min-width: 1025px)").matches;

    const update = () => {

        const maxIndex = getMaxIndex();

        index = Math.min(Math.max(index, 0), maxIndex);

        const offset = isDesktop()
            ? index * getStep()
            : Math.min(index * getStep(), getMaxOffset());

        track.style.transform = `translate3d(${-offset}px, 0, 0)`;

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index >= maxIndex;

    };

    const move = (direction: number) => {
        index += direction;
        update();
    };

    prevBtn.addEventListener("click", () => move(-1));

    nextBtn.addEventListener("click", () => move(1));

    viewport.addEventListener("pointerdown", (e: PointerEvent) => {
        startX = e.clientX;
        dragging = true;
    });

    window.addEventListener("pointerup", (e: PointerEvent) => {

        if (!dragging) return;

        dragging = false;

        const distance = e.clientX - startX;

        if (Math.abs(distance) < 50) return;

        move(distance < 0 ? 1 : -1);

    });

    window.addEventListener("resize", update);

    window.addEventListener("load", update);

    update();

});
