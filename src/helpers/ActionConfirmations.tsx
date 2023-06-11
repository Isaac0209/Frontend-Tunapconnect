import { ApiCore } from '@/lib/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const api = new ApiCore()

export function ActionDeleteConfirmations(
  id: number,
  handleDelete: (id: number) => void,
  router = ''
) {
  return MySwal.fire({
    title: <p>Deseja deletar o agendamento {id}</p>,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const resp = await api.delete('/service-schedule/' + id)
        if (resp?.status === 200) {
          MySwal.fire('Salvo com sucesso!', '', 'success').then(() => {
            handleDelete(id)
          })
        } else {
          MySwal.fire('Ocorreu um erro!', '', 'error')
        }
      } catch (err: any) {
        MySwal.fire(err?.response.data.msg, '', 'error')
      }
    }
  })
}
