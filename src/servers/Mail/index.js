import request from "../../fetch";
//定义终止请求
const mailAbort = {
  abortInboxMessage: null,
  abortOutInfoMessage: null,
  abortPublicMailMessage: null,
};

const api = {
  //收件箱邮件
  getInboxMessage: (userName, page) => {
    mailAbort.abortInboxMessage && mailAbort.abortInboxMessage();
    const controller = new AbortController();
    mailAbort.abortInboxMessage = () => controller.abort();
    return request("GET", `/message/received_messages?user=${userName}&&keyword=&&start=&&end=&&current_page=${page ? page : ""}&&is_read=`, {}, controller.signal);
  },
  //发件箱邮件
  getOutInfoMessage: (userName, page) => {
    mailAbort.abortOutInfoMessage && mailAbort.abortOutInfoMessage();
    const controller = new AbortController();
    mailAbort.abortOutInfoMessage = () => controller.abort();
    return request("GET", `/message/sent_message?user=${userName}&keyword=&current_page=${page ? page : ""}`, {}, controller.signal);
  },
  getPublicMailMessage: (page, limit) => {
    mailAbort.abortPublicMailMessage && mailAbort.abortPublicMailMessage();
    const controller = new AbortController();
    mailAbort.abortPublicMailMessage = () => controller.abort();
    return request("GET", `/message/message_announcement?current_page=${page}&page_limit=${limit}`, {}, controller.signal);
  }
};
export { mailAbort };
export default api;
