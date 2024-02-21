const mostPopPorducts = document.querySelector(".most-popular-products");

const jsonFile = "products.json";

fetch(jsonFile)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.map((product) => {
            const { id, name, description, price, date, images } = product;
            mostPopPorducts.innerHTML += `
                <div class="product-card" data-product-id="${id}">
                    <div class="product-card__container">
                        <div class="product-card__btn cart" data-tooltip="add to cart"><span class="material-symbols-rounded"> shopping_bag </span></div>
                        <div class="product-card__btn fav" data-tooltip="add to wishlist"><span class="material-symbols-rounded"> favorite </span></div>
                        <div class="product-card__img">
                            <img src="${images[0].url}" alt="${name}" />
                        </div>
                    </div>
                    <div class="product-card__description">
                        <div class="product-card__text">${name}</div>
                        <div class="product-card__price">${price}</div>
                        <div class="product-card__text">${description}</div>
                        <div class="product-card__date">${date}</div>
                    </div>
                    <div class="product-card__color">
                    ${images
                        .map((image) => {
                            const { url, color } = image;

                            return `<button class="product-card__btn-radio" data-img="${url}">
                                        <span style="background-color: ${color};"></span>
                                    </button>`;
                        })
                        .join("")}
                        
                    </div>
                    <!-- Add to Cart Button & Click Counter -->
                    <div class="product-card__btn add-to-cart-btn" data-product-id="${id}">
                        Add to Cart
                        <span class="click-counter">0</span>
                    </div>
                </div>
            `;
        });
        const radioBtns = document.querySelectorAll(".product-card__btn-radio");
        document.querySelectorAll(".product-card__color").forEach((pcc) => pcc.firstElementChild.classList.add("selected"));
        radioBtns.forEach((radioBtn) => {
            radioBtn.addEventListener("click", () => {
                let productCard = radioBtn.parentElement.parentElement,
                    productImg = productCard.querySelector(".product-card__img > img"),
                    proRadioBtns = productCard.querySelectorAll(".product-card__btn-radio");
                if (radioBtn.parentElement.parentElement === productCard) {
                    proRadioBtns.forEach((radioBtn) => radioBtn.classList.remove("selected"));
                    radioBtn.classList.add("selected");
                    productImg.src = radioBtn.dataset.img;
                }
            });
        });

        // Click Counter Functionality
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            let clickCounter = button.querySelector('.click-counter');
            let count = 0;
            button.addEventListener('click', () => {
                count++;
                clickCounter.innerText = count;
            });
        });
    });
