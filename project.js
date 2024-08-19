document.addEventListener('DOMContentLoaded',function (){
    let isRegistered = false
    let cartItems = []
    const productsGrid = document.querySelector('.products-grid')
    const products = Array.from(productsGrid.children)
    const backButton = document.getElementById('back-button')
    const searchInput = document.getElementById('search-input')
    const sideInterface = document.getElementById('side-interface')
    const interfaceToggle = document.getElementById('interface-toggle')
    const closeInterface = document.getElementById('close-interface')

    interfaceToggle.addEventListener('click',function (){
        sideInterface.style.right = '0'
    })
    closeInterface.addEventListener('click',function (){
        sideInterface.style.right = '-350px'
    })

    const registerButton = document.getElementById('register-button')
    const registerModal = document.getElementById('register-modal')
    const closeRegister = document.getElementById('close-register')

    registerButton.addEventListener('click',function (){
        registerModal.style.display = 'block'
    })
    closeRegister.addEventListener('click',function (){
        registerModal.style.display = 'none'
    })
    window.addEventListener('click', function (event){
        if(event.target == registerModal){
            registerModal.style.display = 'none'
        }
    })

    const registrationForm = document.getElementById('registration-form')
    registrationForm.addEventListener('submit', function (e){
        e.preventDefault()
        isRegistered = true
        registerModal.style.display = 'none'
        alert('Ви успішно зареєстровані!')
        registerButton.style.display = 'none'
    })

    const categoryLinks = document.querySelectorAll('#side-interface ul li a')
    let currentCategory = 'all'
    function filterProducts(category){
        currentCategory = category
        products.forEach(product =>{
            if(product.getAttribute('data-category') == category || category == 'all'){
                product.style.display = 'block';
            } else{
                product.style.display = 'none'
            }
        })
    }

    categoryLinks.forEach(link =>{
        link.addEventListener('click', function (e){
            e.preventDefault()
            const category = link.getAttribute('data-category')
            filterProducts(category)
            backButton.style.display = 'block'
            searchInput.value = ''
            searchProducts()
        })
    })

    backButton.addEventListener('click', function (){
        filterProducts('all')
        backButton.style.display = 'none'
    })

    searchInput.addEventListener('input', function (){
        searchProducts()
    })

    function searchProducts(){
        const searchTerm = searchInput.value.toLowerCase()
        products.forEach(product =>{
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const isVisible = (productName.includes(searchTerm) &&
                (product.getAttribute('data-category') == currentCategory || currentCategory == 'all'))
            product.style.display = isVisible ? 'block' : 'none'
        })
    }

    const cartButton = document.getElementById('cart-button')
    const cartDropdown = document.getElementById('cart-dropdown')
    const cartItemsList = document.getElementById('cart-items')
    const totalPriceElement = document.getElementById('total-price')
    const checkoutButton = document.getElementById('checkout')
    const orderModal = document.getElementById('order-modal')
    const closeOrder = document.getElementById('close-order')
    const orderForm = document.getElementById('order-form')

    cartButton.addEventListener('click', function (){
        cartDropdown.style.display = (cartDropdown.style.display == 'block') ? 'none' : 'block'
    })

    function updateCart() {
        cartItemsList.innerHTML = ''
        let totalPrice = 0
        cartItems.forEach(item =>{
            const li = document.createElement('li')
            li.textContent = `${item.name} - ${item.quantity} ${item.unit}`
            cartItemsList.appendChild(li)
            totalPrice += item.price * item.quantity
        });
        totalPriceElement.textContent = `${totalPrice} грн`
    }
    function addToCart(product){
        if(!isRegistered){
            alert('Будь ласка, зареєструйтесь для додавання товарів до кошика')
            return
        }
        const productName = product.querySelector('h3').textContent
        const productPrice = parseFloat(product.querySelector('p').textContent.replace('Ціна: ', '').replace(' грн', ''))
        const productUnit = product.querySelector('.product-unit').textContent
        const productQuantity = parseFloat(prompt(`Введіть кількість товару по їх одиниці вимірювання або по кількості цих товарів:`))
        
        if(productQuantity > 0) {
            cartItems.push({ name: productName, price: productPrice, quantity: productQuantity, unit: productUnit})
            updateCart()
        }
    }
    document.querySelectorAll('.product button').forEach(button =>{
        button.addEventListener('click', function () {
            const product = button.closest('.product')
            addToCart(product)
        })
    })

    checkoutButton.addEventListener('click',function (){
        if(!isRegistered) {
            alert('Будь ласка, зареєструйтесь для оформлення замовлення.')
            return
        }
        orderModal.style.display = 'block'
    })
    closeOrder.addEventListener('click',function (){
        orderModal.style.display = 'none'
    })
    window.addEventListener('click', function (event){
        if(event.target == orderModal){
            orderModal.style.display = 'none'
        }
    })
    orderForm.addEventListener('submit',function (e){
        e.preventDefault()
        alert('Ваше замовлення успішно оформлене!')
        orderModal.style.display = 'none'
        cartItems = []
        updateCart()
    })
    const sortSelect = document.getElementById('sort-select')
    sortSelect.addEventListener('change',function (){
        const sortValue = sortSelect.value
        sortProducts(sortValue)
    })

    function sortProducts(criteria){
        let sortedProducts = Array.from(document.querySelectorAll('.product'))
        if(criteria == 'name'){
            sortedProducts.sort((a, b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent))
        }else if(criteria == 'popularity'){
            sortedProducts.sort((a, b) => b.getAttribute('data-popularity') - a.getAttribute('data-popularity'))
        }
        const productsGrid = document.querySelector('.products-grid')
        productsGrid.innerHTML = ''
        sortedProducts.forEach(product => productsGrid.appendChild(product))
    }

    const scrollToTopButton = document.getElementById('scroll-to-top')
    window.addEventListener('scroll',function (){
        if(window.scrollY > 100){
            scrollToTopButton.style.display = 'block'
        } else{
            scrollToTopButton.style.display = 'none'
        }
    })

    scrollToTopButton.addEventListener('click',function (){
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
})

document.addEventListener('DOMContentLoaded',function (){
    document.body.classList.add('loaded')
})


