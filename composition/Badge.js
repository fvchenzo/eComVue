app.component("badge", {
    template: `
        <span class="label success" v-if="product.new">Nuevo</span>
        <span class="label alert" v-if="product.offer">Oferta</span>
    `,
    props: ["product"],
    setup() {
        return {
            
        }
    }

    
})