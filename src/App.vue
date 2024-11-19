<template>
  <h1>Список заказов</h1>
  <OrderList />
</template>

<script>
import OrderList from './components/OrderList.vue';

export default {
  components: {
    OrderList,
  },
};
</script>

<style>
#app {
    max-width: 1400px;
    width: 100%;
    color: rgba(255, 255, 255, 0.7);
}
button:hover, button:focus, button:focus-visible {
    outline: none;
    border-color: initial;
}
</style>
