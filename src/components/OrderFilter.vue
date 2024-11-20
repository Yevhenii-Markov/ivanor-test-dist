<template>
  <v-container>
    <h2>Поиск по номеру заказа</h2>
    <v-row>
      <v-text-field
        variant="outlined"
        label="Введите номер заказа (ID)"
        clearable
        :counter="6"
        v-model="orderId"
        :rules="idRules"
        @focus="idInputFocus = true"
        @blur="idInputFocus = false"
      />
      <v-btn
        variant="outlined"
        color="surface-variant"
        height="56"
        :loading="isIdLoading"
        :disabled="false"
        @click="submitById"
      >
        Искать
      </v-btn>
    </v-row>
    
    <h2>Поиск по дате и статусу</h2>
    <v-row>
      <v-select
        variant="outlined"
        label="Статус"
        multiple
        clearable
        v-model="selectedStatuses"
        :items="statuses"
      />
      <div class="picker-wrap">
        <picker-dialog
          v-model="dateFrom"
          :minDate="minDate"
          :maxDate="maxDate"
          titleBtn="начало периода"
          titlePicker="Введите начальную дату поиска"
        />
        <picker-dialog 
          v-model="dateTo"
          :minDate="minDate"
          :maxDate="maxDate"
          titleBtn="конец периода"
          titlePicker="Введите конечную дату поиска"
        />
      </div>
      <v-btn
        variant="outlined"
        color="surface-variant"
        height="56"
        @click="submitByFilters"
        :loading="isOrdersLoading"
      >Искать
      </v-btn>
    </v-row>
  </v-container>
  

</template>

<script>
import PickerDialog from './PickerDialog.vue';

export default {
  components: {
    PickerDialog,
  },
  props: {
    isOrdersLoading: {
      type: Boolean,
      required: true,
    },
    isIdLoading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      orderId: '',
      idInputFocus: false,
      validOrderIdMessage: 'введите 6 цифр номера заказа',
      dateFrom: null,
      dateTo: null,
      minDate: '2024-05-01',
      maxDate: '2024-06-30',
      selectedStatuses: [],
      statuses: [
        { title: 'Обрабатывается', value: 1 },
        { title: 'Обработан', value: 2 },
        { title: 'Не хватило товара', value: 3 },
        { title: 'Выполнен', value: 4 },
        { title: 'Отменен', value: 5 },
        { title: 'Зарезервирован', value: 6 },
      ],
      idRules: [val => {
        if (!this.orderId?.length) return true
        if (!this.validOrderId(val) && this.idInputFocus) return this.validOrderIdMessage
        return true
        },
      ],
    };
  },
  methods: {
    submitById() {
      if(this.validOrderId(this.orderId)) this.$emit('submit-by-id', this.orderId);
    },
    submitByFilters() {
      const filters = {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        status: this.selectedStatuses,
      };
      this.$emit('submit-by-filters', filters);
    },
    validOrderId(id) {
      if (id.length === 6 && (/^\d+$/.test(id))) return true
      else return false
    }
  },
};
</script>

<style scoped>
  h2 {
    margin-bottom: 30px;
  }
  .filters-block {
    margin-bottom: 70px;
  }
  .v-row {
    gap: 20px;
    margin-bottom: 50px;
  }
  .v-container {
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  .picker-wrap {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .v-input {
    min-width: 220px;
  }
</style>
