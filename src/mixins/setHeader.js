// this allow to set header of app when pageTitle is not available on route (Manual adction)
export const initHeader = {
  methods: {
    setHeader(headerName, defaultPosition = true) {
      this.$store.dispatch("setHeader", {
        name: headerName,
        default: defaultPosition
      });
    }
  }
};
// used when pageTitle is set on route params
export const initHeaderFromRouteParams = {
  created() {
    this.$store.dispatch("setHeader", {
      name: this.$route.meta.pageTitle,
      default: true
    });
  }
};
