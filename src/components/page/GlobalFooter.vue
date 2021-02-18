<template>
  <div class="footer">
    <div class="copyright">
      <span>Copyright &copy;{{curYear}} 天津华春智慧能源科技发展有限公司 津ICP备19001092号-1</span>
    </div>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    name: "LayoutFooter",
    data () {
      return {
        curYear: moment(new Date()).format("YYYY")
      }
    }
  }
</script>

<style lang="less" scoped>
  .footer {
    padding: 0 8px;
    margin: 12px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, .45);

        &:hover {
          color: rgba(0, 0, 0, .65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, .45);
      font-size: 10px;
    }
  }
</style>
