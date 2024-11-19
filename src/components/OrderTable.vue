<template>
  <div>
    <v-alert
      type="success"
      dismissible
      color="rgba(78, 175, 81, 0.3)"
    >
      Найдено {{ orders.length }} {{ ordersName  }}
    </v-alert>
    <v-table theme="dark">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="th in thead" :key="th">{{ th }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in sortOrders"
            :key="order.id"
            @click="showOrder(order.id)"
            style="cursor: pointer;"
            v-ripple="{ class: 'success' }"
          >
            <td>{{ order.id }}</td>
            <td>
              <span>{{ order.created.split(' ')[0].split('-').reverse().join('.') }}</span>
              <br>
              <span>{{ order.created.split(' ')[1].split(':').splice(0, 2).join(':') }}</span>
            </td>
            <td :style="statusStyle(order.status.id)">{{ order.status.title }}</td>
            <td>{{ order.shipment.method.title }}</td>
            <td class="nowrap">{{ order.shipment.date }}</td>
            <td>{{ order.payment.method.title }}</td>
            <td>{{ order.shop.title }}</td>
            <td>{{ order.client.firstname }} {{ order.client.lastname }}</td>
            <td class="nowrap">{{ order.amount }} ₽</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.operator }}</td>
          </tr>
        </tbody>
      </template>
    </v-table>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      thead: ['ID', 'Дата создания', 'Статус', 'Тип отгрузки', 'Дата отгрузки', 'Способ оплаты',
        'Место отгрузки', 'ФИО клиента', 'Сумма', 'Количество товаров', 'Кто создал'],
    };
  },
  methods: {
    statusStyle(statusId) {
      switch (statusId) {
        case 4:
          return { background: 'rgba(78, 175, 81, 0.2)' }; // Заказ выполнен
        case 6:
          return { background: 'rgba(0, 223, 7, 0.4)' }; // Заказ зарезервирован
        case 5:
          return { background: 'rgb(122, 33, 33, 0.75)' }; // Заказ отменен
        default:
          return {};
      }
    },
    showOrder(orderId) {
      this.$emit('show-order', orderId);
    }
  },
  computed: {
    sortOrders() {
      return this.orders?.sort((a, b) => {
        return a.created.localeCompare(b.created);
      })
    },
    ordersName() {
      const count = this.orders?.length || 0;
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;

      if (lastDigit === 1 && lastTwoDigits !== 11) {
          return "заказ";
      } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
          return "заказа";
      } else {
          return "заказов";
      }

    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
td, th {
  border: 1px solid #424141;
  padding: 8px;
  text-align: center !important;
}
th, tr:hover {
  background: rgba(51, 51, 51, 0.6);
}
td.nowrap {
  white-space: nowrap;
}
</style>