export interface SendEmail {
  emailList: string[]
  replyTo?: string
  ccEmailList?: string[]
  subject: string
  text: string
  html: string
  attachments?: any[]
}
