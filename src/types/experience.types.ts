export interface Experience {
  id: number
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  current: boolean
  location?: string
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface ExperienceFormData {
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  current?: boolean
  location?: string
  order?: number
}

export interface Certificate {
  id: number
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  imageUrl?: string
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface CertificateFormData {
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  imageUrl?: string
  order?: number
}
