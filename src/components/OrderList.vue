<template>
  <order-filter 
    @submit-by-filters="fetchOrders" 
    @submit-by-id="fetchById"
    :isOrdersLoading="isOrdersLoading"
    :isIdLoading="isIdLoading"
  />
  <order-table
    v-if="orders.length"
    :orders="orders"
    @show-order="fetchById"
  />
  <order-detail
    v-if="showSelectedOrder"
    @changeShow="changeShowSelectedOrder"
    :order="selectedOrder"
  />
</template>

<script>
import OrderFilter from './OrderFilter.vue';
import OrderDetail from './OrderDetail.vue';
import OrderTable from './OrderTable.vue';
import axios from 'axios';

export default {
  components: {
    OrderFilter,
    OrderDetail,
    OrderTable,
  },
  data() {
    return {
      orders: [],
      selectedOrder: null,
      showSelectedOrder: false,
      apiToken: 'b18d4b84735e57cb8f190004672b6987',
      thead: ['ID', 'Дата создания', 'Статус', 'Тип отгрузки', 'Дата отгрузки', 'Способ оплаты',
        'Место отгрузки', 'ФИО клиента', 'Сумма', 'Количество товаров', 'Кто создал'],
      isOrdersLoading: false,
      isIdLoading: false,
    };
  },
  methods: {
    changeShowSelectedOrder(val) {
      this.showSelectedOrder = val;
    },
    async fetchOrders(filters = {}) {
      this.isOrdersLoading = true;
      try {
        const params = new URLSearchParams();
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);
        if (filters.status && filters.status.length) params.append('orderStatus', filters.status.join(','));

        const response = await axios.get('https://msk.ivanor.ru/front/service/test-api/v1/orders', {
          headers: {
            Token: this.apiToken,
          },
          params,
        });
        this.orders = response.data.orders || [];
      } catch (error) {
        console.error('Ошибка при получении заказов:', error);
      } finally {
        this.isOrdersLoading = false;
      }
    },
    async fetchById(orderId) {
      this.isIdLoading = true;
      try {
        const response = await axios.get(`https://msk.ivanor.ru/front/service/test-api/v1/order/${orderId}`, {
          headers: {
            Token: this.apiToken,
          },
        });
        this.selectedOrder = response.data.order;
        this.showSelectedOrder = true;
      } catch (error) {
        console.log(`Ошибка : ${error?.response?.data}`)
      } finally {
        this.isIdLoading = false;
      }
    },
  },
};
</script>