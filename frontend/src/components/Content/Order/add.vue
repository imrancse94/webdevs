<template>
  <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
    <ContentPageHeader header="New Order" />
    <div class="flex flex-row flex-wrap flex-grow mt-2 w-full md:w-full xl:w-full">
      <div v-for="(i,index) in product.data" :key="index" class="w-full md:w-1/3 p-6">
          <ProductShow :key="index" :product="i" @ordernow="modal(i)" />
      </div>
    </div>
    <pagination :data="product" @paginateTo="getPaginateProduct"/>
    <Modal v-if="$store.getters['modal/isModalOpen']" />
  </div>

</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "OrderAdd",
  data() {
    return {
     product:{},
     isModalShow:false
    };
  },
  mounted() {
   this.getPaginateProduct();
  },
  methods: {

    ...mapActions("product", ["getProducts"]),

    getPaginateProduct(){
       this.getProducts(this.$router.currentRoute.query).then(data =>{
         this.product = data;
      })
    }
  },
};
</script>

