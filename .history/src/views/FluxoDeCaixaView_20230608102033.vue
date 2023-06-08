<script>
import BarraLateral from "../components/BarraLateral.vue";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Tag from "primevue/tag";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import TabMenu from "primevue/tabmenu";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import Toolbar from "primevue/toolbar";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { FilterMatchMode } from "primevue/api";
import { FinanceiroService } from "../services/FinanceiroService";

export default {
  name: "FluxoDeCaixaView",
  data() {
    return {
      items: [
        {
          label: "Dashboard",
          to: "/financeiro",
        },
        {
          label: "Fluxo de Caixa",
          to: "/fluxo-de-caixa",
        },
        {
          label: "Projeções e Metas",
          to: "/projecoes-e-metas",
        },
      ],
      toast: useToast(),
      dt: ref(),
      products: ref(),
      productDialog: ref(false),
      deleteProductDialog: ref(false),
      deleteProductsDialog: ref(false),
      product: ref({}),
      selectedProducts: ref(),
      filters: ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }),
      submitted: ref(false),
      value: null,
      status: ["Pago", "Em aberto", "Atrasado"],
      tipo: ["Receita", "Despesa"],
      categoria: [
        "Mensalidade",
        "Salários",
        "Insumos",
        "Investimentos",
        "Contratos",
      ],
    };
  },
  components: {
    Image,
    InputText,
    Button,
    TabMenu,
    DataTable,
    Column,
    ColumnGroup,
    Dropdown,
    Dialog,
    Toolbar,
    InputMask,
    InputNumber,
    Tag,
  },
  methods: {
    voltar: function () {
      window.history.back();
    },
    createId() {
      let id = "";
      var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    },
    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },
    saveProduct() {
      this.submitted = true;

      if (this.product.descricao.replace) {
        if (this.product.id) {
          this.products[this.findIndexById(this.product.id)] = this.product;
          this.toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Updated",
            life: 3000,
          });
        } else {
          this.product.id = this.createId();
          this.product.code = this.createId();
          this.products.push(this.product);
          this.toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Created",
            life: 3000,
          });
        }
        console.log(this.product);

        this.productDialog = false;
        this.product = {};
      }
    },
    editProduct(prod) {
      this.product = { ...prod };
      this.productDialog = true;
    },
    confirmDeleteProduct(prod) {
      this.product = prod;
      this.deleteProductDialog = true;
    },
    deleteProduct() {
      this.products = this.products.filter((val) => val.id !== this.product.id);
      console.log(this.product);
      this.deleteProductDialog = false;
      this.product = {};
      this.toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Deleted",
        life: 3000,
      });
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    },
    exportarCSV() {
      this.$refs.dt.exportCSV();
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true;
    },
    deleteSelectedProducts() {
      this.products = this.products.filter(
        (val) => !this.selectedProducts.includes(val)
      );
      console.log(this.selectedProducts);
      this.deleteProductsDialog = false;
      this.selectedProducts = null;
      this.toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Products Deleted",
        life: 3000,
      });
    },
    formatCurrency(value) {
      if (value)
        return value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      return;
    },
    getSeverity(product) {
      switch (product.status) {
        case "Pago":
          return "success";

        case "Em aberto":
          return "warning";

        case "Atrasado":
          return "danger";

        default:
          return null;
      }
    },
  },

  mounted() {
    FinanceiroService.getProducts().then((data) => (this.products = data));
  },
};
</script>

