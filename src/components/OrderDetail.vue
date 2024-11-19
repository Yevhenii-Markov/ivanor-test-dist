<template>
  <v-dialog v-model="show" max-width="800px" scrollable>
    <v-card>
      <v-card-title>
        <v-row>
          <span class="headline">Детали заказа  {{ order.id }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('changeShow', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col>
              <h3>Данные по заказу</h3>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title><strong>Номер в учетной системе:</strong> {{ order.uid1c }}</v-list-item-title>
                  <v-list-item-title><strong>Дата создания:</strong> {{ order.created }}</v-list-item-title>
                  <v-list-item-title><strong>Статус заказа:</strong> {{ order.status.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col>
              <h3>Данные по клиенту</h3>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title><strong>ФИО:</strong> {{ order.client.firstname }} {{ order.client.lastname }}</v-list-item-title>
                  <v-list-item-title><strong>Телефон:</strong> {{ order.client.phone }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col>
              <h3>Данные по магазину</h3>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title><strong>Название:</strong> {{ order.shop.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col>
              <h3>Способ оплаты</h3>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title><strong>Способ:</strong> {{ order.payment.method.title }}</v-list-item-title>
                  <v-list-item-title v-if="order.payment.status.title"><strong>Статус оплаты:</strong> {{ order.payment.status.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col>
              <h3>Состав заказа</h3>
              <v-table theme="dark">
                <thead>
                  <tr>
                    <th>Наименование товара</th>
                    <th>Количество</th>
                    <th>Цена</th>
                    <th>Статус резервирования</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.items" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.status }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  watch: {
    show(val) { 
      this.$emit('changeShow', val);
    }
  },
};
</script>

<style scoped>
.v-card {
  color: rgb(191, 191, 191);
}
.v-list-item-title {
  color: rgb(227, 227, 227);
}
.v-card-title .v-row {
  padding: 30px 20px 10px;
}
.v-divider {
  margin: 10px 0;
}
.v-table {
  margin-top: 10px;
}
td, th {
  border: 1px solid #424141;
  padding: 8px!important;
  text-align: center !important;
}
th {
  background: rgba(51, 51, 51, 0.6);
  color: rgb(191, 191, 191);
}
.v-btn {
  background: rgba(51, 51, 51, 0.8);
}
.v-list-item-title {
  margin-bottom: 5px;
}
</style>