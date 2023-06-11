// import { ApiCore } from '@/lib/api'
import { ServiceScheduleType } from '@/types/service-schedule'
import { createContext, ReactNode, useReducer } from 'react'

type StateType = {
  list: ServiceScheduleType[]
  selectedActual: ServiceScheduleType | null
}

type ServiceScheduleContextProps = {
  setListServiceSchedule: (list: ServiceScheduleType[] | []) => void
  getServiceScheduleById: (id: number) => ServiceScheduleType | null
  setServiceScheduleSelectedById: (id: number) => void
  serviceScheduleState: StateType
}
type ServiceScheduleProviderProps = {
  children: ReactNode
}

export const ServiceScheduleContext = createContext(
  {} as ServiceScheduleContextProps,
)

export function ServiceScheduleProvider({
  children,
}: ServiceScheduleProviderProps) {
  const [serviceScheduleState, dispatch] = useReducer(
    serviceScheduleListReducer,
    {
      list: [],
      selectedActual: null,
    },
  )

  // const api = new ApiCore()

  function serviceScheduleListReducer(
    state: StateType,
    action: any,
  ): StateType {
    const { type, payload } = action
    switch (type) {
      case 'ADD_NEW_SERVICE_SCHEDULE_LIST':
        return {
          ...state,
          list: payload,
        }
      case 'ADD_NEW_SELECTED':
        return {
          ...state,
          selectedActual: payload,
        }
      case 'DELETE_BY_ID':
        return {
          ...state,
          selectedActual: payload,
        }
      default:
        return state
    }
  }

  function setListServiceSchedule(list: ServiceScheduleType[] | []) {
    dispatch({
      type: 'ADD_NEW_SERVICE_SCHEDULE_LIST',
      payload: list,
    })
  }

  function getServiceScheduleById(id: number): ServiceScheduleType | null {
    const isExistsServiceSchedule = serviceScheduleState.list.filter(
      (s) => s.id === id,
    )
    if (isExistsServiceSchedule.length > 0) {
      return isExistsServiceSchedule[0]
    }
    return null
  }

  function setServiceScheduleSelectedById(id: number) {
    const isExistsServiceSchedule = serviceScheduleState.list.filter(
      (s) => s.id === id,
    )
    if (isExistsServiceSchedule.length > 0) {
      dispatch({
        type: 'ADD_NEW_SELECTED',
        payload: isExistsServiceSchedule[0],
      })
    }
  }

  // async function deleteServiceScheduleById(id: number): boolean {
  //   const resp = api.delete('')

  //   const isExistsServiceSchedule = serviceScheduleState.list.filter(
  //     (s) => s.id !== id,
  //   )
  //   if (isExistsServiceSchedule.length > 0) {
  //     dispatch({
  //       type: 'DELETE_BY_ID',
  //       payload: isExistsServiceSchedule,
  //     })
  //   }
  // }

  // function createServiceSchedule(data: any) {}

  // function updateServiceScheduleById() {}

  return (
    <ServiceScheduleContext.Provider
      value={{
        setListServiceSchedule,
        setServiceScheduleSelectedById,
        getServiceScheduleById,
        serviceScheduleState,
      }}
    >
      {children}
    </ServiceScheduleContext.Provider>
  )
}
