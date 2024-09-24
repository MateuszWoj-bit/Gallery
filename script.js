const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("close");

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach(item => {
    item.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    };
});

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
