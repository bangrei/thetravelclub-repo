<template>
  <div class="luggage-table-container">
    <div class="luggage-table-wrapper">
      <table class="luggage-table">
        <thead>
          <tr>
            <th v-for="col in tableHeader" :class="{'wide-column': col.wide}" :key="col.key">{{ col.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in tableContent" :key="i">
            <td v-for="col in tableHeader" :key="'row'+ i + col.key" :class="{'unwrap-column': col.unwrap}">
              <span v-if="col.key != 'socialMedia'">{{ row[col.key] }}</span>
              <a v-else-if="row.socialMedia" :href="row.socialMedia" target="_blank">{{ row[col.key] }}</a>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "StoresTable",
  props: {
    tableHeader: {
      type: Array,
      default: () => []
    },
    tableContent: {
      type: Array,
      default: () => []
    },
  },
  data(){
    return {}
  }
}
</script>
<style scoped lang="scss">
.luggage-table-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
  .luggage-table-wrapper {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
  }
  .luggage-table-title {
    font-size: x-large;
    font-weight: bold;
    margin-bottom: 32px;
  }
  .luggage-table {
    width: 100%;
    border-collapse: collapse;
    thead {
      border-bottom: 2px solid $gold-dark;
      white-space: nowrap;
    }
    th,td {
      padding-block: 12px;
      padding-inline: 12px;
      text-align: left;
      &:is(.wide-column){
        min-width: 300px;
      }
      &:is(.unwrap-column) {
        white-space: nowrap;
      }
      &:first-child {
        padding-left: 0 !important;
      }
    }
    td {
      padding-inline: 12px;
    }
  }
}
</style>