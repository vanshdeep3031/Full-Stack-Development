import './style.css'

const app = document.querySelector('#app')

const products = [
  { name: "Wireless Headphones", price: 129.99, category: "electronics" },
  { name: "Cotton T-Shirt", price: 24.99, category: "clothing" },
  { name: "Bluetooth Speaker", price: 89.99, category: "electronics" },
  { name: "Denim Jeans", price: 59.99, category: "clothing" }
]

app.innerHTML = `
  <div class="container">
    <h1>Dynamic Product Filter</h1>

    <div class="filter">
      <label>Filter by:</label>
      <select id="categoryFilter">
        <option value="all">All Products</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
    </div>

    <div id="productGrid" class="grid"></div>
  </div>
`

const productGrid = document.getElementById("productGrid")
const categoryFilter = document.getElementById("categoryFilter")

function displayProducts(filteredProducts) {
  productGrid.innerHTML = ""

  filteredProducts.forEach(product => {
    const card = document.createElement("div")
    card.classList.add("card")

    card.innerHTML = `
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <span class="tag ${product.category}">
        ${product.category}
      </span>
    `

    productGrid.appendChild(card)
  })
}

displayProducts(products)

categoryFilter.addEventListener("change", () => {
  const selected = categoryFilter.value

  if (selected === "all") {
    displayProducts(products)
  } else {
    const filtered = products.filter(product =>
      product.category === selected
    )
    displayProducts(filtered)
  }
})

