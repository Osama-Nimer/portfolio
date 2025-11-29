export interface Service {
  id: number
  title: string
  description: string
  icon?: string
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface ServiceFormData {
  title: string
  description: string
  icon?: string
  order?: number
}
