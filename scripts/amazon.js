import { cart } from "../data/cart.js";
import {products} from "../data/products.js"
const productGridElement = document.querySelector(".products-grid");
const cartQuantityElement = document.querySelector(".js-cart-quantity");

function renderProducts() {
  let html = "";
  products.forEach((e) => {
    html += `
    
    <div class='product-container'>
   <div class='product-image-container'>
    <img class='product-image' src = '${e.image}'>
   </div>

          <div class="product-name limit-text-to-2-lines">
          ${e.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
            src="images/ratings/rating-${e.rating.stars * 10}.png">

            <div class="product-rating-count link-primary">
            ${e.rating.count}
            </div>
            </div>

          <div class="product-price">$
          ${(e.priceCents / 100).toFixed(2)}
          </div>
          <div class="product-quantity-container">
            <select class = "js-quantity-select-${e.id}"   >
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>
          <div class="added-to-cart product-added-${e.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>


          <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id = "${
            e.id
          }">
            Add to Cart
          </button>
    </div> 
    `;
  });

  productGridElement.innerHTML = html;

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    let productAddedTimeoutId;
    button.addEventListener("click", () => {
      if (productAddedTimeoutId) {
        clearTimeout(productAddedTimeoutId);
      }
      const { productId } = button.dataset;
      const itemQuantity = Number(
        document.querySelector(`.js-quantity-select-${productId}`).value
      );
      let matchedItem;
      cart.forEach((e) => {
        if (productId === e.productId) {
          matchedItem = e;
        }
      });

      if (matchedItem) {
        matchedItem.quantity += itemQuantity;
      } else {
        console.log("value is : ", itemQuantity);

        cart.push({
          productId,
          quantity: itemQuantity,
        });
      }
      console.log(cart);

      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      cartQuantityElement.innerText = cartQuantity;

      document
        .querySelector(`.product-added-${productId}`)
        .classList.add("opacityOne");
      productAddedTimeoutId = setTimeout(() => {
        document
          .querySelector(`.product-added-${productId}`)
          .classList.remove("opacityOne");
      }, 1000);
    });
  });
}

renderProducts();
