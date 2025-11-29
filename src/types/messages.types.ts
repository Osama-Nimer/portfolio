export interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt?: string
  updatedAt?: string
}

export interface MessageFormData {
  name: string
  email: string
  subject: string
  message: string
}
