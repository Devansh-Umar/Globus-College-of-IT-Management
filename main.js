// Toggle Program Expand
function toggleProgram(element) {
    element.classList.toggle("active");
}

// Testimonials (if needed)
function addTestimonial() {
    let name = document.getElementById("name");
    let review = document.getElementById("review");

    if (!name || !review) return;

    if (name.value === "" || review.value === "") {
        alert("Please fill all fields");
        return;
    }

    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];

    testimonials.push({
        name: name.value,
        review: review.value
    });

    localStorage.setItem("testimonials", JSON.stringify(testimonials));

    name.value = "";
    review.value = "";

    displayTestimonials();
}

function displayTestimonials() {
    let list = document.getElementById("testimonialList");
    if (!list) return;

    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];

    list.innerHTML = "";

    testimonials.forEach(t => {
        list.innerHTML += `
            <div class="w3-card w3-padding w3-margin">
                <h4>${t.name}</h4>
                <p>${t.review}</p>
            </div>
        `;
    });
}