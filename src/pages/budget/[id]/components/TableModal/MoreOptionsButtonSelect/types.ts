import { ReactNode } from 'react'

export type MoreOptionsButtonSelectProps = {
  disabledButton?: boolean
  buttons?: {
    label: string
    icon?: ReactNode
    action?: (value?: any) => void
  }[]
  checklistId?: number | undefined
  status: string
  handleDeleteChecklist: (id: number) => Promise<void>
}
