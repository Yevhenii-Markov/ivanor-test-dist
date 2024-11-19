<template>
  <v-dialog v-model="showDialog" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        variant="outlined"
        color="surface-variant"
        height="56"
      >
        <v-icon icon="mdi-calendar-range" />
        <span v-if="modelValue">{{ formatDate }}</span>
        <span v-else>{{ titleBtn }}</span>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-date-picker
          :title="titlePicker"
          header="выберите дату"
          width="auto"
          :min="minDate"
          :max="maxDate"
          v-model="selectedDate"
        />

        <v-card-actions>
          <v-btn
            text="Закрыть"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: {
      required: true,
    },
    minDate: {
      type: String
    },
    maxDate: {
      type: String
    },
    titleBtn: {
      type: String
    },
    titlePicker: {
      type: String
    },
  },
  data() {
    return {
      selectedDate: null,
      showDialog: false,
    };
  },
  computed: {
    formatDate() {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(this.selectedDate).toLocaleDateString('ru-RU', options);
    },
  },
  watch: {
    selectedDate() {
      this.$emit('update:modelValue', `${this.formatDate.split('.').reverse().join('-')}`);
      this.showDialog = false;
    },
  }
};
</script>

<style scoped>
.v-icon {
  margin-right: 10px;
}
</style>