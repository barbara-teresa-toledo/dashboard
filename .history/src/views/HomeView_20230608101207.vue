<script>
import BarraLateral from "../components/BarraLateral.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import TabMenu from "primevue/tabmenu";
import Chart from "primevue/chart";
import { FinanceiroService } from "../services/FinanceiroService";

export default {
  name: "FinanceiroView",
  data() {
    return {
      items: [
        {
          label: "Dashboard",
          to: "/",
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
      value: null,
      chartData1: null,
      chartOptions1: null,
      chartData2: null,
      chartOptions2: null,
      chartData3: null,
      chartOptions3: {
        cutout: "60%",
      },
      chartData4: null,
      chartOptions4: null,
      chartData5: null,
      chartOptions5: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
      chartData6: null,
      chartOptions6: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
      dadosGraficos: {
        dadosReceitas: [12, 51, 62, 43, 71, 62, 45],
        dadosDespesas: [12, 31, 32, 33, 21, 22, 25],
        dadosMargemLucro: [85, 15],
        dadosLucro: [0, 20, 30, 10, 50, 40, 20],
        // dadosTipoEmpresa: [condominio, zeladoria, escola, universidade]
        dadosTipoEmpresa: [17, 26, 15, 8],
        // dadosPagamentos: [em aberto, pago, atrasado]
        dadosPagamentos: [450, 625, 156],
        lucro: 170000,
        meses: [
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
      },
    };
  },
  components: {
    Image,
    BarraLateral,
    InputText,
    Button,
    TabMenu,
    Chart,
  },
  methods: {
    voltar: function () {
      window.history.back();
    },
    setChartData1() {
      const documentStyle = getComputedStyle(document.documentElement);
      const dadosGraficos = this.dadosGraficos;

      return {
        labels: dadosGraficos.meses,
        datasets: [
          {
            label: "Receitas",
            data: dadosGraficos.dadosReceitas,
            fill: true,
            borderColor: documentStyle.getPropertyValue("--blue-500"),
            tension: 0.4,
            backgroundColor: "rgba(133, 178, 249,0.3)",
          },
        ],
      };
    },
    setChartOptions1() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    },
    setChartData2() {
      const documentStyle = getComputedStyle(document.documentElement);
      const dadosGraficos = this.dadosGraficos;

      return {
        labels: dadosGraficos.meses,
        datasets: [
          {
            label: "Despesas",
            data: dadosGraficos.dadosDespesas,
            fill: true,
            borderColor: documentStyle.getPropertyValue("--indigo-500"),
            tension: 0.4,
            backgroundColor: "rgba(158, 160, 246,0.3)",
          },
        ],
      };
    },
    setChartOptions2() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    },
    setChartData3() {
      const documentStyle = getComputedStyle(document.body);
      const dadosGraficos = this.dadosGraficos;

      return {
        labels: ["Margem de Lucro"],
        datasets: [
          {
            data: dadosGraficos.dadosMargemLucro,
            backgroundColor: [
              documentStyle.getPropertyValue("--primary-500"),
              documentStyle.getPropertyValue("--primary-200"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--primary-400"),
              documentStyle.getPropertyValue("--primary-100"),
            ],
          },
        ],
      };
    },
    setChartData4() {
      const documentStyle = getComputedStyle(document.documentElement);
      const dadosGraficos = this.dadosGraficos;

      return {
        labels: dadosGraficos.meses,
        datasets: [
          {
            type: "line",
            label: "Lucro",
            borderColor: documentStyle.getPropertyValue("--primary-500"),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: dadosGraficos.dadosLucro,
          },
          {
            type: "bar",
            label: "Receitas",
            backgroundColor: documentStyle.getPropertyValue("--blue-500"),
            data: dadosGraficos.dadosReceitas,
          },
          {
            type: "bar",
            label: "Despesas",
            backgroundColor: documentStyle.getPropertyValue("--indigo-500"),
            data: dadosGraficos.dadosDespesas,
          },
        ],
      };
    },
    setChartOptions4() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    },
    setChartData5() {
      const documentStyle = getComputedStyle(document.body);
      const dadosGraficos = this.dadosGraficos;

      return {
        labels: ["Condomínio", "Zeladoria", "Escola", "Universidade"],
        datasets: [
          {
            data: dadosGraficos.dadosTipoEmpresa,
            backgroundColor: [
              documentStyle.getPropertyValue("--primary-500"),
              documentStyle.getPropertyValue("--blue-500"),
              documentStyle.getPropertyValue("--indigo-500"),
              documentStyle.getPropertyValue("--cyan-500"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--primary-400"),
              documentStyle.getPropertyValue("--blue-400"),
              documentStyle.getPropertyValue("--indigo-400"),
              documentStyle.getPropertyValue("--cyan-400"),
            ],
          },
        ],
      };
    },
    setChartData6() {
      const documentStyle = getComputedStyle(document.body);
      const dadosGraficos = this.dadosGraficos;

      return {
        labels: ["Em aberto", "Pago", "Atrasado"],
        datasets: [
          {
            data: dadosGraficos.dadosPagamentos,
            backgroundColor: [
              documentStyle.getPropertyValue("--cyan-500"),
              documentStyle.getPropertyValue("--blue-500"),
              documentStyle.getPropertyValue("--indigo-500"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--cyan-400"),
              documentStyle.getPropertyValue("--blue-400"),
              documentStyle.getPropertyValue("--indigo-400"),
            ],
          },
        ],
      };
    },
    formatCurrency(value) {
      if (value)
        return value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      return;
    },
  },
  mounted() {
    FinanceiroService.getProducts().then((data) => (this.products = data));

    this.chartData1 = this.setChartData1();
    this.chartOptions1 = this.setChartOptions1();

    this.chartData2 = this.setChartData2();
    this.chartOptions2 = this.setChartOptions2();

    this.chartData3 = this.setChartData3();

    this.chartData4 = this.setChartData4();
    this.chartOptions4 = this.setChartOptions4();

    this.chartData5 = this.setChartData5();

    this.chartData6 = this.setChartData6();
  },
};
</script>

<template>
  <div class="flex h-screen bg-gray-800">
    <div class="conteudo w-full m-3">
      <div class="m-3">
        <h1 class='titulo'>Dashboard Financeiro</h1>
      </div>

      <div class="card align-items-center">
        <TabMenu :model="items" />
        <router-view />
      </div>

      <div
        class="m-4 flex flex-row flex-wrap align-items-center justify-content-between"
      >
        <div class="card">
          <Chart
            type="line"
            :data="chartData1"
            :options="chartOptions1"
            class="h-13rem"
          />
        </div>
        <div class="card">
          <Chart
            type="line"
            :data="chartData2"
            :options="chartOptions2"
            class="h-13rem"
          />
        </div>
        <h2 class="text-5xl titulo">
          =
          {{ formatCurrency(this.dadosGraficos.lucro) }}
        </h2>
        <div class="card flex justify-content-center">
          <Chart
            type="doughnut"
            :data="chartData3"
            :options="chartOptions3"
            class="max-w-15rem h-13rem"
          />
        </div>
        <div class="card w-6">
          <Chart
            type="bar"
            :data="chartData4"
            :options="chartOptions4"
            class="h-13rem"
          />
        </div>
        <div class="card flex justify-content-center">
          <Chart
            type="pie"
            :data="chartData5"
            :options="chartOptions5"
            class="h-13rem"
          />
        </div>
        <div class="card flex justify-content-center">
          <Chart
            type="pie"
            :data="chartData6"
            :options="chartOptions6"
            class="h-13rem"
          />
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style></style>
