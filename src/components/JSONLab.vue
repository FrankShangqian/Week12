<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import A2 from '@/assets/json/A2.json'
import Column from 'primevue/column'
const activities = ref(A2);
</script>
<template>
  <div class="row mt-5">
    <h4>This is Information about this activity.(B.2-JSON)</h4>
    <DataTable :value="activities" tableStyle="min-width: 50rem">
      <Column field="name" header="Activity Name"></Column>
      <Column field="date" header="Date"></Column>
      <Column field="activityType" header="Activity Type">
        <template #body="slotProps">
          <span>{{ slotProps.data.activityType.join(', ') }}</span>
        </template>
      </Column>
      <Column header="Details">
        <template #body="slotProps">
          <div>
            <p><strong>Description:</strong> {{ slotProps.data.details.description }}</p>
            <p><strong>Location:</strong> {{ slotProps.data.details.location }}</p>
            <p><strong>Time:</strong> {{ slotProps.data.details.time }}</p>
            <p><strong>Instructor/Facilitator:</strong> {{ slotProps.data.details.instructor || slotProps.data.details.facilitator }}</p>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>

</style>