<template>
  <div class="flex">

    <div class="conteudo w-full">
      <div class="m-5">
        <div class="flex align-items-center mb-5">
          <Button
            icon="pi pi-arrow-left"
            @click="voltar"
            rounded
            outlined
          ></Button>
          <h1 class="titulo ml-5">Financeiro</h1>
        </div>
      </div>

      <div class="card align-items-center">
        <TabMenu :model="items" />
        <router-view />
      </div>

      <div class="card m-4">
        <Toolbar class="mb-4">
          <template #start>
            <Button
              label="Novo"
              icon="pi pi-plus"
              severity="primary"
              class="mr-2"
              @click="openNew"
            />
            <Button
              label="Excluir"
              icon="pi pi-trash"
              severity="danger"
              class="mr-2"
              @click="confirmDeleteSelected"
              :disabled="!selectedProducts || !selectedProducts.length"
            />
            <span class="p-input-icon-right">
              <i class="pi pi-search mr-1"></i>
              <InputText
                class="border-round m-1 w-full"
                v-model="filters['global'].value"
                placeholder="Pesquisar"
              />
            </span>
          </template>

          <template #end>
            <Button
              label="Exportar"
              icon="pi pi-upload"
              severity="secondary"
              @click="exportarCSV()"
            />
          </template>
        </Toolbar>

        <DataTable
          :value="products"
          ref="dt"
          tableStyle="min-width: 50rem"
          scrollable
          scrollHeight="350px"
          :virtualScrollerOptions="{ itemSize: 35 }"
          v-model:selection="selectedProducts"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
        >
          <Column
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false"
          ></Column>
          <Column
            field="dataVenc"
            header="Data de Vencimento"
            sortable
          ></Column>
          <Column field="tipo" header="Tipo" sortable></Column>
          <Column field="categoria" header="Categoria" sortable></Column>
          <Column field="valor" header="Valor" sortable>
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.valor) }}
            </template>
          </Column>
          <Column field="status" header="Status" sortable>
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.status"
                :severity="getSeverity(slotProps.data)"
              />
            </template>
          </Column>
          <Column field="descricao" header="Descrição" sortable></Column>
          <Column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                outlined
                rounded
                class="mr-2"
                @click="editProduct(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="confirmDeleteProduct(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

        <div>
          <Dialog
            v-model:visible="productDialog"
            :style="{ width: '450px' }"
            header="Fluxo de Caixa"
            :modal="true"
            class="p-fluid"
          >
            <div class="field">
              <label for="dataVenc">Data de Vencimento</label>
              <InputMask
                id="dataVenc"
                v-model.trim="product.dataVenc"
                required="true"
                autofocus
                mask="99/99/9999"
              />
            </div>
            <div class="field">
              <label for="tipo">Tipo</label>
              <Dropdown
                id="tipo"
                v-model.trim="product.tipo"
                :options="tipo"
                required="true"
                autofocus
                class="flex align-items-center"
              />
            </div>

            <div class="field">
              <label for="categoria">Categoria</label>
              <Dropdown
                id="categoria"
                v-model.trim="product.categoria"
                :options="categoria"
                required="true"
                autofocus
                class="flex align-items-center"
              />
            </div>

            <div class="field">
              <label for="valor">Valor</label>
              <InputNumber
                v-model="product.valor"
                inputId="currency-br"
                mode="currency"
                currency="BRL"
                locale="pt-BR"
              />
            </div>

            <div class="field">
              <label for="status">Status</label>
              <Dropdown
                id="status"
                v-model.trim="product.status"
                :options="status"
                required="true"
                autofocus
                class="flex align-items-center"
              />
            </div>

            <div class="field">
              <label for="descricao">Descrição</label>
              <InputText
                id="descricao"
                v-model="product.descricao"
                required="true"
                autofocus
                :class="{ 'p-invalid': submitted && !product.descricao }"
              />
              <small class="p-error" v-if="submitted && !product.descricao"
                >O campo não pode ficar vazio.</small
              >
            </div>

            <div class="field">
              <label for="dataPgto">Data de Pagamento</label>
              <InputMask
                id="dataPgto"
                v-model.trim="product.dataPgto"
                required="true"
                autofocus
                mask="99/99/9999"
              />
            </div>

            <template #footer>
              <Button
                label="Cancelar"
                icon="pi pi-times"
                text
                @click="hideDialog"
              />
              <Button
                label="Salvar"
                icon="pi pi-check"
                text
                @click="saveProduct"
              />
            </template>
          </Dialog>

          <Dialog
            v-model:visible="deleteProductDialog"
            :style="{ width: '450px' }"
            header="Confirmar exclusão"
            :modal="true"
          >
            <div class="confirmation-content">
              <i
                class="pi pi-exclamation-triangle mr-3"
                style="font-size: 2rem"
              />
              <span v-if="product"
                >Tem certeza que quer excluir <b>{{ product.tipo }}</b> de
                <b>{{ product.categoria }}</b
                >?</span
              >
            </div>
            <template #footer>
              <Button
                label="Não"
                icon="pi pi-times"
                text
                @click="deleteProductDialog = false"
              />
              <Button
                label="Sim"
                icon="pi pi-check"
                text
                @click="deleteProduct"
              />
            </template>
          </Dialog>

          <Dialog
            v-model:visible="deleteProductsDialog"
            :style="{ width: '450px' }"
            header="Confirmar exclusão"
            :modal="true"
          >
            <div class="confirmation-content">
              <i
                class="pi pi-exclamation-triangle mr-3"
                style="font-size: 2rem"
              />
              <span v-if="product"
                >Tem certeza que quer excluir os itens selecionados?</span
              >
            </div>
            <template #footer>
              <Button
                label="Não"
                icon="pi pi-times"
                text
                @click="deleteProductsDialog = false"
              />
              <Button
                label="Sim"
                icon="pi pi-check"
                text
                @click="deleteSelectedProducts"
              />
            </template>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
