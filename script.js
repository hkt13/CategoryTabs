const section = document.getElementById('section')

let data={};

//Function to filter out for selected category
const filterData=(categoryName)=>{
    const category = data.categories.filter(category=>{
   
        return category.category_name ===categoryName;
    })
showData(...category)
}

//Function to calculate discount percentage
const discountCalc=(discountedPrice,mrp)=>{
        const discountAmount = mrp - discountedPrice;
        const discountPercentage = Math.round((discountAmount / mrp) * 100);
    
        return discountPercentage; 
}

//Function to show data
const showData=(category)=>{
    const productsHTML = [];

for (const product of category.category_products) {
    const discountPercentage = discountCalc(product.price,product.compare_at_price)
    const productHTML = `
        <div>
            <div class="img-block">
                <img src="${product.image}" alt="">
                ${product.badge_text ? `<span>${product.badge_text}</span>` : ''}
            </div>
            <div class="title">
               <div class="titleInfo">
               <span>${product.title}</span>
                <img src='./assets/Ellipse.svg'/>
               </div>
                <span>${product.vendor}</span>
            </div>
            <div class="price-offer">
                <span class="discounted-price">Rs ${parseFloat(product.price).toFixed(2)}</span>
                <span class="mrp">${parseFloat(product.compare_at_price).toFixed(2)}</span>
                <span class="discount">${discountPercentage}% Off</span>
            </div>
            <div class="addToCart">
                <button>Add To Cart</button>
            </div>
        </div>
    `;
    productsHTML.push(productHTML);
}

section.innerHTML = productsHTML.join('');
}

//Function to fetch initial data
const fetchdata=async(categoryName)=>{
const response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
data = await response.json();
filterData('Men')
}


//Adding eventlisteners to our category buttons.//Also can be done using event delegation but accessibility could be an issue.
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.id;
      document.querySelectorAll('.category-button').forEach(btn => {
        btn.classList.remove('active');
        btn.querySelector('img').classList.remove('show');
    });
    button.classList.add('active');
    button.querySelector('img').classList.add('show');
    filterData(category)
    });
  });

fetchdata();