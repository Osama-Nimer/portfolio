export interface Project {
  id: number
  title: string
  description: string
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  order: number
  tags?: Tag[]
  createdAt?: string
  updatedAt?: string
}

export interface ProjectFormData {
  title: string
  description: string
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  order?: number
  tags?: string[]
}

export interface Tag {
  id: number
  name: string
  createdAt?: string
  updatedAt?: string
}
