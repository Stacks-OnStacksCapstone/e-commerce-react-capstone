import eCommerceClient from "./eCommerceClient";

export default function addAuthToken() {
    eCommerceClient.defaults.headers.common.authorization = window.localStorage.getItem("token") || "";
}