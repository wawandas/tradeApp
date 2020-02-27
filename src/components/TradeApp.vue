<template>
  <div>
    <div v-for="item in arrayOfIsins" v-bind:key="item.isin" href="#">
      <a href="#" @click.prevent="getIsin(item.isin)">{{ item.isin }}</a>
    </div>
    <form>
      <input type="text" v-model="currentIsinId" />
      <button type="button" @click.prevent="sendOnClick">ask isin</button>
    </form>
    <div>
      <span>{{currentIsin.price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TradeApp",
  data: () => ({
    currentIsin: "",
    currentIsinId: "",
    arrayOfIsins: [
      { isin: "DE000BASF111", price: 240.32, bid: 240.31, ask: 240.31 },
      { isin: "DE000BASF112", price: 240.32, bid: 240.31, ask: 240.32 },
      { isin: "DE000BASF113", price: 240.32, bid: 240.31, ask: 240.33 },
      { isin: "DE000BASF114", price: 240.32, bid: 240.31, ask: 240.33 },
      { isin: "DE000BASF115", price: 240.32, bid: 240.31, ask: 240.33 }
    ],
    socket: null
  }),
  methods: {
    connect() {
      this.disconnect();
      this.socket = new WebSocket("ws://localhost:8080");
    },

    disconnect() {
      const isSocketOpen = this.socket && this.socket.readyState === 1;

      if (isSocketOpen) {
        this.socket.close();
      }
    },

    getIsin(isinId) {
      this.currentIsinId = "";
      this.socket.send(JSON.stringify({ subscribe: isinId }));
    },

    listenServer() {
      const self = this;
      this.socket.onmessage = function(event) {
        self.currentIsin = "";
        self.currentIsin = JSON.parse(event.data);
      };
    },

    sendOnClick() {
      this.socket.send(JSON.stringify({ subscribe: this.currentIsinId }));
    }
  },

  mounted() {
    this.connect();
    this.listenServer();
  },

  beforeDestroy() {
    this.disconnect();
  }
};
</script>
