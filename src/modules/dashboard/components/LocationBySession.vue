<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Location By Session</BCardTitle>
      <BDropdown class="ms-auto" toggle-class="btn btn-sm btn-default btn-icon" no-caret placement="bottom-end">
        <template #button-content>
          <Icon icon="dots-vertical" class="fs-lg" />
        </template>
        <BDropdownItem href=""> <Icon icon="world" class="me-2" /> Show Top Countries </BDropdownItem>
        <BDropdownItem href=""> <Icon icon="map-pin" class="me-2" /> View City Breakdown </BDropdownItem>
        <BDropdownItem href=""> <Icon icon="calendar" class="me-2" /> Compare Date Range </BDropdownItem>
        <BDropdownItem href=""> <Icon icon="download" class="me-2" /> Download Report </BDropdownItem>
        <hr class="dropdown-divider" />
        <BDropdownItem class="text-danger" href="#"> <Icon icon="trash" class="me-2" /> Clear Filters </BDropdownItem>
      </BDropdown>
    </BCardHeader>

    <BCardBody>
      <div id="session-by-countries" style="height: 203px">
        <JsVectorMap id="session-by-countries" :options="sessionByCountryMapOption()" />
      </div>

      <div class="mt-3">
        <div class="table-responsive mb-n1">
          <table class="table table-nowrap table-borderless table-centered mb-0">
            <thead class="bg-light bg-opacity-50 thead-sm">
              <tr>
                <th>Country</th>
                <th>Sessions</th>
                <th>Users</th>
                <th>Perc.</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(country, idx) in countryData" :key="idx">
                <td>
                  <img :src="country.country.image" alt="user-image" class="me-1 rounded-circle" height="18" /> <span class="align-middle">{{ country.country.name }}</span>
                </td>
                <td>{{ country.sessions }}</td>
                <td>{{ country.users }}</td>
                <td>{{ country.percentage }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import JsVectorMap from '~/components/JsVectorMap.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { countryData, sessionByCountryMapOption } from './data.ts'
</script>
