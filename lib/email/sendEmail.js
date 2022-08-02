import "isomorphic-unfetch"

export const sendMailWithNodeMailer = async (data) => {
  const result = await fetch("/api/v1/email/send", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((json) => {
      return {
        status: "ok",
        json: json
      }
    })
    .catch((err) => {
      return {
        status: "error",
        json: JSON.stringify(err)
      }
    })
  return result
}
