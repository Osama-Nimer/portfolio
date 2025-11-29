export interface About {
  id: number
  title: string
  description: string
  imageUrl?: string
  resumeUrl?: string
  createdAt?: string
  updatedAt?: string
}

export interface AboutFormData {
  title: string
  description: string
  imageUrl?: string
  resumeUrl?: string
}

export interface SocialLink {
  id: number
  platform: string
  url: string
  icon: string
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface SocialLinkFormData {
  platform: string
  url: string
  icon: string
  order?: number
}
