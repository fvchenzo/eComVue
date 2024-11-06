app.component("product", {
    template: `
        <section class="product">
            <div class="product__thumbnails">
                <div v-for="(image, index) in product.images" 
                :key="image.thumbnail" class="thumb" 
                :class="{ active: activeImage === index}" 
                :style="{ backgroundImage: 'url(' + product.images[index].thumbnail + ')'}"
                @click="activeImage = index">
            </div>
                
            </div>
            <div class="product__image">
                <img :src="product.images[activeImage].image" :alt="product.name">
            </div>
        </section>
        <section class="description">
            <h4>{{ product.name }} {{ product.stock === 0 ? "😭" : "😎" }} </h4>
            
            <badge :product="product"></badge>
            
            <p class="description__status" v-if="product.stock >= 3 && product.stock <= 5">Quedan pocas unidades</p>
            <p class="description__status" v-else-if="product.stock === 2">
                El producto esta por terminarse!
            </p>
            <p class="description__status" v-else-if="product.stock === 1">
                Ultima unidad disponible
            </p>
            <p class="description__status" v-else-if="product.stock === 0">
                Producto agotado
            </p>
            <p class="description__status" v-else>
                Unidades disponibles
            </p>
            <p class="description__price" :style=" { color: price_color } ">
                $ {{ new Intl.NumberFormat("en-EN").format(product.price) }}
            </p>
            <p class="description__content">
                {{ product.content }}
            </p>
            <div class="discount">
                <span>Codigo de descuento</span>
                <input type="text" placeholder="Ingresa tu codigo" @keyup.enter="applyDiscount($event)" v-model="discountCode" >
            </div>

            <button :disabled="product.stock === 0" class="button-hover-addcart button" @click="sendToCart()" ><span>Agregar al carro</span><i class="fa fa-shopping-cart"></i></button>


            
        </section>
        
    `,
    props: ["product"],
    emits: ["sendtocart"],
    setup(props, context) {
        const productState = reactive({
            activeImage: 0,
            price_color: computed(() => 
                props.product.stock <= 1 ? "rgb(188, 30, 67)" : "rgb(104, 104, 209)" 
            )
        });

        /* const price_color = computed(() => {
            if (props.product.stock <= 1) {
                return "rgb (188, 30, 67)"
            }
            return "rgb (104, 104, 209)"
        }); */

        function sendToCart() {
            context.emit("sendtocart", props.product)
        }
        
        watch(
            () => productState.activeImage, 
            (val, oldValue) => {
                //console.log(val, oldValue)
            }
        );

        /* watch(
            () => props.product.stock, 
            stock => {
                if(stock <= 1) {
                    productState.price_color = "rgb(188, 30, 67)"
                }
            }
        ); */

        const discountCodes = ref(["PLATZI20", "ECOMMERCE10"])
        const discountCode = ref("")
        function applyDiscount (event) {
            const discountCodeIndex = discountCodes.value.indexOf(event.target.value)
            if (discountCodeIndex >= 0) {
                props.product.price *= 50 / 100;
                discountCodes.value.splice(discountCodeIndex, 1) /* Eliminar codigo de descuento */
                discountCode.value = ""
            }
        }

        return {
            ...toRefs(productState),
            sendToCart,
            applyDiscount,
            discountCode
        };
    }
});